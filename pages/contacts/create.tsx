import { Container, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios';
import Router from 'next/router';
import ContactForm, { FormData } from '../../components/ContactForm';
import { useAlertContext } from '../../context/AlertContext';
import { useContactContext } from '../../context/ContactContext';

const CreateContact = () => {
  const { handleAlert } = useAlertContext();
  const { handleFilter } = useContactContext();

  const onSubmit = (data: FormData) => {
    const { firstName, lastName, email, phone } = data;

    const CONTACT_API = process.env.NEXT_PUBLIC_CONTACTS_API;

    const postContact = async () => {
      try {
        await axios.post(`${CONTACT_API}/contacts`, {
          firstName,
          lastName,
          email,
          phone,
        });

        handleAlert({
          message: 'Contact was created!',
          type: 'success',
          show: true,
        });

        handleFilter('');

        Router.push('/contacts');
      } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
          const { message } = err.response.data as { message: string };

          handleAlert({
            message: message,
            type: 'error',
            show: true,
          });
        }
      }
    };

    postContact();
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" alignSelf="center" mb={3} mt={10}>
        Create contact
      </Typography>
      <ContactForm
        actionType="Create"
        onSubmit={onSubmit}
        singleContact={undefined}
      />
    </Container>
  );
};

export default CreateContact;
