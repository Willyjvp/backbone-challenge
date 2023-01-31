import { Container, Typography } from '@mui/material';
import useIterator from '../../hooks/useIterator';
import ContactsTable from '../../components/ContactsTable';
import { useContactContext } from '../../context/ContactContext';

function Contacts() {
  const { isLoading, changePage, changeRowsPerPage } =
    useContactContext();

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
