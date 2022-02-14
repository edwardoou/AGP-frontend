import React from "react";

const TableProjects = ({ projects }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Sede</th>
          <th>Empresa</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((projects) => (
          <tr key={projects.idareas}>
            <td>{projects.idareas}</td>
            <td>{projects.nombre}</td>
            <td>{projects.sede}</td>
            <td>{projects.empresa}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableProjects;
