import { Box, Button, Container, TextField, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAlertContext } from '../../../context/AlertContext';
import { useContactContext } from '../../../context/ContactContext';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const EditContact = () => {
  const { singleContact, handleFilter } = useContactContext();
  const { handleAlert } = useAlertContext();

  const router = useRouter();
  const { id } = router.query as { id: string };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      firstName: singleContact?.firstName,
      lastName: singleContact?.lastName,
      email: singleContact?.email,
      phone: singleContact?.phone,
    },
  });

  const onSubmit = (data: FormData) => {
    const { firstName, lastName, email, phone } = data;

    const CONTACT_API = process.env.NEXT_PUBLIC_CONTACTS_API;

    const postContact = async () => {
      try {
        await axios.put(`${CONTACT_API}/contacts/${id}`, {
          firstName,
          lastName,
          email,
          phone,
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
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '60%' }}>
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <TextField
              error={errors.firstName !== undefined}
              helperText={errors.firstName?.message}
              label="First name"
              variant="standard"
              {...register('firstName', { required: 'First name is required' })}
              sx={{
                width: { xs: '100%', sm: '45%' },
                minWidth: '150px',
                mt: 3,
              }}
            />
            <TextField
              error={errors.lastName !== undefined}
              helperText={errors.lastName?.message}
              label="Last name"
              variant="standard"
              {...register('lastName', { required: 'Last name is required' })}
              sx={{
                width: { xs: '100%', sm: '45%' },
                minWidth: '150px',
                mt: 3,
              }}
            />
          </Box>
          <TextField
            error={errors.phone !== undefined}
            helperText={errors.phone?.message}
            label="Phone"
            variant="standard"
            {...register('phone', { required: 'Phone is required' })}
            sx={{ mt: 3 }}
          />
          <TextField
            error={errors.email !== undefined}
            helperText={errors.email?.message}
            label="Email"
            variant="standard"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email',
              },
            })}
            sx={{ mt: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ alignSelf: 'flex-end', width: '120px', mt: 3 }}
          >
            Update
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default EditContact;
