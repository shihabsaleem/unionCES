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
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/table")
      .then((response) => {
        console.log("API Response:", response.data);
        setRows(response.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

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
      {rows.length > 0 && (
        <DataGrid
          rows={rows}
          columns={columns.concat(actionColumn)}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      )}
    </div>
  );
};

export default Datatable;
