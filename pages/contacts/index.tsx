import { Container, Typography } from '@mui/material';
import useIterator from '../../hooks/useIterator';
import ContactsTable from '../../components/ContactsTable';

function Contacts() {
  const [contactList, loading, changePage, changeRowsPerPage] = useIterator();

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
      <Typography variant="h4" alignSelf="center" mb={3}>
        Contacts
      </Typography>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <ContactsTable
          contactObject={contactList}
          setPage={changePage}
          setRowsPerPage={changeRowsPerPage}
        />
      )}
    </Container>
  );
}

export default Contacts;
