import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@gravity-ui/uikit';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './output.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider theme='dark'>
      <App />
    </ThemeProvider>{' '}
  </BrowserRouter>,
);
