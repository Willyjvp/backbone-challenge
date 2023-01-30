import axios from 'axios';
import { useEffect, useState } from 'react';
import { ContactList } from '../models/contacts';


const CONTACT_API = process.env.NEXT_PUBLIC_CONTACTS_API;

const useIterator = (): [ContactList, boolean, (page: number) => void, (rows: number) => void] => {
  const [contactList, setContactList] = useState<ContactList>({
    count: 1,
    perPage: 10,
    currentPage: 1,
    totalPages: 1,
    contactList: [],
  });
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data } = await axios.get(
          `${CONTACT_API}/contacts?_sort=createdAt:DESC&page=${contactList.currentPage}&perPage=${contactList.perPage}`
        );
        setLoading(true);
        const { results } = data;
        setContactList({ ...data, contactList: results });

      }
      catch (error) {
        console.log(error);
      }
      setLoading(false);
    };


    fetchContacts();
  }, [contactList.currentPage, contactList.perPage]);

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