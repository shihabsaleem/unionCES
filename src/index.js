import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GoogleOAuthProvider } from '@moeindana/google-oauth';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="216897459132-is5uedn4bgee26tqko9rpsp173hesqd1.apps.googleusercontent.com">
      
      <App />

    </GoogleOAuthProvider>
    
  </React.StrictMode>
);
