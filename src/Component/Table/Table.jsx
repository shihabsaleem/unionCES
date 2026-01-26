import React, { useEffect, useState } from "react";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

const List = () => {
  const [rows, setRows] = useState([]);

  // Fallback dummy data in case API is not running during your test
  const dummyRows = [
    { name: "John Doe", admission: "114312", semester: "6th", seat: "A12" },
    { name: "Jane Smith", admission: "114315", semester: "6th", seat: "B05" },
    { name: "Mike Ross", admission: "114320", semester: "8th", seat: "C09" },
    { name: "Rachel Green", admission: "114325", semester: "4th", seat: "A01" },
  ];

  useEffect(() => {
    axios.get("http://localhost:8000/api/result")
      .then((response) => {
        setRows(response.data);
      })
      .catch((err) => {
        console.log("API Error, using dummy data");
        setRows(dummyRows);
      });
  }, []);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell header">Student Name</TableCell>
            <TableCell className="tableCell header">ID / Admission</TableCell>
            <TableCell className="tableCell header">Semester</TableCell>
            <TableCell className="tableCell header">Seat No.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.admission || row.name} hover>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  {/* Placeholder for an Avatar if you add images later */}
                  <div className="avatar">{row.name.charAt(0)}</div>
                  {row.name}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.admission}</TableCell>
              <TableCell className="tableCell">{row.semester}</TableCell>
              <TableCell className="tableCell">
                <span className="status">{row.seat}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;