import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Slider } from './components/Slider';
import { Carousel } from './components/Carousel';
import { FeaturedProducts } from './components/FeaturedProducts';

function App() {
  return (
    <div className="App">
      <Header />
      <Slider />
      <Carousel />
      <FeaturedProducts />
      <Footer />
    </div>
  );
}

export default App;
