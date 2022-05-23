/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import { MUTATION_KEYS, useMutation } from '../../config/queryClient';
import {
  DEFAULT_CHECK,
  DEFAULT_CHECK_DATA,
  CHECKBOX_STATES,
} from '../../constants/constants';

const CustomCheckbox = ({ questionStudent, studentId, questionId }) => {
  const { mutate: patchAppData } = useMutation(MUTATION_KEYS.PATCH_APP_DATA);
  const { mutate: postAppData } = useMutation(MUTATION_KEYS.POST_APP_DATA);

  const [isChecked, setIsChecked] = useState(CHECKBOX_STATES.Empty);

  const getState = () =>
    questionStudent
      .filter(
        ({ data }) =>
          data.questionId === questionId && data.studentId === studentId,
      )
      .first()?.data.state ?? CHECKBOX_STATES.Empty;

  const [state, setState] = useState(getState());

  useEffect(() => {
    setState(getState());
  }, [questionStudent]);

  const updateObject = (arr, index, question, status) => {
    const checks = arr.filter(
      ({ data }) => data.studentId === index && data.questionId === question,
    );
    const currentCheck = checks.sortBy((c) => c.updatedAt).last();
    let newCheck;
    if (currentCheck) {
      newCheck = {
        ...currentCheck,
        data: {
          ...currentCheck.data,
          state: status,
        },
      };
    } else {
      newCheck = {
        ...DEFAULT_CHECK,
        data: {
          ...DEFAULT_CHECK_DATA,
          questionId,
          studentId,
          state: status,
        },
      };
    }

    if (newCheck?.id) {
      patchAppData(newCheck);
    } else {
      postAppData(newCheck);
    }
  };

  const handleChange = () => {
    let updatedChecked;

    switch (isChecked) {
      case CHECKBOX_STATES.Empty:
        updatedChecked = CHECKBOX_STATES.Positive;
        break;

      case CHECKBOX_STATES.Positive:
        updatedChecked = CHECKBOX_STATES.Negative;
        break;

      case CHECKBOX_STATES.Negative:
        updatedChecked = CHECKBOX_STATES.NonApplicable;
        break;

      case CHECKBOX_STATES.NonApplicable:
        updatedChecked = CHECKBOX_STATES.Empty;
        break;

      default:
        updatedChecked = isChecked;
    }

    updateObject(questionStudent, studentId, questionId, updatedChecked);
    setState(updatedChecked);

    setIsChecked(updatedChecked);
  };

  const conditionalRender = () => {
    if (state === CHECKBOX_STATES.Positive) {
      return (
        <Checkbox checked style={{ color: 'green' }} onClick={handleChange} />
      );
    }
    if (state === CHECKBOX_STATES.Negative) {
      return (
        <Checkbox checked style={{ color: 'red' }} onClick={handleChange} />
      );
    }
    if (state === CHECKBOX_STATES.Empty) {
      return <Checkbox checked={false} onClick={handleChange} />;
    }
    if (state === CHECKBOX_STATES.NonApplicable) {
      return (
        <Checkbox
          checked={false}
          indeterminate
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
  questionStudent: PropTypes.string.isRequired,
  studentId: PropTypes.string.isRequired,
  questionId: PropTypes.string.isRequired,
};

export default CustomCheckbox;
