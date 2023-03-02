import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import Countries from "./Countries";

function App() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    const request = axios.get("https://restcountries.com/v3.1/all").then((res) => res.data);
    request.then((results) => {
      setCountries(results);
    });
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);

    if (!e.target.value.length) {
      setCountriesToShow([]);
      return;
    }

    setCountriesToShow(
      countries.filter(({ name }) => name.common.toLowerCase().includes(query.toLowerCase()))
    );
  };

  return (
    <div className="App">
      <Search query={query} handleChange={handleChange} />
      <Countries countries={countriesToShow} handleSetCountriesToShow={setCountriesToShow} />
    </div>
  );
}

export default App;
