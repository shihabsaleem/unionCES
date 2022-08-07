import React from "react";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const row = [
    {
      id: 001,
      name: "John Doe",
      seat: "Chair",
      sem: 7,
      votes: 100,
    },
    {
      id: 002,
      name: "Jon Doe",
      seat: "Chair",
      sem: 7,
      votes: 90,
    },
    {
      id: 003,
      name: "Jon Deo",
      seat: "Chair",
      sem: 7,
      votes: 120,
    },
    {
      id: 004,
      name: "Hon Doe",
      seat: "Vice Chair",
      sem: 7,
      votes: 110,
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Poll Result</TableCell>
            <TableCell align="right">id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Semester</TableCell>
            <TableCell align="right">Seat</TableCell>
            <TableCell align="right">Votes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell className="tablecell" align="right">
                {row.id}
              </TableCell>
              <TableCell className="tablecell" align="right">
                {row.name}
              </TableCell>
              <TableCell className="tablecell" align="right">
                {row.sem}
              </TableCell>
              <TableCell className="tablecell" align="right">
                {row.seat}
              </TableCell>
              <TableCell className="tablecell" align="right">
                {row.votes}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
