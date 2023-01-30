import axios from 'axios';
import { useEffect, useState } from 'react';
import { ContactList } from '../models/contacts';


const useIterator = (): [ContactList, boolean, (page: number) => void, (rows: number) => void] => {
  const [contactList, setContactList] = useState<ContactList>({
    count: 1,
    perPage: 10,
    currentPage: 1,
    totalPages: 1,
    contactList: [],
  });
  const [loading, setLoading] = useState(true);

  const CONTACT_API = process.env.NEXT_PUBLIC_CONTACTS_API;

  useEffect(() => {
    if (contactList)
      axios.get(
        `${CONTACT_API}/contacts?_sort=createdAt:DESC&page=${contactList.currentPage}&perPage=${contactList.perPage}`
      ).then((response) => {
        setLoading(true);
        const { data } = response;
        const { results } = data;
        setContactList({ ...data, contactList: results });
        setLoading(false);
      }).catch((e) => {
        console.log(e);

      });
  }, [CONTACT_API, contactList.currentPage, contactList.perPage]);

  const fetchContacts = () => {
    setLoading(true);
    if (contactList)
      axios.get(
        `${CONTACT_API}/contacts?_sort=createdAt:DESC&page=${contactList.currentPage}&perPage=${contactList.perPage}`
      ).then((response) => {
        const { data } = response;
        const { results } = data;
        setContactList({ ...data, contactList: results });
        setLoading(false);
      }).catch((e) => {
        console.log(e);

      });
  };

  const changePage = (newPage: number) => {
    if (contactList)
      setContactList((prev) => ({ ...prev, currentPage: newPage }));
  };

  const changeRowsPerPage = (rows: number) => {
    if (contactList)
      setContactList((prev) => ({ ...prev, perPage: rows }));
  };

  return [
    contactList,
    loading,
    changePage,
    changeRowsPerPage,
  ];
};

export default useIterator;