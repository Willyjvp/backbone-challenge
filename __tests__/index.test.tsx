import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

describe('Home', () => {
  it('renders the initial page', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /backbone challenge/i,
    });
    expect(heading).toBeInTheDocument();

    const button = screen.getByRole('button', {
      name: /contact list/i,
    });

    expect(button).toBeInTheDocument();
  });
});
