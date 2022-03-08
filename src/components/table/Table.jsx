import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const Table = ({rows,columns}) => {
  return (
    <div style={{ height: 720, width: "100%" }}>
      <DataGrid
        //Necesario si no hay id en la tabla
        getRowId={row => row.idprojects}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default Table;
