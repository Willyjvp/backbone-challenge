import { CardContent, CardHeader, Typography } from '@mui/material';
import { Contact } from '../models/contacts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface CardHeaderProps {
  singleContact: Contact;
}

const CardHeaderContent = ({ singleContact }: CardHeaderProps) => {
  return (
    <>
      <CardHeader
        avatar={<AccountCircleIcon sx={{ fontSize: '4rem' }} color="primary" />}
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
          Last Update: {new Date(singleContact.updatedAt).toLocaleString()}
        </Typography>
      </CardContent>
    </>
  );
};

export default CardHeaderContent;
