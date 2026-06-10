import { useEffect, useMemo, useState } from 'react';
import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';

const Table = (props) => {
  const [dataTable, setDataTable] = useState(props.data);
  const [activePage, setActivePage] = useState(Number(props.defaultPage) || 1);

  const amountRows = Number(props.amountRows) || props.data.length;
  const isPaginated = Boolean(props.isPaginated);

  const columns = props.data && props.data.length > 0 ? Object.keys(props.data[0]) : [];

  const countPages = useMemo(() => {
    if (!isPaginated) {
      return 1;
    }

    return Math.max(1, Math.ceil(dataTable.length / amountRows));
  }, [amountRows, dataTable.length, isPaginated]);

  const pages = Array.from({ length: countPages }, (_, index) => index + 1);

  useEffect(() => {
    if (activePage > countPages) {
      setActivePage(countPages);
    }
  }, [activePage, countPages]);

  const changeActive = (event) => {
    setActivePage(Number(event.target.innerText));
  };

  const updateDataTable = (value) => {
    setDataTable(value);
    setActivePage(1);
  };

  if (!props.data || props.data.length === 0) {
    return <p className="empty-message">Нет данных для отображения.</p>;
  }

  return (
    <>
      <h4>Фильтры</h4>

      <Filter filtering={updateDataTable} fullData={props.data} />

      <div className="table-wrapper">
        <table>
          <TableHead head={columns} />
          <TableBody
            body={dataTable}
            amountRows={amountRows}
            numPage={activePage}
            isPaginated={isPaginated}
          />
        </table>
      </div>

      {dataTable.length === 0 && (
        <p className="empty-message">По заданным условиям записи не найдены.</p>
      )}

      {isPaginated && countPages > 1 && (
        <div className="pagination">
          {pages.map((item) => (
            <span
              key={item}
              onClick={changeActive}
              className={activePage === item ? 'active-page' : ''}
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default Table;
