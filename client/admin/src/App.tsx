import { WithStore } from './stores/WithStore.tsx';
import { Route, Routes } from 'react-router-dom';
import { PortfolioList } from './pages/PortfolioList';
import { Container } from '@gravity-ui/uikit';
import { Portfolio } from './pages/Portfolio';
import { Header } from './components/Header';
import { configure, Lang } from '@gravity-ui/dynamic-forms';
import { configure as configureDialog } from '@gravity-ui/dialog-fields';
import { WorkExperience } from './pages/WorkExperience';

configure({ lang: Lang.Ru });
configureDialog({ lang: Lang.Ru });

function App() {
  return (
    <WithStore>
      <Header />

      <Container>
        <Routes>
          <Route path='/' element={<PortfolioList />} />
          <Route path='/:id' element={<Portfolio />} />
          <Route path='/:id/workExperience' element={<WorkExperience />} />
        </Routes>
      </Container>
    </WithStore>
  );
}

export default App;
