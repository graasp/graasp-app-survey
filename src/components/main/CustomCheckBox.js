import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { MUTATION_KEYS, useMutation } from '../../config/queryClient';
 
const CHECKBOX_STATES = {
  Positive: 'Positive',
  NonApplicable: 'NonApplicable',
  Negative: 'Negative',
  Empty: 'Empty',
};

const CustomCheckbox = (props) => {
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
    console.log('new array',newArray)
    return newArray;
  };
  const disableButton = () => {
    if (
      props.questionStudent.filter((e) => e.data.state === 'Empty').length > 0
    ) {
      return true;
    }
    return false;
  };

  const handleChange = (e) => {
    let updatedChecked;

    switch (isChecked) {
      case CHECKBOX_STATES.Empty:
        updatedChecked = CHECKBOX_STATES.Positive;
        setEmpty(false);
        setPositive(true);
        props.setQuestionStudent(
          updateObject(
            props.questionStudent,
            props.studentId,
            props.questionId,
            CHECKBOX_STATES.Positive,
          ),
        );
        break;

      case CHECKBOX_STATES.Positive:
        updatedChecked = CHECKBOX_STATES.Negative;
        setPositive(false);
        setNegative(true);
        props.setQuestionStudent(
          updateObject(
            props.questionStudent,
            props.studentId,
            props.questionId,
            CHECKBOX_STATES.Negative,
          ),
        );
        break;

      case CHECKBOX_STATES.Negative:
        updatedChecked = CHECKBOX_STATES.NonApplicable;
        setNegative(false);
        setNonApplicable(true);
        props.setQuestionStudent(
          updateObject(
            props.questionStudent,
            props.studentId,
            props.questionId,
            CHECKBOX_STATES.NonApplicable,
          ),
        );
        break;

      case CHECKBOX_STATES.NonApplicable:
        updatedChecked = CHECKBOX_STATES.Empty;
        setNonApplicable(false);
        setEmpty(true);
        props.setQuestionStudent(
          updateObject(
            props.questionStudent,
            props.studentId,
            props.questionId,
            CHECKBOX_STATES.Empty,
          ),
        );
        break;

      default:
        updatedChecked = isChecked;
    }

    setIsChecked(updatedChecked);
    props.setDisabled(disableButton)

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

    if (props.state === CHECKBOX_STATES.Positive) {
      return (
        <Checkbox
          checked={positive ? true : ' '}
          style={{ color: 'green' }}
          onClick={handleChange}
        />
      );
    }
    if (props.state === CHECKBOX_STATES.Negative) {
      return (
        <Checkbox
          checked={negative ? true : ' '}
          style={{ color: 'red' }}
          onClick={handleChange}
        />
      );
    }
    if (props.state === CHECKBOX_STATES.Empty) {
      return <Checkbox checked={empty ? false : ' '} onClick={handleChange} />;
    }
    if (props.state === CHECKBOX_STATES.NonApplicable) {
      return (
        <Checkbox
          checked={nonApplicable ? true : ' '}
          style={{ color: 'orange' }}
          onClick={handleChange}
        />
      );
    }
  };
  return <>{conditionalRender()}</>;
};

export default CustomCheckbox;
