import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main';
import { Portfolio } from './pages/Portfolio';
import { AboutMe } from './pages/AboutMe';
import { WithStore } from './stores/WithStore.tsx';

function App() {
  return (
    <WithStore>
      <div className='wrapper '>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/portfolio' element={<Portfolio />} />
          <Route path='/aboutme' element={<AboutMe />} />
        </Routes>
      </div>
    </WithStore>
  );
}

export default App;
