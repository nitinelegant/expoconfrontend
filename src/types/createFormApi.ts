export interface AddCompanyResponseProps {
  message: string;
  company: {
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
  };
}
export interface AddKeyContactResponseProps {
  message: string;
  keycontact: {
    contact_name: string;
    contact_mobile: string;
    contact_email: string;
    state_id: number;
    contact_organizer_id?: string; // Optional, if applicable
    contact_venue_id?: string; // Optional, if applicable
    contact_association_id?: string; // Optional, if applicable
  };
}

export interface AddCompanyCredentials {
  company_name: string;
  company_city: string;
  state_id: string;
  company_address: string;
  company_phone: string;
  company_website: string;
  company_map: string;
  company_logo: string;
  company_featured: boolean;
  company_user_id: string;
  company_password: string;
}
export interface AddKeyContactCredentials {
  contact_name: string;
  contact_mobile: string;
  contact_email: string;
  state_id: string;
  contact_organizer_id?: string; // Optional, if applicable
  contact_venue_id?: string; // Optional, if applicable
  contact_association_id?: string; // Optional, if applicable
}
export interface AssociationCredentials {
  association_website: string; // The website of the association
  association_name: string; // The name of the association
  association_city: string; // The city where the association is located
  state_id: string; // The ID of the state
  association_address: string; // The address of the association
  association_type_id: string; // The ID representing the type of association
}

export interface AssociationResponseProps {
  message: string;
  association: {
    association_website: string; // The website of the association
    association_name: string; // The name of the association
    association_city: string; // The city where the association is located
    state_id: number; // The ID of the state
    association_address: string; // The address of the association
    association_type_id: number; // The ID representing the type of association
  };
}

export interface AddVenueCredentials {
  venue_name: string;
  venue_city: string;
  state_id: string;
  venue_address: string;
  venue_phone: string;
  venue_website?: string;
  venue_map?: string;
  venue_photo?: string;
  venue_layout?: string;
  venue_featured: boolean;
}
export interface AddVenueResponseProps {
  message: string;
  venue: {
    venue_name: string;
    venue_city: string;
    state_id: number;
    venue_address: string;
    venue_phone: string;
    venue_website?: string;
    venue_map?: string;
    venue_photo?: string;
    venue_layout?: string;
    venue_featured: boolean;
  };
}

export interface AddConferenceCredentials {
  con_type_id: string;
  con_fullname: string;
  con_shortname: string;
  con_sd: string; // ISO date string
  con_ed: string; // ISO date string
  month_id: number | null;
  year_id: string | null;
  con_time: string;
  fee_id: number;
  con_city: string;
  state_id: string;
  venue_id: string | null;
  con_website: string;
  con_logo: string;
  con_frequency: string;
  company_id: string;
  con_segment_id: string;
  con_nassociation_id: string;
  con_hassociation_id: string;
}
export interface AddExhibitionCredentials {
  expo_fullname: string;
  expo_shortname: string;
  expo_sd: string;
  expo_ed: string;
  month_id: number;
  year_id: string | null;
  expo_time: string;
  fee_id: number;
  expo_city: string;
  state_id: number;
  venue_id: string;
  expo_website: string;
  expo_logo: string;
  expo_frequency: string;
  company_id: string;
  expo_segment_id: string;
  expo_eprofile: string;
  expo_vprofile: string;
}
export interface ContactChanges {
  date: string; // ISO date string
  type: string; // e.g., "update", "create"
  fields: string[]; // Array of field names
}

export interface AddKeyConferenceResponseProps {
  message: string;
  conference: AddConferenceCredentials;
}

export interface AddStaffCredentials {
  user_fullname: string;
  user_email: string;
  user_password: string;
  user_prefix?: string;
}

export interface AddStaffResponseProps {
  message: string;
}

export interface ApiCreateCommonResponse {
  message: string;
}
