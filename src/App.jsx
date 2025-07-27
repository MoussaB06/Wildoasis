import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountriesList from "./components/CountriesList";
import City from "./components/City";

/// Ce Component ce charge de montrer quel component apparait a l'ecran
// selon le changement des Routes.
export default function App() {
  const [cities, setCities] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  // On Mount mean onn the initial render of this component.
  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:9000/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <>
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
            <Route
              index
              element={<CityList cities={cities} isloading={isLoading} />}
            />
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            />

            {/* City */}
            <Route path="cities/:id" element={<City />} />

            {/* CountryList */}
            <Route
              path="countries"
              element={<CountriesList isLoading={isLoading} cities={cities} />}
            />
            <Route
              path="form"
              element={<CountriesList isLoading={isLoading} cities={cities} />}
            />
          </Route>

          {/* 'Ce path qui veut dire que le route vas voir qu'il 
          aucun des path='...' qui match alors on affiche
           l'etoile '*' ' */}

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
