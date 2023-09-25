import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// routes
import Router from './routes';
import { CssBaseline } from '@mui/material';
import Theme from './theme';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Theme>
          <Router />
        </Theme>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
