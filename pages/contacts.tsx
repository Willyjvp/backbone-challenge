import { Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useIterator from '../hooks/useIterator';
import { Contact, ContactList } from '../models/contacts';
import ContactsTable from './components/ContactsTable';

function Contacts() {
  const [contactList, loading, changePage, changeRowsPerPage] = useIterator();
  // const [contactList, setContactList] = useState<ContactList>({
  //   count: 1,
  //   perPage: 10,
  //   currentPage: 1,
  //   totalPages: 1,
  //   contactList: [],
  // });

  // // const [actualPage, setActualPage] = useState(1);

  // const changePage = (newPage: number) => {
  //   setContactList((prev) => ({ ...prev, currentPage: newPage }));
  // };

  // const changeRowsPerPage = (rows: number) => {
  //   setContactList((prev) => ({ ...prev, perPage: rows }));
  // };

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.backbonechallenge.app/contacts?_sort=createdAt:DESC&page=${contactList.currentPage}&perPage=${contactList.perPage}`
  //     )
  //     .then((response) => {
  //       const { data } = response;
  //       const { results } = data;
  //       setContactList({ ...data, contactList: results });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [contactList.currentPage, contactList.perPage]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4">Contacts</Typography>
      <ContactsTable
        contactObject={contactList}
        setPage={changePage}
        setRowsPerPage={changeRowsPerPage}
      />
    </Container>
  );
}

export default Contacts;
