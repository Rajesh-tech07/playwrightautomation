import { resolve } from 'node:path';
import * as XLSX from 'xlsx';
import type { ContactFormDetails, LoginCredentials, SignUpCredentials } from '../types/auth';

const workbook = XLSX.readFile(resolve(__dirname, '../UserData.xlsx'));

export function readSignUpData(): SignUpCredentials {
  // The existing tab is named "Register " with a trailing space. Accept either name.
  const worksheet = workbook.Sheets['Register'] ?? workbook.Sheets['Register '];
  if (!worksheet) throw new Error('Register sheet not found');

  // First Excel row supplies the headers; the remaining rows become user objects.
  const users = XLSX.utils.sheet_to_json<SignUpCredentials>(worksheet, {
    defval: '',  // Read blank cells as empty strings.
    raw: false, // Read formatted text, including ZIP codes and phone numbers.
  });

  // Signup uses only the first data row.
  const user = users[0];
  if (!user) throw new Error('No signup data found in the Register sheet');

  return user;
}

export function readLoginData(): LoginCredentials[] {
  const worksheet = workbook.Sheets['Login'];
  if (!worksheet) throw new Error('Login sheet not found');

  const users = XLSX.utils.sheet_to_json<LoginCredentials>(worksheet, {
    defval: '',
    raw: false,
  });
  if (users.length === 0) throw new Error('No login data found in the Login sheet');

  return users;
}

export function readContactData(): ContactFormDetails {
  const worksheet = workbook.Sheets['contactus'];
  if (!worksheet) throw new Error('Contact us sheet not found');

  const contactDetails = XLSX.utils.sheet_to_json<ContactFormDetails>(worksheet, {
    defval: '',
    raw: false,
  });

  const details = contactDetails[0];
  if (!details) throw new Error('No contact info found in the contactus sheet');

  return details;
}
