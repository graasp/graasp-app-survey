import React, { useState, useEffect } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@mui/material/TablePagination';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import { useAppContext, useAppData } from '../context/appData';
import { APP_DATA_TYPES } from '../../config/appDataTypes';
import TableRows from './TableRows';
import ColumnNames from './ColumnNames';
import CommentSection from './CommentSection';
import { CHECKBOX_STATES } from '../../constants/constants';
import questions from '../../config/questions';
import { FILTERED_IDS } from '../../config/settings';
import DownloadData from '../common/DownloadData';
import Header from './Header';

const QuestionsView = () => {
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
  const [questionStudent, setQuestionStudent] = useState(null);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (isAppContextSuccess) {
      const members = appContext
        ?.get('members')
        .filter((m) => !FILTERED_IDS.includes(m.id))
        .map((student) => ({ id: student.id, student: student.name }));
      setObjectStudents(members);
    }
  }, [appContext, isAppContextSuccess]);

  // const nbrCheckBoxes = objectQuestions.length * objectStudents.length;

  const {
    data: appData,
    isSuccess: isAppDataSuccess,
    isLoading: isAppDataLoading,
  } = useAppData();

  const areAllQuestionsAnswered = (checks) => {
    let returnVal = true;
    if (
      checks.filter((e) => e.data.state === CHECKBOX_STATES.Empty).isEmpty() &&
      !checks.isEmpty()
    ) {
      objectQuestions.forEach(({ id: qId }) => {
        objectStudents.forEach(({ id: sId }) => {
          if (
            checks
              .filter(
                ({ data }) => data.studentId === sId && data.questionId === qId,
              )
              .isEmpty()
          ) {
            returnVal = false;
          }
        });
      });
      return returnVal;
    }
    return false;
  };

  useEffect(() => {
    if (isAppDataSuccess && !isAppDataLoading) {
      const newChecks = appData.filter(
        ({ type }) => type === APP_DATA_TYPES.CHECK,
      );
      setQuestionStudent(newChecks);
      setDisabled(!areAllQuestionsAnswered(newChecks));
      setSubmitted(
        !appData
          .filter(({ type }) => type === APP_DATA_TYPES.SUBMIT_CONFIRM)
          .isEmpty(),
      );
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
            <DownloadData />
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

export default QuestionsView;
