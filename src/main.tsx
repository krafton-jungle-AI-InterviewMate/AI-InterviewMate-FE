import React from "react";
import ReactDOM from "react-dom/client";
import App from "App";
import GlobalStyles from "styles/GlobalStyles";
import RecoilProvider from "components/providers/RecoilProvider";
import QueryProvider from "components/providers/QueryProvider";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryProvider>
    <RecoilProvider>
      <CookiesProvider>
        <GlobalStyles />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CookiesProvider>
    </RecoilProvider>
  </QueryProvider>,
);
