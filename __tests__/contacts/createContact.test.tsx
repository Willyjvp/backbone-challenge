import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import { ContactContext } from '../../context/ContactContext';
import userEvent from '@testing-library/user-event';
import CreateContact from '../../pages/contacts/create';
import store from '../../context/state/store';
import { Provider } from 'react-redux';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Create Page', () => {
  it('Initial conditions', async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      pathname: '/contacts/create',
      push: '/contacts/create',
    }));

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
          singleContact: undefined,
          changePage: () => {},
          changeRowsPerPage: () => {},
          handleSingleContact: () => {},
          handleFilter: () => {},
          filterText: '',
          setStateFilterText: () => {},
        }}
      >
        <Provider store={store}>
          <CreateContact />
        </Provider>
      </ContactContext.Provider>
    );

    const firstName = screen.getByRole('textbox', {
      name: /first name/i,
    });
    expect(firstName).toHaveTextContent('');

    const phone = screen.getByRole('textbox', {
      name: /phone/i,
    });
    expect(phone).toHaveTextContent('');

    const email = screen.getByRole('textbox', {
      name: /email/i,
    });
    expect(email).toHaveTextContent('');
  });

  it('Create a new Contact', async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      pathname: '/contacts/create',
      push: '/contacts/create',
    }));

    const user = userEvent.setup();

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
          singleContact: undefined,
          changePage: () => {},
          changeRowsPerPage: () => {},
          handleSingleContact: () => {},
          handleFilter: () => {},
          filterText: '',
          setStateFilterText: () => {},
        }}
      >
        <Provider store={store}>
          <CreateContact />
        </Provider>
      </ContactContext.Provider>
    );

    const createBtn = await screen.findByRole('button', { name: /create/i });

    fireEvent.input(
      await screen.findByRole('textbox', { name: /first name/i }),
      {
        target: {
          value: 'first name test',
        },
      }
    );
    fireEvent.input(
      await screen.findByRole('textbox', { name: /last name/i }),
      {
        target: {
          value: 'last name test',
        },
      }
    );
    fireEvent.input(await screen.findByRole('textbox', { name: /phone/i }), {
      target: {
        value: '4213',
      },
    });
    fireEvent.input(await screen.findByRole('textbox', { name: /email/i }), {
      target: {
        value: 'test@test.test',
      },
    });

    await user.dblClick(createBtn);

    expect(screen.queryByText('Phone is invalid')).not.toBeInTheDocument();
    expect(screen.queryByText('First Name is invalid')).not.toBeInTheDocument();
    expect(screen.queryByText('Last Name is invalid')).not.toBeInTheDocument();
    expect(screen.queryByText('Email is invalid')).not.toBeInTheDocument();
  });

  it('Create a new Contact with errors', async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      pathname: '/contacts/create',
      push: '/contacts/create',
    }));

    const user = userEvent.setup();

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
          singleContact: undefined,
          changePage: () => {},
          changeRowsPerPage: () => {},
          handleSingleContact: () => {},
          handleFilter: () => {},
          filterText: '',
          setStateFilterText: () => {},
        }}
      >
        <Provider store={store}>
          <CreateContact />
        </Provider>
      </ContactContext.Provider>
    );

    const createBtn = await screen.findByRole('button', { name: /create/i });

    fireEvent.input(
      await screen.findByRole('textbox', { name: /first name/i }),
      {
        target: {
          value: 'first name test',
        },
      }
    );
    fireEvent.input(
      await screen.findByRole('textbox', { name: /last name/i }),
      {
        target: {
          value: 'last name test',
        },
      }
    );
    fireEvent.input(await screen.findByRole('textbox', { name: /phone/i }), {
      target: {
        value: '4213a',
      },
    });
    fireEvent.input(await screen.findByRole('textbox', { name: /email/i }), {
      target: {
        value: 'test@test.',
      },
    });

    await user.dblClick(createBtn);

    //phone and email invalid
    expect(screen.getByText('Phone is invalid')).toBeInTheDocument();
    expect(screen.getByText('Invalid email')).toBeInTheDocument();

    //just email invalid
    fireEvent.input(await screen.findByRole('textbox', { name: /phone/i }), {
      target: {
        value: '4213',
      },
    });
    fireEvent.input(await screen.findByRole('textbox', { name: /email/i }), {
      target: {
        value: 'test@test.12',
      },
    });

    await user.dblClick(createBtn);

    expect(screen.queryByText('Phone is invalid')).not.toBeInTheDocument();
    expect(screen.getByText('Invalid email')).toBeInTheDocument();

    //max chars on phone
    fireEvent.input(await screen.findByRole('textbox', { name: /phone/i }), {
      target: {
        value: '12345678901',
      },
    });
    fireEvent.input(await screen.findByRole('textbox', { name: /email/i }), {
      target: {
        value: 'test@test.com',
      },
    });

    await user.dblClick(createBtn);

    expect(screen.getByText(/Phone is invalid/i)).toBeInTheDocument();
    expect(screen.queryByText('Invalid email')).not.toBeInTheDocument();
  });
});
