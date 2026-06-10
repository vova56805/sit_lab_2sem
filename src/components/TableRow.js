
const TableRow = (props) => {
  const cells = props.isHead
    ? props.row.map((item, index) => <th key={index}>{item}</th>)
    : props.row.map((item, index) => <td key={index}>{item}</td>);

  return <>{cells}</>;
};

export default TableRow;