import { useState, useEffect } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@mui/material/TablePagination';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import { v4 as uuidv4 } from 'uuid';
import Header from './main/Header';
import { useAppContext } from './context/appData';
import { APP_DATA_TYPES } from '../config/appDataTypes';
import { MUTATION_KEYS, useMutation } from '../config/queryClient';
import { useAppData } from './context/appData';
import TableRows from './main/TableRows';
import ColumnNames from './main/ColumnNames';
import CommentSection from './main/CommentSection';
import { DEFAULT_CHECK, DEFAULT_CHECK_DATA } from '../constants/constants';

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

const App = () => {
  const [submitted, setSubmitted] = useState(false);
  const generateQuestionStudents = (stdArr, questArr) => {
    const arr = [];
    for (let quest of questArr) {
      for (let std of stdArr) {
        const newObject = {
          ...DEFAULT_CHECK,
          id: uuidv4(),
          data: {
            ...DEFAULT_CHECK_DATA,
            studentId: std.student,
            questionId: quest.question,
          },
        };
        console.log(newObject)

        postAppData(newObject);
        arr.push(newObject);
      }
    }
    return arr;
  };
  const { data: appContext, isSuccess: isAppContextSuccess } = useAppContext();
  const { mutate: postAppData } = useMutation(MUTATION_KEYS.POST_APP_DATA);

  const [objectQuestions, setObjectQuestions] = useState(
    questions.map((question, index) => ({
      id: uuidv4(),
      question,
      position: index,
    })),
  );
  const [objectStudents, setObjectStudents] = useState([]);
  const [questionStudent, setQuestionStudent] = useState([]);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (isAppContextSuccess) {

      // Generate an array of students where each student is an object having an id and a name
      setObjectStudents(
        appContext
          ?.get('members')
          .map((std) => std.name)
          .map((student) => ({ id: uuidv4(), student })),
      );
    }
  }, [appContext, isAppContextSuccess]);

  const {
    data: appData,
    isSuccess: isAppDataSuccess,
    // isStale: isAppDataStale,
    isLoading: isAppDataLoading,
  } = useAppData();

  useEffect(() => {
    if (isAppDataSuccess && !isAppDataLoading) {
      const newChecks = appData.filter(
        ({ type }) => type === APP_DATA_TYPES.CHECK,
      );

      if (newChecks._tail) {
          setQuestionStudent(newChecks._tail.array);
          console.log(questionStudent)
      }
      else {
        console.log('Hey there')
        // Generate array of checkboxes where each checkbox has an object having a studentId, questionId and state (and type and visibility)
        setQuestionStudent(
          generateQuestionStudents(objectStudents, objectQuestions),
        );
      }
    }
  }, [appData, isAppDataSuccess, isAppDataLoading]);


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={{ padding: '50px 20px 20px 20px' }}>
      {!submitted ? (
        <>
          <Header />
          <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
              <Table aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <ColumnNames objectStudents={objectStudents} />
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRows
                    objectQuestions={objectQuestions}
                    objectStudents={objectStudents}
                    setObjectStudents={setObjectStudents}
                    questionStudent={questionStudent}
                    setQuestionStudent={setQuestionStudent}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    setDisabled={setDisabled}
                  />
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
          <CommentSection
            questionStudent={questionStudent}
            setSubmitted={setSubmitted}
            disabled={disabled}
          />
        </>
      ) : (
        <div>thank you</div>
      )}
    </div>
  );
};

export default App;
