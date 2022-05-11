import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { v4 as uuidv4 } from "uuid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Header from "./Header";
import CustomCheckbox from "./CustomCheckBox";

function createData(id, question) {
  let obj = { id, question };

  stdObjects.forEach((student) => (obj[student.name] = student.content));
  // return { id, question, student};
  return obj;
}

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

const columns = [
  { id: "question", label: "Did the Team Member...", minWidth: 170 },
];

const rows = [];

const stdObjects = [];



students.forEach((student) =>
  stdObjects.push({
    name: student,
    content: <CustomCheckbox id={student} stdObjects={stdObjects}/>,
  })
);

stdObjects.forEach((student) =>
  columns.push({ id: student.name, label: student.name, minWidth: 100 })
);
questions.forEach((question, index) =>
  rows.push(createData(uuidv4(), index + 1 + ". " + question, stdObjects))
);

let count=0;
const App=()=> {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

count++
console.log(count)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={{ padding: "20px 20px 20px 20px" }}>
      <Header />
      <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "20px" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      // backgroundColor: "rgb(153, 153, 255)",
                      backgroundColor: "rgb(145, 33, 163)",
                      color: "white",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "string"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="filled-basic"
          label="Comments"
          variant="filled"
          multiline
          color="secondary"
          style={{ marginTop: "20px", width: "100%" }}
        />
        <Button disabled color="secondary" variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default App;
// import React from "react";
// import Checkbox from "@mui/material/Checkbox";
// const CHECKBOX_STATES = {
//   Checked: "Checked",
//   Indeterminate: "Indeterminate",
//   Negative: "Negative",
//   Empty: "Empty",
// };

// const App = () => {
//   const [checked, setChecked] = React.useState(CHECKBOX_STATES.Empty);

//   const handleChange = () => {
//     let updatedChecked;

//     if (checked === CHECKBOX_STATES.Checked) {
//       updatedChecked = CHECKBOX_STATES.Empty;
//     } else if (checked === CHECKBOX_STATES.Empty) {
//       updatedChecked = CHECKBOX_STATES.Indeterminate;
//     } else if (checked === CHECKBOX_STATES.Indeterminate) {
//       updatedChecked = CHECKBOX_STATES.Negative;
//     } else if (checked === CHECKBOX_STATES.Negative) {
//       updatedChecked = CHECKBOX_STATES.Checked;
//     }

//     setChecked(updatedChecked);
//   };

//   return (
//     <div>
//       <CustomCheckbox label="Value" value={checked} onChange={handleChange} />

//       <p>Is checked? {checked}</p>
//     </div>
//   );
// };

// const CustomCheckbox = ({ label, value, onChange }) => {
//   const checkboxRef = React.useRef(null);

//   React.useEffect(() => {
//     if (value === CHECKBOX_STATES.Checked) {
//       checkboxRef.current.checked = true;
//       checkboxRef.current.indeterminate = false;
//       checkboxRef.current.className = 'black-in';

//     } else if (value === CHECKBOX_STATES.Empty) {
//       checkboxRef.current.checked = false;
//       checkboxRef.current.indeterminate = false;

//     } else if (value === CHECKBOX_STATES.Indeterminate) {
//       checkboxRef.current.checked = false;
//       checkboxRef.current.indeterminate = true;

//     } else if (value === CHECKBOX_STATES.Negative) {
//       checkboxRef.current.checked = false;
//       checkboxRef.current.indeterminate = false;

//     }
//   }, [value]);

//   console.log(checkboxRef.current)
//   return (
//     <label>
//       <input ref={checkboxRef} type="checkbox" onChange={onChange} />
//       {label}
//     </label>
//   //  <Checkbox ref={checkboxRef} type="checkbox" onChange={onChange} />
//   );
// };

// export default App;
