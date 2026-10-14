export type DashboardPeriod = "weekly" | "monthly" | "yearly";

export interface Property {
  id: number;
  title: string;
  price: number;
  property_type?: string;
  status?: string;
  city?: string;
  district?: string;
  country?: string;
  image_url?: string;
  view_count?: number;
  views?: number;
}

export interface Booking {
  id: number;
  property_id?: number;
  user_id?: number;
  check_in?: string;
  check_out?: string;
  status: string;
  created_at?: string;
  amount?: number;
  total_amount?: number;
  property?: {
    id?: number;
    title?: string;
    city?: string;
    price?: number;
  };
  user?: {
    id?: number;
    name?: string;
    full_name?: string;
    first_name?: string;
    last_name?: string;
  };
}

export interface Favorite {
  id?: number;
  property_id?: number;
  user_id?: number;
  created_at?: string;
  property?: Property;
}

export interface DashboardStat {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export interface DashboardData {
  properties: Property[];
  bookings: Booking[];
  favorites: Favorite[];
}

export interface DashboardState {
  data: DashboardData;
  selectedPeriod: DashboardPeriod;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

export interface DashboardSummary {
  totalProperties: number;
  activeBookings: number;
  totalFavorites: number;
  pendingBookings: number;
  topProperties: Property[];
  recentBookings: Booking[];
  favoriteCategories: {
    name: string;
    count: number;
  }[];
}

export interface DashboardFetchResult extends DashboardData {
  errors: string[];
}