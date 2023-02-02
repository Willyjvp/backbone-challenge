import { render, screen, waitFor } from '@testing-library/react';
import Contacts from '../../pages/contacts';
import { useRouter } from 'next/router';
import { ContactContextProvider } from '../../context/ContactContext';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../../context/state/store';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Contacs Page', () => {
  it('Table have the data', async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      pathname: '/',
      push: '/contacts',
    }));

    render(
      <Provider store={store}>
        <ContactContextProvider>
          <Contacts />
        </ContactContextProvider>
      </Provider>
    );

    //checking some rows to be in the document
    const text = await screen.findByText('Edythe Gerhold');
    expect(text).toBeInTheDocument();

    const text2 = await screen.findByText('Lady Gaga');
    expect(text2).toBeInTheDocument();

    const text3 = await screen.findByText('tgtg Mertz');
    expect(text3).toBeInTheDocument();

    //include the header and footer row
    const trElements = await screen.findAllByRole('row');
    expect(trElements).toHaveLength(12);
  });

  it('Filter data', async () => {
    const user = userEvent.setup();
    (useRouter as jest.Mock).mockImplementation(() => ({
      pathname: '/',
      push: '/contacts',
    }));

    render(
      <Provider store={store}>
        <ContactContextProvider>
          <Contacts />
        </ContactContextProvider>
      </Provider>
    );

    //include the header and footer row
    await waitFor(async () => {
      const trElements = await screen.findAllByRole('row');
      expect(trElements).toHaveLength(12);
    });

    const filterInput = screen.getByRole('textbox', {
      name: /search by email/i,
    });

    expect(filterInput).toBeInTheDocument();

    //filter by text
    await user.type(filterInput, 'twain');

    const text3 = await screen.findByText('Mark Twain');
    expect(text3).toBeInTheDocument();
  });
});
