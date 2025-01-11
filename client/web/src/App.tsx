import { Route, Routes, useLocation } from 'react-router-dom';
import { Main } from './pages/Main';
import { Portfolio } from './pages/Portfolio';
import { AboutMe } from './pages/AboutMe';
import { WithStore } from './stores/WithStore.tsx';
import { usePDF } from 'react-to-pdf';
import { useEffect } from 'react';
import { AutoSave } from './pages/AutoSave';

function App() {
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });

  const location = useLocation(); // Хук для получения текущего URL
  useEffect(() => {
    if (location.pathname !== '/autoSave') {
      return;
    }

    setTimeout(() => {
      toPDF();
    }, 1000);
  }, [location]);

  return (
    <WithStore>
      <div className='wrapper ' ref={targetRef}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/portfolio' element={<Portfolio />} />
          <Route path='/aboutme' element={<AboutMe />} />
          <Route path='/autoSave' element={<AutoSave />} />
        </Routes>
      </div>
    </WithStore>
  );
}

export default App;
