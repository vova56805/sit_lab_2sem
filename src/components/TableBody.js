import TableRow from './TableRow.js';

const TableBody = (props) => {
  const activePage = Number(props.numPage);
  const amountRows = Number(props.amountRows);

  const begRange = props.isPaginated ? (activePage - 1) * amountRows : 0;
  const endRange = props.isPaginated ? begRange + amountRows : props.body.length;

  const tbody = props.body.map((item, index) => (
    <tr
      key={`${item['Название фильма']}-${index}`}
      className={index >= begRange && index < endRange ? 'show' : 'hide'}
    >
      <TableRow row={Object.values(item)} isHead={false} />
    </tr>
  ));

  return <tbody>{tbody}</tbody>;
};

export default TableBody;
