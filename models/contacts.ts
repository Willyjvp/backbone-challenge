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
  contactList: Contact[];
}