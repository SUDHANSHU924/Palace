export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  tags?: string[];
  calories?: number;
  allergens?: string[];
}

export interface MenuSection {
  category: string;
  intro: string;
  items: MenuItem[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface ReservationInput {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  occasion?: string;
  specialRequests?: string;
}

export interface ReservationConfirmation extends ReservationInput {
  bookingId: string;
  createdAt: string;
}

const menuSections: MenuSection[] = [
  {
    category: "Starters",
    intro: "Small plates designed to open the evening with crisp texture, layered acidity, and slow-building warmth.",
    items: [
      {
        id: "starter-heirloom-tomato",
        name: "Heirloom Tomato Consommé",
        description: "Clear tomato broth, basil oil, smoked sea salt, and shaved summer vegetables.",
        price: 18,
        image: "/images/menu-1.png",
        tags: ["seasonal", "vegetarian"],
        calories: 180,
        allergens: ["None"],
      },
      {
        id: "starter-charred-octopus",
        name: "Charred Octopus",
        description: "Fingerling potatoes, citrus emulsion, fennel pollen, and herb oil.",
        price: 24,
        image: "/images/menu-2.png",
        tags: ["chef favorite"],
        calories: 260,
        allergens: ["Shellfish"],
      },
    ],
  },
  {
    category: "Mains",
    intro: "Anchor dishes built around precise technique, rich sauce work, and a focused ingredient list.",
    items: [
      {
        id: "main-roasted-halibut",
        name: "Roasted Halibut",
        description: "Cauliflower velouté, green herb salsa, charred leek, and cucumber relish.",
        price: 38,
        image: "/images/menu-3.png",
        tags: ["light", "gluten free"],
        calories: 420,
        allergens: ["Fish"],
      },
      {
        id: "main-aged-striploin",
        name: "Aged Striploin",
        description: "Black garlic jus, pomme purée, grilled mushrooms, and crisp shallot.",
        price: 44,
        image: "/images/menu-4.png",
        tags: ["signature"],
        calories: 680,
        allergens: ["Dairy"],
      },
    ],
  },
  {
    category: "Desserts",
    intro: "A restrained finish: balanced sweetness, dark chocolate, and bright fruit acidity.",
    items: [
      {
        id: "dessert-dark-chocolate",
        name: "Dark Chocolate Tart",
        description: "Miso caramel, almond praline, and mascarpone cream.",
        price: 16,
        image: "/images/menu-1.png",
        tags: ["house made"],
        calories: 320,
        allergens: ["Dairy", "Nuts"],
      },
      {
        id: "dessert-poached-pears",
        name: "Poached Pears",
        description: "Vanilla sabayon, toasted hazelnut crumb, and thyme syrup.",
        price: 15,
        image: "/images/menu-2.png",
        tags: ["vegetarian"],
        calories: 240,
        allergens: ["Eggs", "Nuts"],
      },
    ],
  },
  {
    category: "Drinks",
    intro: "Low-ABV apertifs, polished classics, and a concise cellar list curated for the room.",
    items: [
      {
        id: "drink-citrus-spritz",
        name: "Citrus Spritz",
        description: "Bitter orange, white vermouth, and sparkling mineral finish.",
        price: 15,
        image: "/images/menu-3.png",
        tags: ["aperitif"],
        calories: 150,
        allergens: ["Sulphites"],
      },
      {
        id: "drink-barrel-old-fashioned",
        name: "Barrel Aged Old Fashioned",
        description: "Rye whiskey, demerara, bitters, and a long citrus oil finish.",
        price: 19,
        image: "/images/menu-4.png",
        tags: ["classic"],
        calories: 210,
        allergens: ["None"],
      },
    ],
  },
];

const standardSlots = ["5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"];
const premiumSlots = [...standardSlots, "9:30 PM", "10:00 PM"];
const bookedReservations = new Map<string, Set<string>>();

const delay = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function parseDate(dateString: string): Date | null {
  const parsedDate = new Date(`${dateString}T12:00:00`);
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
}

function getSlotsForDate(date: Date): string[] {
  const day = date.getDay();

  if (day === 0) return [];
  if (day === 5 || day === 6) return premiumSlots;
  if (day === 4) return standardSlots.slice(0, 7);

  return standardSlots;
}

function isPastSlot(date: Date, time: string): boolean {
  const [timeValue, meridiem] = time.split(" ");
  const [hoursPart = "0", minutesPart = "0"] = timeValue.split(":");
  let hours = Number(hoursPart);
  const minutes = Number(minutesPart);

  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;

  const slotDate = new Date(date);
  slotDate.setHours(hours, minutes, 0, 0);

  return slotDate.getTime() <= Date.now();
}

function getBookedTimes(dateString: string): Set<string> {
  const bookedTimes = bookedReservations.get(dateString);

  if (bookedTimes) {
    return bookedTimes;
  }

  const initialTimes = new Set<string>();
  bookedReservations.set(dateString, initialTimes);
  return initialTimes;
}

export function getMenuSections(): MenuSection[] {
  return menuSections;
}

export async function getAvailability(dateString: string): Promise<TimeSlot[]> {
  await delay(120);

  const parsedDate = parseDate(dateString);
  if (!parsedDate) return [];

  const bookedTimes = getBookedTimes(dateString);
  return getSlotsForDate(parsedDate).map((time) => ({
    time,
    available: !bookedTimes.has(time) && !isPastSlot(parsedDate, time),
  }));
}

export async function reserveTable(input: ReservationInput): Promise<ReservationConfirmation> {
  await delay(220);

  const parsedDate = parseDate(input.date);
  if (!parsedDate) {
    throw new Error("Please select a valid reservation date.");
  }

  const availability = await getAvailability(input.date);
  const selectedSlot = availability.find((slot) => slot.time === input.time);

  if (!selectedSlot) {
    throw new Error("That time is not available for the selected date.");
  }

  if (!selectedSlot.available) {
    throw new Error("That slot has already been reserved. Please choose another time.");
  }

  getBookedTimes(input.date).add(input.time);

  return {
    ...input,
    bookingId: `PL-${input.date.replace(/-/g, "")}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    createdAt: new Date().toISOString(),
  };
}