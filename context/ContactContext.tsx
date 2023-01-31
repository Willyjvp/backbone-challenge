import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { Contact, ContactList } from '../models/contacts';

type ContactContextType = {
  isLoading: boolean;
  contactList: ContactList;
  singleContact?: Contact;
  changePage: (page: number) => void;
  changeRowsPerPage: (row: number) => void;
  handleSingleContact: (id: string) => void;
  handleFilter: (filter: string) => void;
};

const CONTACT_API = process.env.NEXT_PUBLIC_CONTACTS_API;

const ContactContext = createContext<ContactContextType>({
  isLoading: false,
  contactList: {
    count: 1,
    perPage: 10,
    currentPage: 1,
    totalPages: 1,
    contacts: [],
  },
  changePage: (page: number) => {},
  changeRowsPerPage: (row: number) => {},
  handleSingleContact: (id: string) => {},
  handleFilter: (filter: string) => {},
});

export const useContactContext = () => {
  return useContext(ContactContext);
};

export const ContactContextProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [singleContact, setSingleContact] = useState<Contact>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    createdAt: '',
    updatedAt: '',
  });
  const [contactList, setContactList] = useState<ContactList>({
    count: 1,
    perPage: 10,
    currentPage: 1,
    totalPages: 1,
    contacts: [],
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data } = await axios.get(
          `${CONTACT_API}/contacts?_sort=createdAt:DESC&page=${contactList.currentPage}&perPage=${contactList.perPage}`
        );
        setIsLoading(true);
        const { results } = data;
        delete data.results;
        setContactList({ ...data, contacts: results });
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchContacts();
  }, [contactList.currentPage, contactList.perPage]);

  const handleFilter = async (filter: string) => {
    try {
      const { data } = await axios.get(
        `${CONTACT_API}/contacts?_sort=createdAt:DESC&page=${contactList.currentPage}&perPage=${contactList.perPage}&email_contains=${filter}`
      );
      setIsLoading(true);
      const { results } = data;
      delete data.results;
      setContactList({ ...data, contacts: results });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const changePage = (newPage: number) => {
    if (contactList)
      setContactList((prev) => ({ ...prev, currentPage: newPage }));
  };

  const changeRowsPerPage = (rows: number) => {
    if (contactList) setContactList((prev) => ({ ...prev, perPage: rows }));
  };

  const handleSingleContact = (id: string) => {
    const item = contactList.contacts.filter((item) => item.id === id);
    if (item) setSingleContact(item[0]);
  };

  return (
    <ContactContext.Provider
      value={{
        isLoading,
        contactList,
        singleContact,
        changePage,
        changeRowsPerPage,
        handleSingleContact,
        handleFilter,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
