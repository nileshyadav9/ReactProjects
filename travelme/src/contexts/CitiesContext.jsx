import { useCallback } from "react";
import { useContext, useReducer } from "react";
import { createContext, useEffect } from "react";

const CITIES_URL = "http://localhost:9000/cities";
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
      return { ...state, isLoading: false, cities: action.payload };

    case "city/inserted":
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
        cities: state.cities.filter((city) => city.id != action.payload),
        currentCity: {},
      };

    case "errored":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown Action Type!");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function getCities() {
      dispatch({ type: "loading" });
      try {
        const result = await fetch(`${CITIES_URL}`);
        const data = await result.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "errored", payload: error });
      }
    }
    getCities();
  }, []);

  const getCity = useCallback(
    async function getCity(cityId) {
      if (Number(cityId) === currentCity.id) return;

      dispatch({ type: "loading" });
      try {
        const result = await fetch(`${CITIES_URL}/${cityId}`);
        const data = await result.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "errored", payload: error });
      }
    },
    [currentCity.id]
  );

  async function insertCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const result = await fetch(`${CITIES_URL}`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await result.json();
      dispatch({ type: "city/inserted", payload: data });
    } catch (error) {
      dispatch({ type: "errored", payload: error });
    }
  }

  async function deleteCity(cityId) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${CITIES_URL}/${cityId}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: cityId });
    } catch (error) {
      dispatch({ type: "errored", payload: error });
    }
  }

  function getFlag(flag) {
    if (flag === undefined) return;
    let countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");

    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  }

  return (
    <CitiesContext.Provider
      value={{
        cities: cities,
        isLoading,
        currentCity,
        getCity: getCity,
        getFlag: getFlag,
        insertCity,
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
    throw new Error("Cities context is used in unreachable code!");
  return context;
}

export { CitiesProvider, useCities };
