export interface Review {
  id: number;
  user_id: number;
  property_id: number;
  rating: number;
  comment: string | null;
  create_at: string; 
  update_at: string;

  user?: {
    id: number;
    full_name?: string;
    name?: string;
    email: string;
    role?: string;
  };
  property?: {
    id: number;
    title: string;
    price?: number;
  };
}
