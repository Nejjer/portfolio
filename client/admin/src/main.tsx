import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@gravity-ui/uikit';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './output.css';
import { Auth } from './pages/Auth';
import { WithStore } from './stores/WithStore.tsx';
import { Registration } from './pages/Registration';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={'/web-admin'}>
    <WithStore>
      <ThemeProvider theme='dark'>
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path='/register' element={<Registration />} />
          <Route path={'/*'} element={<App />} />
        </Routes>
      </ThemeProvider>
    </WithStore>
  </BrowserRouter>,
);
