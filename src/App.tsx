import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main';
import { Portfolio } from './pages/Portfolio';

function App() {
  return (
    <div className='wrapper'>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/portfolio' element={<Portfolio />} />
      </Routes>
    </div>
  );
}

export default App;
