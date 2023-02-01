import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { ContactContext } from '../../context/ContactContext';
import userEvent from '@testing-library/user-event';
import DeleteContact from '../../pages/contacts/[id]/delete';
import { AlertContextProvider } from '../../context/AlertContext';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Delete Page', () => {
  it('Load content of contact', async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      pathname: '/contacts/63b73e3e2c3946770b3926d3/delete',
      push: '/contacts/63b73e3e2c3946770b3926d3/delete',
      query: { id: '63b73e3e2c3946770b3926d3' },
    }));

    const user = userEvent.setup();

    const singleContact = {
      firstName: 'tgtg',
      lastName: 'Mertz',
      email: 'emer@mail.com',
      phone: '3423423434',
      createdAt: '2022-12-15T16:15:47.256Z',
      updatedAt: '2022-12-15T16:15:47.256Z',
      id: '63b73e3e2c3946770b3926d3',
    };

    const contacts = [singleContact];

    render(
      <ContactContext.Provider
        value={{
          isLoading: false,
          contactList: {
            count: 1,
            perPage: 10,
            currentPage: 1,
            totalPages: 1,
            contacts: contacts,
          },
          singleContact: singleContact,
          changePage: () => {},
          changeRowsPerPage: () => {},
          handleSingleContact: () => {},
          handleFilter: () => {},
        }}
      >
        <AlertContextProvider>
          <DeleteContact />
        </AlertContextProvider>
      </ContactContext.Provider>
    );

    //check if data was rendered
    const text = await screen.findByText('Mertz', { exact: false });
    expect(text).toBeInTheDocument();

    const button = await screen.findByRole('button', { name: /delete/i });
    user.click(button);
  });
});
