export interface ICreateTripRequest {
  place: string;
  startDate: string;
  endDate: string;
  pickUp: string;
  termsAndConditions: string[];
  enquiryNumber: string;
  price: number | null;
  inclusions: string[];
  exclusions: string[];
//   itinerary: Iitinerary;
}

// interface Iitinerary {
//   day: number;
//   description: [string];
// }
