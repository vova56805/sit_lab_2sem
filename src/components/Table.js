import React, { useState } from 'react';
    import TableHead from './TableHead.js';
    import TableBody from './TableBody.js';

    function Table(props) {
      const [filter, setFilter] = useState('');
      const filteredFilms = props.data.filter(film => film['Название фильма'].includes(filter));

      const handleFilterChange = (e) => {
        setFilter(e.target.value);
      };

      return (
        <div className="table">
          <input type="text" placeholder="Поиск фильмов" value={filter} onChange={handleFilterChange} />
          <table>
            <TableHead columns={Object.keys(filteredFilms[0])} />
            <TableBody data={filteredFilms} />
          </table>
        </div>
      );
    }

    export default Table;
    