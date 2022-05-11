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

  // props.stdObjects.forEach((obj)=>console.log(obj.content._store.valueOf()))

  const [isChecked, setIsChecked] = useState(CHECKBOX_STATES.Empty);
  const handleChange = (event) => {
    console.log(event.target.checked)
    let updatedChecked;

    switch (isChecked) {
      case CHECKBOX_STATES.Positive:
        updatedChecked = CHECKBOX_STATES.Negative;
        setPositive(false);
        setNegative(true);
        break;
      case CHECKBOX_STATES.Empty:
        updatedChecked = CHECKBOX_STATES.Positive;
        setEmpty(false);
        setPositive(true);
        break;
      case CHECKBOX_STATES.NonApplicable:
        updatedChecked = CHECKBOX_STATES.Empty;
        setNonApplicable(false);
        setEmpty(true);
        break;
      case CHECKBOX_STATES.Negative:
        updatedChecked = CHECKBOX_STATES.NonApplicable;
        setNegative(false);
        setNonApplicable(true);
        break;
      default:
        updatedChecked = isChecked;
    }

    setIsChecked(updatedChecked);
  };

  const conditionalRender = () => {
    if (isChecked === CHECKBOX_STATES.Positive) {
      return (
        <Checkbox
          checked={positive ? positive : " "}
          style={{ color: "green" }}
          onClick={handleChange}
        />
      );
    }
    if (isChecked === CHECKBOX_STATES.Negative) {
      return (
        <Checkbox
          checked={negative ? negative : " "}
          style={{ color: "red" }}
          onClick={handleChange}
        />
      );
    }
    if (isChecked === CHECKBOX_STATES.Empty) {
      return <Checkbox checked={empty ? false:' '} onClick={handleChange} />;
    }
    if (isChecked === CHECKBOX_STATES.NonApplicable) {
      return (
        <Checkbox
          checked={nonApplicable ? nonApplicable : " "}
          style={{ color: "orange" }}
          onClick={handleChange}
        />
      );
    }
  };
  return <>{conditionalRender()}</>;
};

export default CustomCheckbox;
