import React from "react";
import { BrowserRouter } from "react-router-dom";  // Import BrowserRouter
import AppRoutes from "./AppRoutes.jsx";
import Layout from "./components/Layout.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
