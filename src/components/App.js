import React, { useState, useEffect } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@mui/material/TablePagination';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import Header from './main/Header';
import { useAppContext, useAppData } from './context/appData';
import { APP_DATA_TYPES } from '../config/appDataTypes';
import TableRows from './main/TableRows';
import ColumnNames from './main/ColumnNames';
import CommentSection from './main/CommentSection';
// import generateQuestionStudents from '../utils/generateQuestionsStudents';
import DownloadReport from './main/DownloadReport';
import { CHECKBOX_STATES } from '../constants/constants';
import questions from '../config/questions';
import { FILTERED_IDS } from '../config/settings';

const App = () => {
  const [submitted, setSubmitted] = useState(false);
  const { data: appContext, isSuccess: isAppContextSuccess } = useAppContext();

  const [objectQuestions] = useState(
    questions.map((question, index) => ({
      id: question,
      question,
      position: index,
    })),
  );
  const [objectStudents, setObjectStudents] = useState([]);
  const [questionStudent, setQuestionStudent] = useState([]);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (isAppContextSuccess) {
      const members = appContext
        ?.get('members').filter((m) => !FILTERED_IDS.includes(m.id))
        .map((student) => ({ id: student.id, student: student.name }));
      setObjectStudents(members);
    }
  }, [appContext, isAppContextSuccess]);

  const {
    data: appData,
    isSuccess: isAppDataSuccess,
    isLoading: isAppDataLoading,
  } = useAppData();

  useEffect(() => {
    if (isAppDataSuccess && !isAppDataLoading) {
      const newChecks = appData.filter(
        ({ type }) => type === APP_DATA_TYPES.CHECK,
      );
      console.log(newChecks);
      setQuestionStudent(newChecks);
      if (
        newChecks
          .filter((e) => e.data.state === CHECKBOX_STATES.Empty)
          .isEmpty() &&
        !newChecks.isEmpty()
      ) {
        setDisabled(true);
      } else {
        setDisabled(false);
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
      {submitted ? (
        <div className="middle">
          <h1>Thank you!</h1>
          <div>
            <DownloadReport />
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default App;
