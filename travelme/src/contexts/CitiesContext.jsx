import { useContext } from "react";
import { createContext, useState, useEffect } from "react";

const CITIES_URL = "http://localhost:9000/cities";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function getCities() {
      try {
        setIsLoading(true);
        const result = await fetch(`${CITIES_URL}`);
        const data = await result.json();
        setCities(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getCities();
  }, []);

  async function getCity(cityId) {
    try {
      setIsLoading(true);
      const result = await fetch(`${CITIES_URL}/${cityId}`);
      const data = await result.json();
      setCurrentCity(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
        setCities: setCities,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
        currentCity: currentCity,
        getCity: getCity,
        getFlag: getFlag,
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
