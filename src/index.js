import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="216897459132-evkboikaf7tbollfo86ujee88q3nknv4.apps.googleusercontent.com">
      
      <App />

    </GoogleOAuthProvider>
    
  </React.StrictMode>
);
