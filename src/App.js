// import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { Checkbox } from '@mui/material';

// const columns = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'firstName', headerName: 'First name', width: 130 },
//   { field: 'lastName', headerName: 'Last name', width: 130 },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 90,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
// ];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

// const App=()=> {
//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={10}
//         rowsPerPageOptions={[10]}
//         checkboxSelection
//       />
//     </div>
//   );
// }

// export default App;
import { useEffect, useState } from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@mui/material/TablePagination";
import Table from "@material-ui/core/Table";
import { Checkbox } from "@mui/material";
import Paper from "@material-ui/core/Paper";
import { v4 as uuidv4 } from "uuid";

const rows = [];
let objectQuestions = [];
const questions = [
  "Attend nearly all team meetings?",
  "Arrive on time for nearly all team meetings?",
  "Ever introduce a new idea?",
  "Ever openly express opinions?",
  "Communicate clearly with other team members?",
  "Share knowledge with others?",
  "Ever consider a suggestion from someone else?",
  "Ever adopt a suggestion from someone else?",
  "Generally tried to understand what other team members were saying?",
  "Ever help someone on the team?",
  "Ask for help from someone on the team?",
  "Generally complete individual assignments on time?",
  "Generally complete individual assignments with acceptable quality?",
  "Do a fair share of the work?",
  "Seem committed to team goals?",
  "Generally shows respect for other team members?",
  "Demonstrate an ability to do research and gather information?",
  "Shows an ability to distinguish between the important and the trivial?",
];
const students = ["Lynn", "Tamara", "John", "James", "Grace"];

const App = () => {
  const [color, setColor] = useState("white");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleClick = () => {
    if (color === "white") {
      setColor("blue");
    } else if (color === "blue") {
      setColor("green");
    } else if (color === "green") {
      setColor("white");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "20px" }}>
        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
          <Table aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell style={{ backgroundColor: "yellow" }} >
                  "Did the Team Member..."
                </TableCell>
                {students.map((student) => (
                  <TableCell align="right">{student}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {questions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={uuidv4()} hover>
                    <TableCell component="th" scope="row">
                      {row}
                    </TableCell>
                    {students.map((student) => (
                      <TableCell align="right">
                        <Checkbox />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={questions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default App;
