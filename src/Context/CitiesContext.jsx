import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
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
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("the context was outside the CitiesProvider");

  return context;
}

export { CitiesProvider, useCities };
