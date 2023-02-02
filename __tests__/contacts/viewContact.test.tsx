import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { ContactContext } from '../../context/ContactContext';
import store from '../../context/state/store';
import { Provider } from 'react-redux';
import ViewContactPage from '../../pages/contacts/[id]';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Contacs Page', () => {
  it('Table have the data', async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      pathname: '/contacts/63b73e3e2c3946770b3926d3',
      push: '/contacts/63b73e3e2c3946770b3926d3',
      query: { id: '63b73e3e2c3946770b3926d3' },
    }));

    const singleContact = {
      firstName: 'tgtg',
      lastName: 'Mertz',
      email: 'emer@mail.com',
      phone: '3423423434',
      createdAt: '2022-12-15T16:15:47.256Z',
      updatedAt: '2022-12-15T16:15:47.256Z',
      id: '639b4833f716c7bec36637e4',
    };

    render(
      <ContactContext.Provider
        value={{
          isLoading: false,
          contactList: {
            count: 1,
            perPage: 10,
            currentPage: 1,
            totalPages: 1,
            contacts: [],
          },
          singleContact,
          changePage: () => {},
          changeRowsPerPage: () => {},
          handleSingleContact: () => {},
          handleFilter: () => {},
          filterText: '',
          setStateFilterText: () => {},
        }}
      >
        <Provider store={store}>
          <ViewContactPage />
        </Provider>
      </ContactContext.Provider>
    );

    //check if data was rendered
    const text = await screen.findByText('Mertz', { exact: false });
    expect(text).toBeInTheDocument();
  });
});
