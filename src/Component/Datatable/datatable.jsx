import React, { useEffect, useState } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  { field: "id", headerName: "Adm No", width: 150 },
  { field: "name", headerName: "Name", width: 300 },
  { field: "dept", headerName: "Department", width: 150 },
  { field: "sem", headerName: "Semester", width: 100 },
  { field: "seat", headerName: "Seat", width: 150 },
];

const Datatable = () => {
  const [rows, setRows] = useState()
  useEffect(()=>{
    axios.get("http://localhost:8000/api/table")
    .then(e=>setRows(e.data))
  },[])
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: () => {
        return (
          <div className="cellAction">
            <div className="delButton">Delete</div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      {rows && <DataGrid
        rows={rows}
        columns={columns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
      />}
    </div>
  );
};

export default Datatable;
