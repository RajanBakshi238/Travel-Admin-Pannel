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
  itinerary: Iitinerary[];
  photos: string[];
  pickUpPointLong: number;
  pickUpPointLat: number;
  totalSeats: number;
}

export interface Iitinerary {
  day: number;
  // description: [string];
  description: string[];
}


export interface IUpdateTripRequest extends Partial<ICreateTripRequest> {
  _id: string;
}
