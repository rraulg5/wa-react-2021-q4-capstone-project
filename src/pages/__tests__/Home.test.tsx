import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import { Home } from '../Home';
import { Slider } from '../../components/Slider';
import { Categories } from '../../components/Categories';
import { FeaturedProducts } from '../../components/FeaturedProducts';

const queryClient = new QueryClient();

describe('Home Page tests', () => {
  test('should render <Home> page', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Home />
        </Router>
      </QueryClientProvider>
    );
  });

  test('Featured Banners Slider is fetching and rendering data from the API', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Slider />
      </QueryClientProvider>
    );
    expect(
      await screen.findByText(/AMAZING FINISHES - BEDROOM/i)
    ).toBeInTheDocument();
  });

  test('Categories Carousel/Grid is fetching and rendering data from the API', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Categories />
        </Router>
      </QueryClientProvider>
    );
    expect(await screen.findByText(/Bed & Bath/i)).toBeInTheDocument();
    expect(await screen.findByText(/Furniture/i)).toBeInTheDocument();
  });

  test('Featured Products Grid is fetching and rendering data from the API', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <FeaturedProducts />
        </Router>
      </QueryClientProvider>
    );
    expect(await screen.findByText(/Grayton Armchair/i)).toBeInTheDocument();
  });
});
