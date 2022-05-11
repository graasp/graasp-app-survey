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

  const [isChecked, setIsChecked] = useState(CHECKBOX_STATES.Empty);
  const handleChange = () => {
    let updatedChecked;

    switch (isChecked) {
      case CHECKBOX_STATES.Positive:
        updatedChecked = CHECKBOX_STATES.Negative;
        setPositive(false);
        setNegative(true);
        break;
      case CHECKBOX_STATES.Empty:
        updatedChecked = CHECKBOX_STATES.Positive;
        setPositive(true);
        break;
      case CHECKBOX_STATES.NonApplicable:
        updatedChecked = CHECKBOX_STATES.Empty;
        setNonApplicable(false);
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
      return <Checkbox checked={false} onClick={handleChange} />;
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
  console.log(isChecked);
  return <>{conditionalRender()}</>;
};

export default CustomCheckbox;
