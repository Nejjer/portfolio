import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
import { AboutMe } from './components/AboutMe';

function App() {
  return (
    <div className='wrapper'>
      <Navigation />
      <Header />
      <AboutMe />
    </div>
  );
}

export default App;
