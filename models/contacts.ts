export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactList {
  count: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  contacts: Contact[];
}

export interface ContactState {
  contactList: ContactList;
  singleContact: Contact;
  loading: boolean;
}

export interface ContactAction {
  type: string;
  payload: ContactState;
}