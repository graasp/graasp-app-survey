import { useState, useEffect } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@mui/material/TablePagination';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import { v4 as uuidv4 } from 'uuid';
import CustomCheckbox from './main/CustomCheckBox';
import Header from './main/Header';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useAppContext } from './context/appData';

const questions = [
  'Attend nearly all team meetings?',
  'Arrive on time for nearly all team meetings?',
  'Ever introduce a new idea?',
  'Ever openly express opinions?',
  'Communicate clearly with other team members?',
  'Share knowledge with others?',
  'Ever consider a suggestion from someone else?',
  'Ever adopt a suggestion from someone else?',
  'Generally tried to understand what other team members were saying?',
  'Ever help someone on the team?',
  'Ask for help from someone on the team?',
  'Generally complete individual assignments on time?',
  'Generally complete individual assignments with acceptable quality?',
  'Do a fair share of the work?',
  'Seem committed to team goals?',
  'Generally shows respect for other team members?',
  'Demonstrate an ability to do research and gather information?',
  'Shows an ability to distinguish between the important and the trivial?',
];
// const students = ["Lynn", "Tamara", "John", "James", "Grace"];

const App = () => {
  const [students, setStudents] = useState([]);
  const [objectStudents, setObjectStudents] = useState([]);
  const [comment, setComment]=useState(' ');

  const { data: appContext, isSuccess: isAppContextSuccess } = useAppContext();

  useEffect(() => {
    if (isAppContextSuccess) {
      // setStudents(appContext?.get('members').map((std) => std.name));
      setObjectStudents(appContext?.get('members').map((std) => std.name).map((student) => ({ id: uuidv4(), student })));
    }
  }, [appContext, isAppContextSuccess]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [objectQuestions, setObjectQuestions] = useState(
    questions.map((question) => ({ id: uuidv4(), question })),
  );

  const generateQuestionStudents = (stdArr, questArr) => {
    const arr = [];
    for (let quest of questArr) {
      for (let std of stdArr) {
        arr.push({
          studentId: std.student,
          questionId: quest.id,
          state: 'Empty',
        });
      }
    }
    return arr;
  };

  const [questionStudent, setQuestionStudent] = useState(
    generateQuestionStudents(objectStudents, objectQuestions),
  );

  const disableButton = () => {
    if (questionStudent.filter((e) => e.state === 'Empty').length > 0) {
      console.log(questionStudent.filter((e) => e.state === 'Empty').length);
      return true;
    }
    return false;
  };
  console.log(comment)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={{ padding: '50px 20px 20px 20px' }}>
      <Header />
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
          <Table aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ backgroundColor: 'violet' }}>
                  "Did the Team Member..."
                </TableCell>
                {objectStudents.map((student) => (
                  <TableCell
                    align="right"
                    style={{ backgroundColor: 'violet' }}
                  >
                    {student.student}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {objectQuestions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell component="th" scope="row">
                      {row.question}
                    </TableCell>
                    {objectStudents.map((student) => (
                      <TableCell align="right" style={{wordBreak:'break-all'}}>
                        <CustomCheckbox
                          studentId={student.student}
                          questionId={row.id}
                          objectStudents={objectStudents}
                          setObjectStudents={setObjectStudents}
                          questionStudent={questionStudent}
                          setQuestionStudent={setQuestionStudent}
                        />
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
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch', marginLeft: '0' },
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
          style={{ marginTop: '20px', width: '100%' }}
          onChange={(e)=>setComment(e.target.value)}
        />
        <Button
          disabled={disableButton()}
          color="secondary"
          variant="contained"
          // type="submit"
          onClick={()=>setComment(comment)}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default App;
