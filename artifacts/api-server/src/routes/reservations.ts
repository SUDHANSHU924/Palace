import { Router, type IRouter } from "express";
import { randomUUID } from "crypto";
import { ReserveTableBody } from "@workspace/api-zod";

const router: IRouter = Router();

interface ReservationStore {
  appendReservation: (row: ReservationRow) => Promise<void>;
  checkAndUpdateAvailability: (date: string, time: string, guests: number) => Promise<boolean>;
}

interface EmailService {
  sendCustomerConfirmation: (data: CustomerEmailData) => Promise<void>;
  sendManagerNotification: (data: ManagerEmailData) => Promise<void>;
}

interface ReservationRow {
  bookingId: string;
  timestamp: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  specialRequests: string;
  occasion: string;
  status: string;
}

interface CustomerEmailData {
  bookingId: string;
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string | null;
  occasion?: string | null;
}

interface ManagerEmailData {
  bookingId: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string | null;
  occasion?: string | null;
}

let reservationStore: ReservationStore | null = null;
let emailService: EmailService | null = null;

export function setReservationStore(store: ReservationStore) {
  reservationStore = store;
}

export function setEmailService(service: EmailService) {
  emailService = service;
}

router.post("/reserve-table", async (req, res): Promise<void> => {
  const parsed = ReserveTableBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { name, phone, email, date, time, guests, specialRequests, occasion } = parsed.data;

  const bookingId = `WARGO-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0, 4).toUpperCase()}`;
  const timestamp = new Date().toISOString();

  if (reservationStore) {
    try {
      const available = await reservationStore.checkAndUpdateAvailability(date, time, guests);
      if (!available) {
        res.status(409).json({ error: `No availability for ${time} on ${date}. Please choose another time.` });
        return;
      }
    } catch (err) {
      req.log.error({ err }, "Failed to check availability from Google Sheets");
    }

    try {
      await reservationStore.appendReservation({
        bookingId,
        timestamp,
        name,
        phone,
        email,
        date,
        time,
        guests,
        specialRequests: specialRequests ?? "",
        occasion: occasion ?? "",
        status: "Confirmed",
      });
    } catch (err) {
      req.log.error({ err }, "Failed to append reservation to Google Sheets");
    }
  } else {
    req.log.warn("Google Sheets not connected — reservation stored in-memory only");
  }

  if (emailService) {
    const emailData: CustomerEmailData = { bookingId, name, email, date, time, guests, specialRequests, occasion };
    const managerData: ManagerEmailData = { bookingId, name, phone, email, date, time, guests, specialRequests, occasion };

    Promise.all([
      emailService.sendCustomerConfirmation(emailData).catch((err) =>
        req.log.error({ err }, "Failed to send customer confirmation email")
      ),
      emailService.sendManagerNotification(managerData).catch((err) =>
        req.log.error({ err }, "Failed to send manager notification email")
      ),
    ]);
  } else {
    req.log.info({ bookingId }, "Email service not connected — skipping email notifications");
  }

  res.json({
    bookingId,
    name,
    email,
    date,
    time,
    guests,
    status: "confirmed",
    message: `Your table for ${guests} at ${time} on ${date} is confirmed. Booking reference: ${bookingId}`,
  });
});

export default router;
