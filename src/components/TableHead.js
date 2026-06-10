import React from 'react';

    function TableHead(props) {
      return (
        <thead>
          <tr>
            {props.columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
      );
    }

    export default TableHead;
    