import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import AllProducts from "./components/AllProducts/AllProducts";
import Contact from "./components/Contact/Contact";
import PageByCategory from "./components/PageByCategory/PageByCategory";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import Login from "./components/Login/Login";

import NewProduct from "./components/NewProduct/NewProduct";
import NewCategoryOrSubcategory from "./components/NewCategoryOrSubcategory/NewCategoryOrSubcategory";
import ManageStock from "./components/AdminPanel/ManageStock/ManageStock";

const PrivateRoute = ({ element }) => {
 

  const checkLoggedIn = () => {
    return !!localStorage.getItem("username");
  };

  const loggedIn = checkLoggedIn();

  return loggedIn ? element : <Navigate to="/acceso" />;
};

function App() {
  const currentPath = window.location.pathname;
  const isLoginOrDashboard =
    currentPath === "/acceso" || currentPath === "/dashboard" || currentPath === "/dashboard/new_product" || currentPath === "/dashboard/new_category_or_subcategory" || currentPath === "/dashboard/manage_stock" ;

  return (
    <>
      {!isLoginOrDashboard && <NavBar />}
      <Routes>
        <Route stric path="/" element={<Landing />} />
        <Route stric path="/productos" element={<AllProducts />} />
        <Route stric path="/contacto" element={<Contact />} />
        <Route stric path="/categoria/:id" element={<PageByCategory />} />
        <Route stric path="/acceso" element={<Login />} />
        <Route stric path="/dashboard" element={<PrivateRoute element={<AdminPanel />} />}/>
        <Route stric path="/dashboard/new_product" element={<PrivateRoute element={<NewProduct />} />}/>
        <Route stric path="/dashboard/new_category_or_subcategory" element={<PrivateRoute element={<NewCategoryOrSubcategory />} />}/>
        <Route stric path="/dashboard/manage_stock" element={<PrivateRoute element={<ManageStock />} />}/>


      </Routes>
      {!isLoginOrDashboard && <Footer />}
    </>
  );
}

export default App;
