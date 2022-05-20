import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomCheckbox from './CustomCheckBox';

const TableRows = ({setQuestionStudent, questionStudent,
  setDisabled, objectQuestions, page, rowsPerPage, objectStudents, setObjectStudents}) => (
    <>
      {objectQuestions
        .slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        )
        .map((question) => (
          <TableRow key={question.id} hover>
            <TableCell component="th" scope="row">
              {question.position + 1}. {question.question}
            </TableCell>
            {objectStudents
              // .filter(({ data }) => data.questionId.equals(question.question))
              .map((student,) => (
                <TableCell align="right" key={student}>
                  <div style={{ color: 'black' }}>
                    {student.student} {question.question}
                  </div>
                  <CustomCheckbox
                    state={
                      questionStudent.length!==0
                        ? questionStudent.filter(
                            ({ data }) =>
                              data.questionId === question.question &&
                              data.studentId === student.student
                          )[0]?.data.state
                        : 'Empty'
                    }
                    studentId={student.student}
                    questionId={question.question}
                    objectStudents={objectStudents}
                    setObjectStudents={setObjectStudents}
                    questionStudent={questionStudent}
                    setQuestionStudent={setQuestionStudent}
                    setDisabled={setDisabled}
                  />
                </TableCell>
              ))}
          </TableRow>
        ))}
    </>
  );

TableRows.propTypes = {
  setQuestionStudent: PropTypes.func.isRequired,
  questionStudent: PropTypes.string.isRequired,
  setDisabled: PropTypes.func.isRequired,
  objectQuestions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    question: PropTypes.string,
    position: PropTypes.number,
  })).isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  objectStudents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    student: PropTypes.string,
  })).isRequired,
  setObjectStudents: PropTypes.func.isRequired,
};

export default TableRows;
