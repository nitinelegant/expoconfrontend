export interface ExhibitionApprovalProps {
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

export interface ExhibitionApprovalListResponse {
  message: string;
  venues: ExhibitionApprovalProps[];
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}
export interface ConferenceApprovalProps {
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

export interface ConferenceApprovalListResponse {
  message: string;
  venues: ConferenceApprovalProps[];
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}
