import {
  Box,
  Card,
  CardActions,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import Router, { useRouter } from 'next/router';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { useContactContext } from '../../../context/ContactContext';
import CardHeaderContent from '../../../components/CardHeaderContent';
import { useEffect } from 'react';

const ViewContactPage = () => {
  const { singleContact } = useContactContext();

  const router = useRouter();
  const { id } = router.query as { id: string };

  useEffect(() => {
    if (singleContact?.firstName === '') router.push('/contacts');
  });

  const handleActionContact = (action: string, id: string) => {
    router.push({
      pathname: `/contacts/[id]/${action}`,
      query: { id: id },
    });
  };

  return (
    <Box maxWidth="700px">
      {singleContact?.firstName !== '' && singleContact && (
        <>
          <Typography variant="h4" mt={10}>
            Contact
          </Typography>
          <Card sx={{ mt: '3rem' }}>
            <CardHeaderContent singleContact={singleContact} />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Tooltip title="Edit">
                <IconButton
                  color="success"
                  onClick={() => handleActionContact('edit', id)}
                >
                  <ModeEditOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  color="error"
                  onClick={() => handleActionContact('delete', id)}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Card>
        </>
      )}
    </Box>
  );
};

export default ViewContactPage;
