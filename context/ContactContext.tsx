import { Alert } from '@mui/material';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useTimeoutAlert } from '../hooks/useTimeout';
import { Contact, ContactList } from '../models/contacts';
import { AlertType, showAlert } from './state/alert.slice';
import { useAppDispatch, useAppSelector } from './state/hooks';

type ContactContextType = {
  isLoading: boolean;
  contactList: ContactList;
  singleContact?: Contact;
  changePage: (page: number) => void;
  changeRowsPerPage: (row: number) => void;
  handleSingleContact: (id: string) => void;
  handleFilter: (filter: string) => void;
  filterText: string;
  setStateFilterText: (text: string) => void;
};

const CONTACT_API = process.env.NEXT_PUBLIC_CONTACTS_API;

export const ContactContext = createContext<ContactContextType>({
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
  filterText: '',
  setStateFilterText: (text: string) => {},
});

export const useContactContext = () => {
  return useContext(ContactContext);
};

export const ContactContextProvider = ({ children }: any) => {
  const alert = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();
  const [handleTimeoutAlert] = useTimeoutAlert();

  const [isLoading, setIsLoading] = useState(false);
  const [filterText, setFilterText] = useState('');

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
        dispatch(
          showAlert({
            message: 'Internal error',
            type: AlertType.ERROR,
            show: true,
          })
        );

        handleTimeoutAlert(4);
      }
      setIsLoading(false);
    };

    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      dispatch(
        showAlert({
          message: 'Internal error',
          type: AlertType.ERROR,
          show: true,
        })
      );

      handleTimeoutAlert(4);
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

  const setStateFilterText = (text: string) => {
    setFilterText(text);
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
        filterText,
        setStateFilterText,
      }}
    >
      {children}
      {alert.show && (
        <>
          <Alert
            severity={alert.type}
            sx={{ position: 'absolute', bottom: '20px', right: '20px' }}
          >
            {alert.message}
          </Alert>
        </>
      )}
    </ContactContext.Provider>
  );
};
