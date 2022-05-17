import { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { MUTATION_KEYS, useMutation } from '../../config/queryClient';
import { useAppContext } from '../context/appData';
import { ACTION_TYPES } from '../../config/actionTypes';
import { APP_DATA_TYPES } from '../../config/appDataTypes';
import { DEFAULT_CHECK } from '../../constants/constants';

const CHECKBOX_STATES = {
  Positive: 'Positive',
  NonApplicable: 'NonApplicable',
  Negative: 'Negative',
  Empty: 'Empty',
};

const CustomCheckbox = (props) => {
  const { mutate: postAppData } = useMutation(MUTATION_KEYS.POST_APP_DATA);
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);
  const { mutate: patchAppData } = useMutation(MUTATION_KEYS.PATCH_APP_DATA);

  const { data: appContext, isSuccess: isAppContextSuccess } = useAppContext();

  const [positive, setPositive] = useState(false);
  const [nonApplicable, setNonApplicable] = useState(false);
  const [negative, setNegative] = useState(false);
  const [empty, setEmpty] = useState(true);
  const [isChecked, setIsChecked] = useState(CHECKBOX_STATES.Empty);


  // props.stdObjects.forEach((obj)=>console.log(obj.content._store.valueOf()))

  // useEffect(() => {
  //   if (props.questionStudent.length !== 0) {
  //     console.log(props.questionStudent);
  //   }
  // });
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

  const handleChange = (e) => {
    let updatedChecked;

    switch (isChecked) {
      case CHECKBOX_STATES.Empty:
        updatedChecked = CHECKBOX_STATES.Positive;
        setEmpty(false);
        setPositive(true);
        break;

      case CHECKBOX_STATES.Positive:
        updatedChecked = CHECKBOX_STATES.Negative;
        setPositive(false);
        setNegative(true);
        break;

      case CHECKBOX_STATES.Negative:
        updatedChecked = CHECKBOX_STATES.NonApplicable;
        setNegative(false);
        setNonApplicable(true);
        break;

      case CHECKBOX_STATES.NonApplicable:
        updatedChecked = CHECKBOX_STATES.Empty;
        setNonApplicable(false);
        setEmpty(true);
        break;

      default:
        updatedChecked = isChecked;
    }

    setIsChecked(updatedChecked);

    props.setQuestionStudent(
      updateObject(
        props.questionStudent,
        props.studentId,
        props.questionId,
        updatedChecked,
      ),
    );
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
          onClick={() => handleChange()}
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
