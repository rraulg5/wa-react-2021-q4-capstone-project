import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import routes from './config/routes';
import RouteItem from './interfaces/RouteItem';

import { Layout } from './components/Layout';
import { CartProvider } from './context/CartProvider';
import ErrorBoundary from './components/ErrorBoundary';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <CartProvider>
          <Router basename={process.env.PUBLIC_URL}>
            <Layout>
              <Switch>
                {routes.map((r: RouteItem) => (
                  <Route
                    key={r.key}
                    path={r.path}
                    component={r.component}
                    exact={r.exact}
                  />
                ))}
              </Switch>
            </Layout>
          </Router>
        </CartProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;
