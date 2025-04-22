import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import RootLayout from "./components/layouts/RootLayout.jsx";
import About from "./pages/about/About.jsx";
import Place from "./pages/places/Place.jsx";


import PlaceDetailPage from "./pages/places/PlaceDetailPage.jsx";
import CategoryPage from "./pages/places/CategoryPage.jsx";
import Dashbard from './pages/admin/Dashbord.jsx'
import PlaceMangment from "./pages/admin/PlaceMangment.jsx";
import AddPlaceForm from "./components/dashboard/AddPlaceForm.jsx";
import EditPlaceForm from "./components/dashboard/EitdPlaceForm.jsx";
import Login from "./auth/login/index.jsx";
import Register from "./auth/register/index.jsx";
import ProtectedAdmin from "./components/dashboard/ProtectedAdmin.jsx";
import AdminLogin from "./components/dashboard/Login";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/place" element={<Place />} />
          <Route path="/place/:uuid" element={<PlaceDetailPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/category/:uuid" element={<CategoryPage />} />
          

        </Route>
        {/* login */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/admin" element={
          <ProtectedAdmin>
            <Dashbard />
          </ProtectedAdmin>
        }
        />
        <Route path="/admin/place" element={<PlaceMangment />} />
        <Route path="/admin/AppPlace" element={<AddPlaceForm />} />
        <Route path="/admin/AppPlace/:placeUuid" element={<EditPlaceForm />} />


        {/* auth */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/Login" element={<AdminLogin /> }/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
