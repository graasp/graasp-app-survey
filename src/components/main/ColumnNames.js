import TableCell from '@material-ui/core/TableCell';




const ColumnNames=(props)=>{

return(<>
    <TableCell
      align="left"
      style={{ color: 'white', backgroundColor: 'rgb(145,33,162)' }}
    >
      "Did the Team Member..."
    </TableCell>
    {props.objectStudents.map((student,index) => (
      <TableCell
        align="right"
        style={{
          color: 'white',
          backgroundColor: 'rgb(145,33,162)',
        }}
        key={index}
      >
        {student.student}
      </TableCell>
    ))}
  </>)



}


export default ColumnNames