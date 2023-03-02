import CountryDetail from "./CountryDetail";

const Countries = ({ countries, handleSetCountriesToShow }) => {
  const tooManyMessage = "Too many matches, please another filter";

  if (!countries.length) {
    return null;
  }

  if (countries.length > 10) {
    return <p>{tooManyMessage}</p>;
  }

  if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <p key={country.name.official}>
            {country.name.common}{" "}
            <button onClick={() => handleSetCountriesToShow([country])}>show</button>
          </p>
        ))}
      </div>
    );
  }

  return <CountryDetail country={countries[0]} />;
};
export default Countries;
