import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Contact } from '../models/contacts';

interface ContactFormProps {
  onSubmit: (data: FormData) => void;
  singleContact: Contact | undefined;
  actionType: 'Update' | 'Create';
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const ContactForm = ({
  onSubmit,
  singleContact,
  actionType,
}: ContactFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: singleContact ? singleContact.firstName : '',
      lastName: singleContact ? singleContact.lastName : '',
      email: singleContact ? singleContact.email : '',
      phone: singleContact ? singleContact.phone : '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        display="flex"
        flexDirection="column"
        sx={{ width: { xs: '100%', sm: '60vw' }, maxWidth: '600px' }}
      >
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
          {...register('phone', {
            required: 'Phone is required',
            maxLength: {
              value: 10,
              message: 'Phone is invalid (10 numbers max)',
            },
            pattern: {
              value: /^([0-9]\d*)$/i,
              message: 'Phone is invalid',
            },
          })}
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
          {actionType}
        </Button>
      </Box>
    </form>
  );
};

export default ContactForm;
