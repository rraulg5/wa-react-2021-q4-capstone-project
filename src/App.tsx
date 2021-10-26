import { GlobalStyles } from './GlobalStyles';
import { Home } from './pages/Home';
import { useState } from 'react';
import { Products } from './pages/Products';
import { Layout } from './components/Layout';

function App() {
  const [showHome, setShowHome] = useState(true);

  const showHomepage = (showHome: boolean) => {
    setShowHome(showHome);
  };

  return (
    <>
      <GlobalStyles />
      <Layout showHomepage={showHomepage}>
        {showHome ? <Home showHomepage={showHomepage} /> : <Products />}
      </Layout>
    </>
  );
}

export default App;
