import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ContactList } from '../../models/contacts';
import { TableHead } from '@mui/material';

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

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    if (newPage === totalPages) setPage(1);
    else setPage(newPage === 0 ? 1 : newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row">
              Name
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              Phone
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              Email
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contactList.map((item) => (
            <TableRow key={item.id}>
              <TableCell style={{ width: 160 }} align="right">
                {`${item.firstName} ${item.lastName}`}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {item.phone}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {item.email}
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
              page={currentPage}
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
