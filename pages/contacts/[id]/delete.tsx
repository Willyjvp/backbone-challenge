import {
  Box,
  Button,
  Card,
  CardActions,
  Tooltip,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useContactContext } from '../../../context/ContactContext';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios, { AxiosError } from 'axios';
import CardHeaderContent from '../../../components/CardHeaderContent';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../context/state/hooks';
import { AlertType, showAlert } from '../../../context/state/alert.slice';
import { useTimeoutAlert } from '../../../hooks/useTimeout';

const DeleteContact = () => {
  const { singleContact, handleFilter } = useContactContext();
  const dispatch = useAppDispatch();
  const [handleTimeoutAlert] = useTimeoutAlert();

  const router = useRouter();
  const { id } = router.query as { id: string };

  useEffect(() => {
    if (singleContact?.firstName === '') router.push('/contacts');
  });

  if (singleContact?.firstName === '') return <></>;

  const CONTACT_API = process.env.NEXT_PUBLIC_CONTACTS_API;

  const handleDelete = async () => {
    try {
      await axios.delete(`${CONTACT_API}/contacts/${id}`);

      dispatch(
        showAlert({
          show: true,
          message: 'Contact deleted',
          type: AlertType.INFO,
        })
      );

      handleTimeoutAlert(3);

      handleFilter('');

      router.push('/contacts');
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

  return (
    <Box maxWidth="700px">
      {singleContact !== undefined && (
        <>
          <Typography variant="h4" mt={10}>
            Contact
          </Typography>
          <Card sx={{ mt: '3rem' }}>
            <CardHeaderContent singleContact={singleContact} />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Tooltip title="Delete">
                <Button
                  color="error"
                  endIcon={<DeleteOutlineIcon />}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Tooltip>
            </CardActions>
          </Card>
        </>
      )}
    </Box>
  );
};

export default DeleteContact;
