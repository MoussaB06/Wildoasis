import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "leaflet/dist/leaflet.css";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountriesList from "./components/CountriesList";
import City from "./components/City";
import Form from "./components/Form";

import { CitiesProvider } from "./Context/CitiesContext";
import { FakeAuthProvider } from "./Context/fakeAuthContext";

/// Ce Component ce charge de montrer quel component apparait a l'ecran
// selon le changement des Routes.
export default function App() {
  return (
    <FakeAuthProvider>
      <CitiesProvider>
        {/* <PagNav /> */}
        <BrowserRouter>
          <Routes>
            {/* Chaque component a son URL et ou 
          on place INDEX veut dire que c'est cet Ecran 
          qu'on veut afficher par default */}

            <Route index element={<HomePage />} />
            <Route path="Pricing" element={<Pricing />} />
            <Route path="Product" element={<Product />} />
            <Route path="login" element={<Login />} />

            <Route path="App" element={<AppLayout />}>
              {/* CityList */}
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />

              {/* City */}
              <Route path="cities/:id" element={<City />} />

              {/* CountryList */}
              <Route path="countries" element={<CountriesList />} />
              {/* Form */}
              <Route path="form" element={<Form />} />
            </Route>

            {/* 'Ce path qui veut dire que le route vas voir qu'il 
          aucun des path='...' qui match alors on affiche
           l'etoile '*' ' */}

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </FakeAuthProvider>
  );
}
