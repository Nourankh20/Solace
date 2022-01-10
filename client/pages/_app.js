import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { BrowserRouter, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import InternatTransfer from "../pages/internal_transfer";
import ExternalTransfer from "../pages/external_transfer";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  <BrowserRouter>
    <Navbar />
    <div>
      <Route path="/" component={Dashboard} />
      <Route path="/internal_transfer" component={InternatTransfer} />
      <Route path="/external_transfer" component={ExternalTransfer} />
    </div>
  </BrowserRouter>;

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
