export interface VenueProps {
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
export interface CompanyProps {
  _id: string;
  company_name: string;
  company_type_id: number;
  company_city: string;
  state_id: number;
  company_address: string;
  company_phone: string;
  company_website: string;
  company_map: string;
  company_logo: string;
  company_featured: boolean;
  company_user_id: number;
  company_password: string;
  status: "approved" | "pending" | "rejected";
}
export interface VenueListResponse {
  message: string;
  venues: VenueProps[];
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}

export interface CompanyListResponse {
  companies: CompanyProps[];
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}

export interface KeyContactProps {
  _id: string;
  contact_name: string;
  contact_mobile: string;
  contact_email: string;
  state_id: number;
  contact_organizer_id: string;
  contact_venue_id: string;
  contact_association_id: string;
}
export interface KeyContactListResponse {
  keyContacts: KeyContactProps[];
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}

export interface AssociationProps {
  _id: string;
  association_name: string;
  association_city: string;
  state_id: number;
  association_address: string;
  association_type_id: number;
  association_website: string;
  status: "pending" | "active" | "inactive"; // Using union type for status
}

export interface AssociationsListResponse {
  associations: AssociationProps[];
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}