import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomCheckbox from './CustomCheckBox';

const TableRows = ({
  questionStudent,
  setDisabled,
  objectQuestions,
  page,
  rowsPerPage,
  objectStudents,
}) => (
  <>
    {objectQuestions
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((question) => (
        <TableRow key={question.id} hover>
          <TableCell component="th" scope="row">
            {question.position + 1}. {question.question}
          </TableCell>
          {objectStudents
            // .filter(({ data }) => data.questionId.equals(question.question))
            .map((student) => (
              <TableCell align="right" key={student.id}>
                {/* <div style={{ color: 'black' }}>
                    {question.question}
                  </div> */}
                <CustomCheckbox
                  studentId={student.id}
                  questionId={question.id}
                  questionStudent={questionStudent}
                  setDisabled={setDisabled}
                />
              </TableCell>
            ))}
        </TableRow>
      ))}
  </>
);

TableRows.propTypes = {
  questionStudent: PropTypes.string.isRequired,
  setDisabled: PropTypes.func.isRequired,
  objectQuestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      question: PropTypes.string,
      position: PropTypes.number,
    }),
  ).isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  objectStudents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      student: PropTypes.string,
    }),
  ).isRequired,
};

export default TableRows;
