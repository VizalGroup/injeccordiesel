import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import AllProducts from "./components/AllProducts/AllProducts";
import Contact from "./components/Contact/Contact";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        
        <Route stric path="/" element={<Landing/>} />
        <Route stric path="/productos" element={<AllProducts/>} />
        <Route stric path="/contacto" element={<Contact/>} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;
