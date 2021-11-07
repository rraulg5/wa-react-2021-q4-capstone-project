import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './config/routes';
import RouteItem from './interfaces/RouteItem';

import { Layout } from './components/Layout';

const App = () => {
  return (
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
  );
};

export default App;
