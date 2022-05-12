import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";

const CHECKBOX_STATES = {
  Positive: "Positive",
  NonApplicable: "NonApplicable",
  Negative: "Negative",
  Empty: "Empty",
};

const CustomCheckbox = (props) => {
  const [positive, setPositive] = useState(false);
  const [nonApplicable, setNonApplicable] = useState(false);
  const [negative, setNegative] = useState(false);
  const [empty, setEmpty] = useState(true);
  const [isChecked, setIsChecked] = useState(CHECKBOX_STATES.Empty);

  // props.stdObjects.forEach((obj)=>console.log(obj.content._store.valueOf()))

  const updateObject = (arr, index, status) => {
    const newArray = arr.map((obj) => {
      if (obj.id === index) {
        return { ...obj, state: status };
      }

      return obj;
    });

    console.log(newArray);
    return newArray;
  };

  const handleChange = (e) => {
    let updatedChecked;

    switch (isChecked) {
      case CHECKBOX_STATES.Empty:
        updatedChecked = CHECKBOX_STATES.Positive;
        setEmpty(false);
        setPositive(true);
        props.setObjectStudents(
          updateObject(
            props.objectStudents,
            props.index,
            CHECKBOX_STATES.Positive
          )
        );
        break;

      case CHECKBOX_STATES.Positive:
        updatedChecked = CHECKBOX_STATES.Negative;
        setPositive(false);
        setNegative(true);
        props.setObjectStudents(
          updateObject(
            props.objectStudents,
            props.index,
            CHECKBOX_STATES.Negative
          )
        );

        break;

      case CHECKBOX_STATES.Negative:
        updatedChecked = CHECKBOX_STATES.NonApplicable;
        setNegative(false);
        setNonApplicable(true);
        props.setObjectStudents(
          updateObject(
            props.objectStudents,
            props.index,
            CHECKBOX_STATES.NonApplicable
          )
        );

        break;

      case CHECKBOX_STATES.NonApplicable:
        updatedChecked = CHECKBOX_STATES.Empty;
        setNonApplicable(false);
        setEmpty(true);
        props.setObjectStudents(
          updateObject(props.objectStudents, props.index, CHECKBOX_STATES.Empty)
        );

        break;

      default:
        updatedChecked = isChecked;
    }

    setIsChecked(updatedChecked);
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
