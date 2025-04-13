import AppRoutes from "./AppRoutes.jsx";
import Layout from "./components/Layout.jsx";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <div className="App">
        <Layout>
          <AppRoutes />
          <Toaster />
        </Layout>
    </div>
  );
}

export default App;
