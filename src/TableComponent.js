import React from 'react';
import { useSelector } from 'react-redux';

const TableComponent = () => {
  const formSubmissions = useSelector(state => state.formSubmissions);

  if (!formSubmissions.length) {
    return null;
  }

  return (
    <div>
      {formSubmissions.map((formData, index) => (
        <div key={index} className="submission-table">
          <table>
            <thead>
            <tr>
              <th>Field Name</th>
              <th>Value</th>
            </tr>
            </thead>
            <tbody>
            {Object.entries(formData).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default TableComponent;
