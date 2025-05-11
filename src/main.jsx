import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
// import { UserProvider } from './contexts/UserContext.jsx';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* Wrap the UserProvider around the App */}
      {/* <UserProvider> */}

      <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
      {/* </UserProvider> */}
    </BrowserRouter>
  </StrictMode>,
);
