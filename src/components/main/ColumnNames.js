import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import { useTranslation } from 'react-i18next';

const ColumnNames = ({ objectStudents }) => {
  const { t } = useTranslation();

  return (
    <>
      <TableCell
        align="left"
        style={{ color: 'white', backgroundColor: 'rgb(145,33,162)' }}
      >
        {t('Did the Team Member...')}
      </TableCell>
      {objectStudents.map((student) => (
        <TableCell
          align="right"
          style={{
            color: 'white',
            backgroundColor: 'rgb(145,33,162)',
          }}
          key={`${student.id}`}
        >
          {student.student}
        </TableCell>
      ))}
    </>
  );
};

ColumnNames.propTypes = {
  objectStudents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      student: PropTypes.string,
    }),
  ).isRequired,
};

export default ColumnNames;
