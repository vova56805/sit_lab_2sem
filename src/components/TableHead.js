import TableRow from './TableRow.js';



const TableHead = (props) => {
  return (
    <thead>
      <tr>
        <TableRow row={props.head} isHead={true} />
      </tr>
    </thead>
  );
};

export default TableHead;