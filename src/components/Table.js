const Table = ({ data }) => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Название фильма</th>
          <th>Год</th>
          <th>Жанр</th>
          <th>Режиссер</th>
          <th>Страна</th>
          <th>Рейтинг IMDb</th>
          <th>Длительность</th>
        </tr>
      </thead>

      <tbody>
        {data.map((film, index) => (
          <tr key={index}>
            <td>{film["Название фильма"]}</td>
            <td>{film["Год"]}</td>
            <td>{film["Жанр"]}</td>
            <td>{film["Режиссер"]}</td>
            <td>{film["Страна"]}</td>
            <td>{film["Рейтинг IMDb"]}</td>
            <td>{film["Длительность"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;