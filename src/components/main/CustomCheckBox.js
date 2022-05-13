import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { MUTATION_KEYS, useMutation } from '../../config/queryClient';
import { useAppContext } from '../context/appData';
import { ACTION_TYPES } from '../../config/actionTypes';


const CHECKBOX_STATES = {
  Positive: "Positive",
  NonApplicable: "NonApplicable",
  Negative: "Negative",
  Empty: "Empty",
};

const CustomCheckbox = (props) => {

  const { mutate: postAppData } = useMutation(MUTATION_KEYS.POST_APP_DATA);
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);


  const { data: appContext, isSuccess: isAppContextSuccess } = useAppContext();

  useEffect(() => {
    if (isAppContextSuccess) {
      setQuestionStudent(props.questionStudent);

    }
  }, [appContext, isAppContextSuccess]);
  const [positive, setPositive] = useState(false);
  const [nonApplicable, setNonApplicable] = useState(false);
  const [negative, setNegative] = useState(false);
  const [empty, setEmpty] = useState(true);
  const [isChecked, setIsChecked] = useState(CHECKBOX_STATES.Empty);
  const [questionStudent, setQuestionStudent] = useState([
    props.questionStudent,
  ]);

  useEffect(() => {
    setQuestionStudent(props.questionStudent);
  },[]);



  // props.stdObjects.forEach((obj)=>console.log(obj.content._store.valueOf()))

  const updateObject = (arr, index, question, status) => {
    const newArray = arr.map((obj) => {
      if (obj.studentId === index && obj.questionId === question) {
        return { ...obj, state: status };
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
        updatedChecked
      )
    );
    postAppData(questionStudent)
    postAction({
      type: ACTION_TYPES.CHECK,
      data: {
        questionStudent
      },
    });

    // props.setObjectStudents(
    //   updateObject(props.objectStudents, props.index, updatedChecked)
    // );
  };

  const conditionalRender = () => {
    if (isChecked === CHECKBOX_STATES.Positive) {
      return (
        <Checkbox
          checked={positive ? true : " "}
          style={{ color: "green" }}
          onClick={handleChange}
        />
      );
    }
    if (isChecked === CHECKBOX_STATES.Negative) {
      return (
        <Checkbox
          checked={negative ? true : " "}
          style={{ color: "red" }}
          onClick={handleChange}
        />
      );
    }
    if (isChecked === CHECKBOX_STATES.Empty) {
      return <Checkbox checked={empty ? false : " "} onClick={handleChange} />;
    }
    if (isChecked === CHECKBOX_STATES.NonApplicable) {
      return (
        <Checkbox
          checked={nonApplicable ? true : " "}
          style={{ color: "orange" }}
          onClick={handleChange}
        />
      );
    }
  };
  return <>{conditionalRender()}</>;
};

export default CustomCheckbox;
