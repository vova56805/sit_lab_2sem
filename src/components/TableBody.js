import React from 'react';

    function TableBody(props) {
      return (
        <tbody>
          {props.data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      );
    }

    export default TableBody;
    