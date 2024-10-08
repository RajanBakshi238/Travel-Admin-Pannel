import { Iitinerary } from "./ICreateTripRequest";

type Photo = {
  path: string;
  _id: string
}

export interface IGetTripResponse {
  _id: string;
  organizerId: string;
  place: string;
  photos: Photo[];
  startDate: string;
  endDate: string;
  pickUp: string;
  price: number;
  itinerary: Iitinerary[];
  isFirstBookingDone: boolean;
  exclusions: string[];
  isExpired: boolean;
  inclusions: string[];
  enquiryNumber: string;
  batches: [];
  termsAndConditions: string[];
  createdAt: string;
  updatedAt: string;
  leftSeats: number;
  totalSeats: number;
  pickUpPointLong: string;
  pickUpPointLat: string  

}
