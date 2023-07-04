import Forecast from "./components/Forecast";
import Search from "./components/Search";

import useForecast from "./hooks/useForecast";

function App(): JSX.Element {
  const { term, forecast, options, onInputChange, onOptionSelect, onSubmit } =
    useForecast();
  return (
    <div className="app">
      <section className="main-section">
        {forecast ? (
          <Forecast data={forecast} />
        ) : (
          <Search
            term={term}
            options={options}
            onInputChange={onInputChange}
            onOptionSelect={onOptionSelect}
            onSubmit={onSubmit}
          />
        )}
      </section>
    </div>
  );
}

export default App;
