import React from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "Adm No", width: 150 },
  { field: "name", headerName: "Name", width: 300 },
  { field: "dept", headerName: "Department", width: 150 },
  { field: "sem", headerName: "Semester", width: 100 },
  { field: "seat", headerName: "Seat", width: 150 },
];

const rows = [
  {
    id: 2019001,
    name: "John Doe",
    dept: "CS",
    sem: 7,
    seat: "Chair",
    action: "Delete",
  },
  {
    id: 2019002,
    name: "Jon Doe",
    dept: "EE",
    sem: 7,
    seat: "Chair",
    action: "Delete",
  },
];

const datatable = () => {
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
      <DataGrid
        rows={rows}
        columns={columns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default datatable;
