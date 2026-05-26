// Mirrors the SQLAlchemy Booking model exactly
export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Booking {
  id: number;
  user_id: number;
  property_id: number;
  check_in: string;        
  check_out: string;       
  total_price: number;     
  status: BookingStatus;
  created_at: string;

  // Populated via SQLAlchemy relationships — backend should include these
  user?: {
    id: number;
    full_name: string;
    email: string;
  };
  property?: {
    id: number;
    title: string;
  };
}

export interface UpdateBookingStatusPayload {
  id: number;
  status: BookingStatus;
}

export interface BookingsState {
  items: Booking[];
  loading: boolean;
  error: string | null;
  statusFilter: BookingStatus | "all";
  searchQuery: string;
}

export interface BookingsQueryParams {
  status?: BookingStatus | "all";
  search?: string;
}