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
