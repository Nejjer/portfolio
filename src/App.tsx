import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main';
import { Portfolio } from './pages/Portfolio';
import { AboutMe } from './pages/AboutMe';

function App() {
  return (
    <div className='wrapper '>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/aboutme' element={<AboutMe />} />
      </Routes>
    </div>
  );
}

export default App;
