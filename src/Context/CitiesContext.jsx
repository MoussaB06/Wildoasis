import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      throw new Error("Unknown action type a sahbi");
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // On Mount mean onn the initial render of this component.
  useEffect(() => {
    async function fetchCities() {
      try {
        // setIsLoading(true);
        dispatch({ type: "loading" });
        const res = await fetch(`http://localhost:9000/cities`);
        const data = await res.json();
        // setCities(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "there was an error loading cities...",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    // tout ce qui vient de l'url est une chaine de caractere
    if (+id === currentCity.id) return;

    try {
      dispatch({ type: "loading" });
      const res = await fetch(`http://localhost:9000/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "there was an error loading the city...",
      });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`http://localhost:9000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);

      // setCities((cities) => [...cities, data]);
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there is an error on creating a city",
      });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`http://localhost:9000/cities/${id}`, {
        method: "DELETE",
      });

      // setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({
        type: "city/deleted",
        payload: id,
      });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there is some error in deleting a city",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("The context was outside the CitiesProvider");

  return context;
}

export { CitiesProvider, useCities };
