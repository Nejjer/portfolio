import { WithStore } from './stores/WithStore.tsx';
import { Route, Routes } from 'react-router-dom';
import { PortfolioList } from './pages/PortfolioList';
import { Container } from '@gravity-ui/uikit';
import { Portfolio } from './pages/Portfolio';
import { Header } from './components/Header';

function App() {
  return (
    <WithStore>
      <Header />

      <Container>
        <Routes>
          <Route path='/' element={<PortfolioList />} />
          <Route path='/:id' element={<Portfolio />} />
        </Routes>
      </Container>
    </WithStore>
  );
}

export default App;
