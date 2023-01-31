import { Container, Typography } from '@mui/material';
import ContactsTable from '../../components/ContactsTable';
import Filter from '../../components/Filter';
import { useContactContext } from '../../context/ContactContext';

function Contacts() {
  const { isLoading, changePage, changeRowsPerPage } = useContactContext();

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
      <Filter />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <ContactsTable
          setPage={changePage}
          setRowsPerPage={changeRowsPerPage}
        />
      )}
    </Container>
  );
}

export default Contacts;
