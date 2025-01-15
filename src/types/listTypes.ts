interface AssociationChange {
  date: string; // ISO date string
  type: string; // Example: "create", could be an enum if predefined types are known
  fields: string[]; // Array of field names
  user_id: string; // User ID related to the change
  _id: string; // Change ID
}
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
  status: "active" | "inactive";
  adminStatus: "approved" | "pending" | "rejected";
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
  status: "active" | "inactive";
  adminStatus: "approved" | "pending" | "rejected";
  changes: Changes;
  createdAt: string;
  updatedAt: string;
  __v: string;
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
  changes: ContactChanges;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  status: "active" | "inactive";
  adminStatus: "approved" | "pending" | "rejected";
  __v: string;
}
export interface ContactChanges {
  date: string; // ISO date string
  type: string; // e.g., "update", "create"
  fields: string[]; // Array of field names
}
export interface KeyContactListResponse {
  keyContacts: KeyContactProps[];
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}

interface KeyContact {
  _id: string;
  contact_name: string;
  contact_mobile: string;
  contact_email: string;
  state_id: number;
  contact_organizer_id: string;
  contact_venue_id: string;
  contact_association_id: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string

  status: string;
  adminStatus: string;
  changes: Changes;
}
interface Changes {
  date: string;
  type: string;
  fields: string[];
  user_id: string;
}

export interface KeyContactSingleResponse {
  message: string;
  keyContact: KeyContact;
}
export interface ExhibitionSingleResponse {
  message: string;
  exhibition: Exhibition;
}

interface Exhibition {
  expo_type_id: number;
  expo_fullname: string;
  expo_shortname: string;
  expo_sd: string;
  expo_ed: string;
  month_id: number;
  year_id: string;
  expo_time: string;
  fee_id: number;
  expo_city: string;
  state_id: number;
  venue_id: string;
  expo_website: string;
  expo_logo: string;
  expo_frequency: string;
  company_id: string;
  expo_segment_id: number;
  expo_eprofile: string;
  expo_vprofile: string;
  status: "pending" | "approved" | "rejected";
  changes: AssociationChange;
}

export interface AssociationProps {
  _id: string;
  association_name: string;
  association_city: string;
  state_id: number;
  association_address: string;
  association_type_id: number;
  association_website: string;
  changes: Changes; // Nested structure for change details
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  status: "active" | "inactive";
  adminStatus: "approved" | "pending" | "rejected";
}

export interface AssociationsListResponse {
  associations: AssociationProps[];
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}

export interface ConferenceProps {
  _id: string;
  con_type_id: number;
  con_fullname: string;
  con_shortname: string;
  con_sd: string; // Start date in ISO format
  con_ed: string; // End date in ISO format
  month_id: string;
  year_id: string;
  con_time: string; // Conference time
  fee_id: number;
  con_city: string;
  state_id: number;
  venue_id: string;
  con_website: string;
  con_logo: string;
  con_frequency: string;
  company_id: string;
  con_segment_id: string;
  con_nassociation_id: string;
  con_hassociation_id: string;
  changes: AssociationChange; // Nested structure for change details

  status: "active" | "inactive";
  adminStatus: "approved" | "pending" | "rejected";
}

export interface ConferenceListResponse {
  conferences: ConferenceProps[];
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}

export interface ExpConferenceProps {
  _id: string;
  con_type_id: number;
  con_fullname: string;
  con_shortname: string;
  con_sd: string; // ISO date string
  con_ed: string; // ISO date string
  month_id: number | null;
  year_id: number | null;
  con_time: string;
  fee_id: number | null;
  con_city: string;
  state_id: number | null;
  venue_id: number | null;
  con_website: string;
  con_logo: string;
  con_frequency: string;
  company_id: number | null;
  con_segment_id: number | null;
  con_nassociation_id: number | null;
  con_hassociation_id: number | null;
  status: "active" | "inactive";
  adminStatus: "approved" | "pending" | "rejected";
}
export interface ExpConferenceListResponse {
  conferences: ExpConferenceProps[];
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}

export interface StaffProps {
  _id: string;
  id?: string; // Optional, as not all users have this field
  user_id: string;
  user_prefix?: string;
  user_fullname: string;
  user_email: string;
  user_role: number;
  user_status: string;
  user_tender: number;
  profile_interest: []; // Update this type if the structure of profile_interest is known
  updatedAt?: string; // Optional, as not all users have this field
}

export interface StaffListResponse {
  message: string;
  users: StaffProps[];
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}

// delete interface

export interface KeyContactDeleteCredential {
  id: string;
}
export interface KeyContactDeleteResponse {
  message: string;
}
export interface StaffDeleteResponse {
  message: string;
}
export interface CompanyDeleteResponse {
  message: string;
}
export interface AssociationDeleteResponse {
  message: string;
}
export interface VenueDeleteResponse {
  message: string;
}
export interface ConferenceDeleteResponse {
  message: string;
}
export interface DeleteApiResponse {
  message: string;
}
export interface ApproveResponse {
  message: string;
}

export interface CompanySingleResponse {
  message: string;
  company: CompanyDetailsProps;
}

export interface CompanyDetailsProps {
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
  company_user_id: string;
  company_password: string;
  status: string;
  changes: CompanyChanges;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyChanges {
  fields: []; // Replace `any` with the type of items in the `fields` array if known
  _id: string;
}

export interface AssociationSingleResponse {
  message: string;
  association: AssociationDetailsProps;
}

export interface AssociationDetailsProps {
  _id: string;
  association_name: string;
  association_city: string;
  state_id: number;
  association_address: string;
  association_type_id: number;
  association_website: string;
  status: string;
  changes: AssociationChanges;
  createdAt: string;
  updatedAt: string;
}

export interface AssociationChanges {
  date: string; // ISO date string
  type: string; // e.g., "create", "update"
  fields: string[]; // Array of field names
  user_id: string;
  _id: string;
}

export interface VenueSingleResponse {
  message: string;
  venue: VenueDetailsProps;
}

export interface VenueDetailsProps {
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
  status: string;
}

export interface ConferenceSingleResponse {
  message: string;
  conference: ConferenceDetailsProps;
}

export interface ConferenceDetailsProps {
  _id: string;
  con_type_id: number;
  con_fullname: string;
  con_shortname: string;
  con_sd: string; // ISO date string
  con_ed: string; // ISO date string
  month_id: string;
  year_id: string;
  con_time: string;
  fee_id: number;
  con_city: string;
  state_id: string;
  venue_id: string;
  con_website: string;
  con_logo: string;
  con_frequency: string;
  company_id: string;
  con_segment_id: string;
  con_nassociation_id: string;
  con_hassociation_id: string;
  con_featured: boolean;
  status: string;
  changes: ConferenceChanges;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface ConferenceChanges {
  fields: []; // Replace `any` with the type of items in the `fields` array if known
  _id: string;
}

export interface ExhibitionProps {
  _id: string;
  expo_type_id: number;
  expo_fullname: string;
  expo_shortname: string;
  expo_sd: string; // ISO date string
  expo_ed: string; // ISO date string
  month_id: number;
  year_id: number;
  expo_time: string;
  fee_id: number;
  expo_city: string;
  state_id: number;
  venue_id: string;
  expo_website: string;
  expo_logo: string;
  expo_frequency: string;
  company_id: string;
  expo_segment_id: number;
  expo_eprofile: string;
  expo_vprofile: string;
  createdAt: string; // ISO date string
  status: "active" | "inactive";
  adminStatus: "approved" | "pending" | "rejected";
}

export interface ExhibitionsListResponse {
  exhibitions: ExhibitionProps[];
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}
