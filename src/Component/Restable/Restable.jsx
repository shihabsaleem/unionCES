import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./restable.scss";

const columns = [
  { field: "id", headerName: "Adm No", width: 150 },
  { field: "name", headerName: "Name", width: 300 },
  { field: "dept", headerName: "Department", width: 150 },
  { field: "sem", headerName: "Semester", width: 100 },
  { field: "seat", headerName: "Seat", width: 150 },
  { field: "vote", headerName: "Votes", width: 150 },
];

const rows = [
  {
    id: 2019001,
    name: "John Doe",
    dept: "CS",
    sem: 7,
    seat: "Chair",
    vote: 75,
  },
  {
    id: 2019002,
    name: "Jon Doe",
    dept: "EE",
    sem: 7,
    seat: "Chair",
    vote: 350,
  },
  {
    id: 2019003,
    name: "Jon Doe",
    dept: "EC",
    sem: 7,
    seat: "Chair",
    vote: 25,
  },
];

const Restable = () => {
  return (
    <div className="Restable">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
      />
    </div>
  );
};

export default Restable;
