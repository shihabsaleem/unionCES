import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./restable.scss";
import { useEffect } from "react";
import axios from "axios";

const columns = [
  { field: "id", headerName: "Adm No", width: 150 },
  { field: "name", headerName: "Name", width: 300 },
  { field: "dept", headerName: "Department", width: 150 },
  { field: "semester", headerName: "Semester", width: 100 },
  { field: "seat", headerName: "Seat", width: 150 },
  { field: "vote", headerName: "Votes", width: 150 },
];


const Restable = () => {
  const [rows, setRows] = useState()
  useEffect(()=>{
    axios.get("http://localhost:8000/api/result").then(e=>setRows(e.data))
  },[])
  return (
    <div className="Restable">
      {rows && <DataGrid
        rows={rows}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
      />}
    </div>
  );
};

export default Restable;
