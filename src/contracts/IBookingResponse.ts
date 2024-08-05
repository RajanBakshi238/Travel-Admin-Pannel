interface IBooking {
  bookingStatus: string;
  createdAt: string;
  organizerId: string;
  tripId: string;
  updatedAt: string;
  user: string;
  users: string;
  _id: string;
}

interface IOrder {
  amount: string;
  amount_due: string;
  amount_paid: string;
  attempts: string;
  created_at: string;
  currency: string;
  entity: string;
  id: string;
  notes: string;
  offer_id: string;
  receipt: string;
  status: string;
}

export interface ITripUsers {
  name: string;
  email: string;
  contactNumber: string;
  age: string;
}

export interface IBookingResponse {
  data: {
    booking: IBooking;
    order: IOrder;
  };
  message: string;
}
