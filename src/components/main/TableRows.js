import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomCheckbox from './CustomCheckBox';



const TableRows=(props)=>{


    return(
        <>
        {props.objectQuestions
        .slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
        .map((row) => (
          <TableRow key={row.id} hover>
            <TableCell component="th" scope="row">
              {row.position+1}. {row.question}
            </TableCell>
            {props.objectStudents.map((student) => (
              <TableCell
                align="right"
              >
                <CustomCheckbox
                  studentId={student.student}
                  questionId={row.id}
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
    )





}




export default TableRows;