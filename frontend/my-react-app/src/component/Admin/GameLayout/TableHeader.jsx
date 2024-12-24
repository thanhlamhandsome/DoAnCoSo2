import React from "react";

const TableHeader = ({ headers }) => {
  return (
    <thead className="bg-gray-100 border-b">
      <tr>
        {headers.map((header, index) => (
          <th key={index} className="p-4 text-left">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
