import { useState, useEffect, ChangeEvent } from "react";
import { optionType, forecastType } from "../types/index";

const BASE_URL = "http://api.openweathermap.org";

const useForecast = () => {
  const [city, setCity] = useState<optionType | null>(null);
  const [term, setTerm] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);
  const [forecast, setForecast] = useState<forecastType | null>(null);

  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOptions([]);
    }
  }, [city]);

  const getSearchOptions = async (value: string) => {
    fetch(
      `${BASE_URL}/geo/1.0/direct?q=${value.trim()}&limit=5&lang=en&appid=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch((e) => console.log({ e }));
  };

  const getForecast = (city: optionType) => {
    fetch(
      `${BASE_URL}/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&lang=en&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setForecast(data);
      })
      .catch((e) => console.log({ e }));
  };

  const onOptionSelect = (option: optionType) => {
    setCity(option);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(e.target.value);
    if (value !== "") {
      getSearchOptions(value);
    }
  };

  const onSubmit = () => {
    if (!city) return;
    getForecast(city);
  };

  return { term, forecast, options, onInputChange, onOptionSelect, onSubmit };
};

export default useForecast;
