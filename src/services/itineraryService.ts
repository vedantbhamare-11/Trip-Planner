interface Place {
  name: string;
  address: string;
}

interface ItinerarySlot {
  time: string;
  place: Place;
}

type DayItinerary = ItinerarySlot[];

export const generateItinerary = (
  places: any[],
  durationDays: number
): DayItinerary[] => {
  const slotsPerDay = 4;
  const timeSlots = [
    { start: "9:00 AM", end: "11:00 AM" },
    { start: "12:00 PM", end: "2:00 PM" },
    { start: "3:00 PM", end: "5:00 PM" },
    { start: "6:00 PM", end: "8:00 PM" },
  ];

  const itinerary: DayItinerary[] = [];
  let placeIndex = 0;

  for (let day = 0; day < durationDays; day++) {
    const dayPlan: ItinerarySlot[] = [];
    for (let slot = 0; slot < slotsPerDay; slot++) {
      if (placeIndex < places.length) {
        dayPlan.push({
          time: `${timeSlots[slot].start} - ${timeSlots[slot].end}`,
          place: places[placeIndex],
        });
        placeIndex++;
      }
    }
    itinerary.push(dayPlan);
  }

  return itinerary;
};
