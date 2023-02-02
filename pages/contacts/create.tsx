import { Container, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios';
import Router from 'next/router';
import ContactForm, { FormData } from '../../components/ContactForm';
import { useContactContext } from '../../context/ContactContext';
import { AlertType, showAlert } from '../../context/state/alert.slice';
import { useAppDispatch } from '../../context/state/hooks';
import { useTimeoutAlert } from '../../hooks/useTimeout';

const CreateContact = () => {
  const { handleFilter } = useContactContext();
  const [handleTimeoutAlert] = useTimeoutAlert();
  const dispatch = useAppDispatch();

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

        dispatch(
          showAlert({
            show: true,
            message: 'Contact was created!',
            type: AlertType.SUCCESS,
          })
        );

        handleTimeoutAlert(3);

        handleFilter('');

        Router.push('/contacts');
      } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
          const { message } = err.response.data as { message: string };

          dispatch(
            showAlert({
              show: true,
              message: message,
              type: AlertType.ERROR,
            })
          );

          handleTimeoutAlert(3);
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
