import { Route, Routes, useNavigate } from 'react-router-dom';
import { PortfolioList } from './pages/PortfolioList';
import { Container } from '@gravity-ui/uikit';
import { Portfolio } from './pages/Portfolio';
import { Header } from './components/Header';
import { configure, Lang } from '@gravity-ui/dynamic-forms';
import { configure as configureDialog } from '@gravity-ui/dialog-fields';
import { WorkExperience } from './pages/WorkExperience';
import { Conferences } from './pages/Conferences';
import { Publications } from './pages/Publications';
import { Presentations } from './pages/Presentations';
import { Educations } from './pages/Educations';
import { useEffect } from 'react';
import { api } from './api/api.ts';

configure({ lang: Lang.Ru });
configureDialog({ lang: Lang.Ru });

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    api.getPortfolios().catch(() => navigate('/auth'));
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Routes>
          <Route path='/' element={<PortfolioList />} />
          <Route path='/:id' element={<Portfolio />} />
          <Route path='/:id/workExperience' element={<WorkExperience />} />
          <Route path='/:id/conferences' element={<Conferences />} />
          <Route path='/:id/publications' element={<Publications />} />
          <Route path='/:id/presentations' element={<Presentations />} />
          <Route path='/:id/educations' element={<Educations />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
