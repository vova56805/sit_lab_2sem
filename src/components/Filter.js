import { useState } from "react";

const initialFilter = {
  title: "",
  genre: "",
  director: "",
  country: "",
  yearFrom: "",
  yearTo: "",
  ratingFrom: "",
  ratingTo: "",
  durationFrom: "",
  durationTo: "",
};

const textIncludes = (value, search) => {
  return String(value).toLowerCase().includes(search.toLowerCase());
};

const valueInRange = (value, min, max) => {
  const numberValue = Number(value);
  const minValue = min === "" ? -Infinity : Number(min);
  const maxValue = max === "" ? Infinity : Number(max);

  return numberValue >= minValue && numberValue <= maxValue;
};

const Filter = (props) => {
  const [filter, setFilter] = useState(initialFilter);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const filteredData = props.fullData.filter((item) => {
      return (
        textIncludes(item["Название фильма"], filter.title) &&
        textIncludes(item["Жанр"], filter.genre) &&
        textIncludes(item["Режиссер"], filter.director) &&
        textIncludes(item["Страна"], filter.country) &&
        valueInRange(item["Год"], filter.yearFrom, filter.yearTo) &&
        valueInRange(item["Рейтинг IMDb"], filter.ratingFrom, filter.ratingTo) &&
        valueInRange(item["Длительность"], filter.durationFrom, filter.durationTo)
      );
    });

    props.filtering(filteredData);
  };

  const handleReset = () => {
    setFilter(initialFilter);
    props.filtering(props.fullData);
  };

  return (
    <form className="filter-form" onSubmit={handleSubmit} onReset={handleReset}>
      <div className="filter-row">
        <label htmlFor="title">Название фильма:</label>
        <input
          id="title"
          name="title"
          type="text"
          value={filter.title}
          onChange={handleChange}
        />
      </div>

      <div className="filter-row">
        <label htmlFor="genre">Жанр:</label>
        <input
          id="genre"
          name="genre"
          type="text"
          value={filter.genre}
          onChange={handleChange}
        />
      </div>

      <div className="filter-row">
        <label htmlFor="director">Режиссер:</label>
        <input
          id="director"
          name="director"
          type="text"
          value={filter.director}
          onChange={handleChange}
        />
      </div>

      <div className="filter-row">
        <label htmlFor="country">Страна:</label>
        <input
          id="country"
          name="country"
          type="text"
          value={filter.country}
          onChange={handleChange}
        />
      </div>

      <div className="filter-row">
        <label htmlFor="yearFrom">Год от:</label>
        <input
          id="yearFrom"
          name="yearFrom"
          type="number"
          value={filter.yearFrom}
          onChange={handleChange}
        />
      </div>

      <div className="filter-row">
        <label htmlFor="yearTo">Год до:</label>
        <input
          id="yearTo"
          name="yearTo"
          type="number"
          value={filter.yearTo}
          onChange={handleChange}
        />
      </div>

      <div className="filter-row">
        <label htmlFor="ratingFrom">Рейтинг от:</label>
        <input
          id="ratingFrom"
          name="ratingFrom"
          type="number"
          step="0.1"
          value={filter.ratingFrom}
          onChange={handleChange}
        />
      </div>

      <div className="filter-row">
        <label htmlFor="ratingTo">Рейтинг до:</label>
        <input
          id="ratingTo"
          name="ratingTo"
          type="number"
          step="0.1"
          value={filter.ratingTo}
          onChange={handleChange}
        />
      </div>

      <div className="filter-row">
        <label htmlFor="durationFrom">Длительность от:</label>
        <input
          id="durationFrom"
          name="durationFrom"
          type="number"
          value={filter.durationFrom}
          onChange={handleChange}
        />
      </div>

      <div className="filter-row">
        <label htmlFor="durationTo">Длительность до:</label>
        <input
          id="durationTo"
          name="durationTo"
          type="number"
          value={filter.durationTo}
          onChange={handleChange}
        />
      </div>

      <div className="filter-buttons">
        <button type="submit">Фильтровать</button>
        <button type="reset">Очистить фильтр</button>
      </div>
    </form>
  );
};

export default Filter;