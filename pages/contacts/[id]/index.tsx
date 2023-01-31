import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Contact } from '../../../models/contacts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { useContactContext } from '../../../context/ContactContext';

const CONTACT_API = process.env.NEXT_PUBLIC_CONTACTS_API;

const ViewContactPage = () => {
  const { singleContact } = useContactContext();

  const router = useRouter();
  const { id } = router.query as { id: string };

  const handleActionContact = (action: string, id: string) => {
    router.push({
      pathname: `/contacts/[id]/${action}`,
      query: { id: id },
    });
  };

  return (
    <Box maxWidth="700px">
      {singleContact !== undefined && (
        <>
          <Typography variant="h4" mt={3}>
            Contact
          </Typography>
          <Card sx={{ mt: '3rem' }}>
            <CardHeader
              avatar={
                <AccountCircleIcon sx={{ fontSize: '4rem' }} color="primary" />
              }
              title={`${singleContact.firstName} ${singleContact.lastName}`}
              subheader={`Phone: ${singleContact.phone}`}
              titleTypographyProps={{ fontSize: '1.5rem' }}
              subheaderTypographyProps={{ fontSize: '1.2rem' }}
            />
            <CardContent>
              <Typography variant="body1" fontSize="1.2rem">
                Email: {singleContact.email}
              </Typography>
              <Typography variant="body1" fontSize="1.2rem">
                Created At: {new Date(singleContact.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body1" fontSize="1.2rem">
                Last Update:{' '}
                {new Date(singleContact.updatedAt).toLocaleString()}
              </Typography>
            </CardContent>
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
