import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
import { AboutMe } from './components/AboutMe';
import { Portfolio } from './components/Portfolio';
import { Contacts } from './components/Contacts';

function App() {
  return (
    <div className='wrapper'>
      <Navigation />
      <Header />
      <AboutMe />
      <Portfolio />
      <Contacts />
    </div>
  );
}

export default App;
