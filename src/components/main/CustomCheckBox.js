import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import { MUTATION_KEYS, useMutation } from '../../config/queryClient';

const CHECKBOX_STATES = {
  Positive: 'Positive',
  NonApplicable: 'NonApplicable',
  Negative: 'Negative',
  Empty: 'Empty',
};

const CustomCheckbox = ({setQuestionStudent, questionStudent,
  studentId,
  questionId,
  setDisabled, state}) => {
  const { mutate: patchAppData } = useMutation(MUTATION_KEYS.PATCH_APP_DATA);

  const [positive, setPositive] = useState(false);
  const [nonApplicable, setNonApplicable] = useState(false);
  const [negative, setNegative] = useState(false);
  const [empty, setEmpty] = useState(true);
  const [isChecked, setIsChecked] = useState(CHECKBOX_STATES.Empty);

  const updateObject = (arr, index, question, status) => {
    const newArray = arr.map((obj) => {
      if (obj.data.studentId === index && obj.data.questionId === question) {
        const newObject = { ...obj, data: { ...obj.data, state: status } };
        patchAppData(newObject);

        return newObject;
      }
      return obj;
    });
    return newArray;
  };

  const handleChange = () => {
    let updatedChecked;

    switch (isChecked) {
      case CHECKBOX_STATES.Empty:
        updatedChecked = CHECKBOX_STATES.Positive;
        setEmpty(false);
        setPositive(true);
        setQuestionStudent(
          updateObject(
            questionStudent,
            studentId,
            questionId,
            CHECKBOX_STATES.Positive,
          ),
        );
        break;

      case CHECKBOX_STATES.Positive:
        updatedChecked = CHECKBOX_STATES.Negative;
        setPositive(false);
        setNegative(true);
        setQuestionStudent(
          updateObject(
            questionStudent,
            studentId,
            questionId,
            CHECKBOX_STATES.Negative,
          ),
        );
        break;

      case CHECKBOX_STATES.Negative:
        updatedChecked = CHECKBOX_STATES.NonApplicable;
        setNegative(false);
        setNonApplicable(true);
        setQuestionStudent(
          updateObject(
            questionStudent,
            studentId,
            questionId,
            CHECKBOX_STATES.NonApplicable,
          ),
        );
        break;

      case CHECKBOX_STATES.NonApplicable:
        updatedChecked = CHECKBOX_STATES.Empty;
        setNonApplicable(false);
        setEmpty(true);
        setQuestionStudent(
          updateObject(
            questionStudent,
            studentId,
            questionId,
            CHECKBOX_STATES.Empty,
          ),
        );
        break;

      default:
        updatedChecked = isChecked;
    }

    setIsChecked(updatedChecked);

    if (
      questionStudent.filter((e) => e.data.state === 'Empty').length > 0
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    // props.setQuestionStudent(
    //   updateObject(
    //     props.questionStudent,
    //     props.studentId,
    //     props.questionId,
    //     updatedChecked,
    //   ),
    // );
    // props.setObjectStudents(
    //   updateObject(props.objectStudents, props.index, updatedChecked)
    // );
  };

  const conditionalRender = () => {
    if (state === CHECKBOX_STATES.Positive) {
      return (
        <Checkbox
          checked={positive ? true : ' '}
          style={{ color: 'green' }}
          onClick={handleChange}
        />
      );
    }
    if (state === CHECKBOX_STATES.Negative) {
      return (
        <Checkbox
          checked={negative ? true : ' '}
          style={{ color: 'red' }}
          onClick={handleChange}
        />
      );
    }
    if (state === CHECKBOX_STATES.Empty) {
      return <Checkbox checked={empty ? false : ' '} onClick={handleChange} />;
    }
    if (state === CHECKBOX_STATES.NonApplicable) {
      return (
        <Checkbox
          checked={nonApplicable ? true : ' '}
          style={{ color: 'orange' }}
          onClick={handleChange}
        />
      );
    }
    return null;
  };
  return <>{conditionalRender()}</>;
};

CustomCheckbox.propTypes = {
  setQuestionStudent: PropTypes.func.isRequired,
  questionStudent: PropTypes.string.isRequired,
  studentId: PropTypes.string.isRequired,
  questionId: PropTypes.string.isRequired,
  setDisabled: PropTypes.func.isRequired,
  state: PropTypes.string.isRequired,
};

export default CustomCheckbox;
