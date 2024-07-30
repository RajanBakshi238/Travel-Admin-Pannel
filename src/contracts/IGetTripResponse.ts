import { Iitinerary } from "./ICreateTripRequest";

export interface IGetTripResponse {
  _id: string;
  place: string;
  photos: string[];
  startDate: string;
  endDate: string;
  pickUp: string;
  price: number;
  itinerary: Iitinerary[];
  isFirstBookingDone: boolean;
  exclusions: string;
  isExpired: boolean;
  inclusions: string;
  enquiryNumber: string;
  batches: [];
  termsAndConditions: string[];
  createdAt: string;
  updatedAt: string;
}
