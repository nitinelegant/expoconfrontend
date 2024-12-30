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
}
export interface AddKeyContactCredentials {
  contact_name: string;
  contact_mobile: string;
  contact_email: string;
  state_id: number;
  contact_organizer_id?: string; // Optional, if applicable
  contact_venue_id?: string; // Optional, if applicable
  contact_association_id?: string; // Optional, if applicable
}
export interface AssociationCredentials {
  association_website: string; // The website of the association
  association_name: string; // The name of the association
  association_city: string; // The city where the association is located
  state_id: number; // The ID of the state
  association_address: string; // The address of the association
  association_type_id: number; // The ID representing the type of association
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
