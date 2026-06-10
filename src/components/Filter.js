import { useState } from 'react';

const initialFilter = {
  structure: '',
  type: '',
  country: '',
  city: '',
  yearFrom: '',
  yearTo: '',
  heightFrom: '',
  heightTo: ''
};

const textIncludes = (value, search) => {
  return String(value).toLowerCase().includes(search.toLowerCase());
};

const valueInRange = (value, min, max) => {
  const numberValue = Number(value);
  const minValue = min === '' ? -Infinity : Number(min);
  const maxValue = max === '' ? Infinity : Number(max);

  return numberValue >= minValue && numberValue <= maxValue;
};



const Filter = (props) => {
  const [filter, setFilter] = useState(initialFilter);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFilter({
      ...filter,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const filteredData = props.fullData.filter((item) => {
      return (
        textIncludes(item['Название'], filter.structure) &&
        textIncludes(item['Тип'], filter.type) &&
        textIncludes(item['Страна'], filter.country) &&
        textIncludes(item['Город'], filter.city) &&
        valueInRange(item['Год'], filter.yearFrom, filter.yearTo) &&
        valueInRange(item['Высота'], filter.heightFrom, filter.heightTo)
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
        <label htmlFor="structure">Название:</label>
        <input
          id="structure"
          name="structure"
          type="text"
          value={filter.structure}
          onChange={handleChange}
        />
      </div>

      <div className="filter-row">
        <label htmlFor="type">Тип:</label>
        <input
          id="type"
          name="type"
          type="text"
          value={filter.type}
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
        <label htmlFor="city">Город:</label>
        <input
          id="city"
          name="city"
          type="text"
          value={filter.city}
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
        <label htmlFor="heightFrom">Высота от:</label>
        <input
          id="heightFrom"
          name="heightFrom"
          type="number"
          step="0.1"
          value={filter.heightFrom}
          onChange={handleChange}
        />
      </div>

      <div className="filter-row">
        <label htmlFor="heightTo">Высота до:</label>
        <input
          id="heightTo"
          name="heightTo"
          type="number"
          step="0.1"
          value={filter.heightTo}
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