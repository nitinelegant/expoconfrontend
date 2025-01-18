export interface OrganizerProps {
  _id: string;
  venue_name: string;
  venue_city: string;
  state_id: number;
  venue_address: string;
  venue_phone: string;
  venue_website: string;
  venue_map: string;
  venue_photo: string;
  venue_layout: string;
  venue_featured: boolean;
  status: "approved" | "pending" | "rejected";
}

export interface OrganizerListResponse {
  message: string;
  venues: OrganizerProps[];
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}
export interface SupplierProps {
  _id: string;
  venue_name: string;
  venue_city: string;
  state_id: number;
  venue_address: string;
  venue_phone: string;
  venue_website: string;
  venue_map: string;
  venue_photo: string;
  venue_layout: string;
  venue_featured: boolean;
  status: "approved" | "pending" | "rejected";
}

export interface SupplierPropsListResponse {
  message: string;
  venues: SupplierProps[];
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}
