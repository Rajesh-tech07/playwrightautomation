// Field names match the existing Excel headers.
export interface SignUpCredentials {
  name: string;
  email_Address: string;
  passwored: string;
  first_Name: string;
  last_Name: string;
  company: string;
  address_one: string;
  address_two: string;
  state: string;
  city: string;
  zipcode: string;
  mobile_Number: string;
}

export interface LoginCredentials {
  email_address: string;
  password: string;
  status: 'valid' | 'invalid';
}

export interface ContactFormDetails {
  name: string;
  email: string;
  message: string;
  subject: string;
}
