import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { Pagination } from '../../components/Pagination';
import { Products } from '../Products';

const queryClient = new QueryClient();

describe('ProductList Page tests', () => {
  test('should render <Products> page', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Products />
        </Router>
      </QueryClientProvider>
    );
  });

  test('Product Category Sidebar is fetching and rendering data from the API', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Products />
        </Router>
      </QueryClientProvider>
    );

    expect(await screen.findByText(/Furniture/i)).toBeInTheDocument();
  });

  test('Prev button is disabled when the user is on the first page', () => {
    render(<Pagination pages={[1, 2, 3]} onPageChange={() => {}} />); // TODO: Find a better way to mock onPageChange funciton, at the moment it's a false positive

    expect(screen.getByText(/Prev/i).classList.contains('disabled')).toBe(true);
  });

  test('Next button is disabled when the user is on the last page', () => {
    render(<Pagination pages={[1, 2, 3]} onPageChange={() => {}} />); // TODO: Find a better way to mock onPageChange funciton, at the moment it's a false positive

    fireEvent.click(screen.getByText(/Next/i));

    expect(screen.getByText(/Next/i).classList.contains('disabled')).toBe(true);
  });
});
