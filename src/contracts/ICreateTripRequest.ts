export interface ICreateTripRequest {
  place: string;
  startDate: string;
  endDate: string;
  pickup: string;
  termsAndConditions: [string];
  enquiryNumber: string;
  price: number;
  inclusions: [string];
  exclusions: [string];
  itinerary: Iitinerary;
}

interface Iitinerary {
  day: number;
  description: [string];
}
