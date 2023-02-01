import { Container, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ContactForm, { FormData } from '../../../components/ContactForm';
import { useAlertContext } from '../../../context/AlertContext';
import { useContactContext } from '../../../context/ContactContext';

const EditContact = () => {
  const { singleContact, handleFilter } = useContactContext();
  const { handleAlert } = useAlertContext();

  const router = useRouter();
  const { id } = router.query as { id: string };

  useEffect(() => {
    if (singleContact?.firstName === '') router.push('/contacts');
  });

  if (singleContact?.firstName === '') return <></>;

  const onSubmit = (data: FormData) => {
    const { firstName, lastName, email, phone } = data;
    const requestArray: { [key: string]: any } = [];

    if (firstName !== singleContact?.firstName)
      requestArray.firstName = firstName;
    if (lastName !== singleContact?.lastName) requestArray.lastName = lastName;
    if (phone !== singleContact?.phone) requestArray.phone = phone;
    if (email !== singleContact?.email) requestArray.email = email;

    if (Object.values(requestArray).length === 0) {
      handleAlert({
        message: 'Nothing was changed',
        type: 'info',
        show: true,
      });

      return;
    }

    const CONTACT_API = process.env.NEXT_PUBLIC_CONTACTS_API;

    const postContact = async () => {
      try {
        await axios.put(`${CONTACT_API}/contacts/${id}`, {
          ...requestArray,
        });

        handleAlert({
          message: 'Contact was edited!',
          type: 'success',
          show: true,
        });

        handleFilter('');

        router.push('/contacts');
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
        Edit contact
      </Typography>
      <ContactForm
        actionType="Update"
        onSubmit={onSubmit}
        singleContact={singleContact}
      />
    </Container>
  );
};

export default EditContact;
