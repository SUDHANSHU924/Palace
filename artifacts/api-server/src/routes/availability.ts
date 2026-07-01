import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const LUNCH_SLOTS = ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM"];
const DINNER_SLOTS = [
  "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
  "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM",
];
const ALL_SLOTS = [...LUNCH_SLOTS, ...DINNER_SLOTS];
const TOTAL_SEATS = 80;

function getDefaultSlots() {
  return ALL_SLOTS.map((time) => ({
    time,
    availableSeats: TOTAL_SEATS,
    available: true,
  }));
}

let sheetsClient: SheetsClient | null = null;

interface SheetsClient {
  getAvailabilityForDate: (date: string) => Promise<SlotData[] | null>;
}

interface SlotData {
  time: string;
  availableSeats: number;
  reservedSeats: number;
}

export function setSheetsClient(client: SheetsClient) {
  sheetsClient = client;
}

router.get("/availability", async (req, res): Promise<void> => {
  const { date } = req.query;

  if (!date || typeof date !== "string") {
    res.status(400).json({ error: "date query parameter is required (YYYY-MM-DD)" });
    return;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    res.status(400).json({ error: "date must be in YYYY-MM-DD format" });
    return;
  }

  try {
    if (sheetsClient) {
      const sheetSlots = await sheetsClient.getAvailabilityForDate(date);
      if (sheetSlots) {
        const slots = sheetSlots.map((s) => ({
          time: s.time,
          availableSeats: s.availableSeats,
          available: s.availableSeats > 0,
        }));
        res.json(slots);
        return;
      }
    }

    res.json(getDefaultSlots());
  } catch (err) {
    req.log.error({ err }, "Failed to fetch availability");
    res.json(getDefaultSlots());
  }
});

export default router;
