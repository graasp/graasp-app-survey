import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomCheckbox from './CustomCheckBox';

const TableRows = (props) => {
  console.log('hiiiii',props.questionStudent)
  return (
    <>
      {props.objectQuestions
        .slice(
          props.page * props.rowsPerPage,
          props.page * props.rowsPerPage + props.rowsPerPage,
        )
        .map((question) => (
          <TableRow key={question.id} hover>
            <TableCell component="th" scope="row">
              {question.position + 1}. {question.question}
            </TableCell>
            {props.questionStudent
              .filter(({ data }) => data.questionId === question.question)
              .map((student, index) => (
                <TableCell align="right" key={index}>
                <div style={{color:'black'}}>{student.data.studentId}{question.question}</div>
                  <CustomCheckbox
                    state={student.data.state}
                    studentId={student.data.studentId}
                    questionId={question.question}
                    objectStudents={props.objectStudents}
                    setObjectStudents={props.setObjectStudents}
                    questionStudent={props.questionStudent}
                    setQuestionStudent={props.setQuestionStudent}
                  />
                </TableCell>
              ))}
          </TableRow>
        ))}
    </>
  );
};

export default TableRows;
