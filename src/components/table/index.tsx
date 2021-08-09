import React from "react";
import './table.css';

export const Table: React.FC = () => {
  const buildings = [
    {id: 1,  type: 'Penthouse', name: "BigFam", builtArea: 600, price: '8,750,000 LE' },
    {id: 2, type: 'iVilla', name: "iVilla", builtArea: 400, price: '4,300,000 LE' },
    {id: 3, type: 'Duplex', name: "taw2am", builtArea: 260, price: '5,250,000 LE' },
    {id: 4, type: 'Standalone', name: "Gawhara", builtArea: 300, price: '6,000,000 LE' },
  ];

  const renderTableHeader = () => {
    let header = Object.keys(buildings[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderTableData = () => {
    return buildings.map((student) => {
      const { id, type, name, builtArea, price } = student;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{type}</td>
          <td>{name}</td>
          <td>{builtArea}</td>
          <td>{price}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <h1 id="title">Product Mix</h1>
      <table id="buildings">
        <tr>{renderTableHeader()}</tr>
        <tbody>{renderTableData()}</tbody>
      </table>
    </div>
  );
};
