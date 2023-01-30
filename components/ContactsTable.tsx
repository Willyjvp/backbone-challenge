import { ContactList } from '../models/contacts';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  TableHead,
  Typography,
  IconButton,
  Tooltip,
  Box,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';

interface ContactsTableProps {
  contactObject: ContactList;
  setPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
}

export default function ContactsTable({
  contactObject,
  setPage,
  setRowsPerPage,
}: ContactsTableProps) {
  const { count, perPage, currentPage, totalPages, contactList } =
    contactObject;

  const router = useRouter();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    newPage++;

    if (newPage === totalPages) setPage(1);
    else setPage(newPage === 0 ? 1 : newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleActionContact = (action: string, id: string) => {
    router.push({
      pathname: `/contacts/[id]${action === 'view' ? '' : `/${action}`}`,
      query: { id: id },
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contactList.map((item) => (
            <TableRow key={item.id}>
              <TableCell align="left">
                <Box
                  onClick={() => handleActionContact('view', item.id)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <AccountCircleIcon fontSize="large" sx={{ mr: 2 }} />
                  <div>
                    <Typography variant="body1">
                      {`${item.firstName} ${item.lastName}`}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: '70%' }}>
                      {item.phone}
                    </Typography>
                  </div>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Edit">
                  <IconButton
                    color="success"
                    onClick={() => handleActionContact('edit', item.id)}
                  >
                    <ModeEditOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => handleActionContact('delete', item.id)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              count={count}
              rowsPerPage={perPage}
              page={currentPage - 1}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
