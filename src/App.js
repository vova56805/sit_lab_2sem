import { useState } from "react";
import "./App.css";
import films from "./films";
import Chart from "./components/Chart";
import Table from "./components/Table";
import Filter from "./components/Filter";

function App() {
  const [filteredFilms, setFilteredFilms] = useState(films);

  return (
    <div className="App">
      <h3>Фильмы</h3>

      <Chart data={filteredFilms} />

      <h4>Фильтры</h4>
      <Filter fullData={films} filtering={setFilteredFilms} />

      <Table data={filteredFilms} />
    </div>
  );
}

export default App;