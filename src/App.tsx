import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
import { AboutMe } from './components/AboutMe';
import { Portfolio } from './components/Portfolio';

function App() {
  return (
    <div className='wrapper'>
      <Navigation />
      <Header />
      <AboutMe />
      <Portfolio />
    </div>
  );
}

export default App;
