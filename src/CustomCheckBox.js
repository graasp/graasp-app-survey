import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";

const CHECKBOX_STATES = {
  Positive: "Positive",
  NonApplicable: "NonApplicable",
  Negative: "Negative",
  Empty: "Empty",
};
let count=0
const CustomCheckbox = (props) => {
  //   const [positive, setPositive] = useState(false);
  //   const [nonApplicable, setNonApplicable] = useState(false);
  //   const [negative, setNegative] = useState(false);
  //   const [empty, setEmpty] = useState(true);

  const [isChecked, setIsChecked] = useState(CHECKBOX_STATES.Empty);
  const handleChange = () => {
    let updatedChecked;

    switch (isChecked) {
      case CHECKBOX_STATES.Positive:
        updatedChecked = CHECKBOX_STATES.Negative;
        break;
      case CHECKBOX_STATES.Empty:
        updatedChecked = CHECKBOX_STATES.Positive;
        break;
      case CHECKBOX_STATES.NonApplicable:
        updatedChecked = CHECKBOX_STATES.Empty;
        break;
      case CHECKBOX_STATES.Negative:
        updatedChecked = CHECKBOX_STATES.NonApplicable;
        break;
      default:
        updatedChecked = isChecked;
    }

    setIsChecked(updatedChecked);
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const conditionalRender = () => {
    switch (isChecked) {
      case CHECKBOX_STATES.Positive:
        return <Checkbox {...label} color="secondary" onClick={handleChange} />;
      case CHECKBOX_STATES.Empty:
        return <Checkbox {...label} onClick={handleChange} />;
      case CHECKBOX_STATES.NonApplicable:
        return <Checkbox {...label} color="primary" onClick={handleChange} />;
      case CHECKBOX_STATES.Negative:
        return <Checkbox {...label} color="success" onClick={handleChange} />;
      default:
        return <Checkbox {...label} color="default" onClick={handleChange} />;
    }
  };
  count++
  console.log(count,isChecked)
  return <>{conditionalRender()}</>;
};

export default CustomCheckbox;
