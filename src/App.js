import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// routes
import Router from './routes';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
          <CssBaseline/>
          <Router />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
