import React from "react";
import AppRoutes from "./AppRoutes.jsx";
import Layout from "./components/Layout.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
        <Layout>
          <AppRoutes />
        </Layout>
    </div>
  );
}

export default App;
