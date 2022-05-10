import { useState } from "react";

const CHECKBOX_STATES = {
  Positive: "Positive",
  NonApplicable: "NonApplicable",
  Negative: "Negative",
  Empty: "Empty",
};

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

  const conditionalRender = () => {
    switch (isChecked) {
      case CHECKBOX_STATES.Positive:
        return (
          <input
            type="checkbox"
            checked
            style={{ transform: "scale(2)", filter: "hue-rotate(240deg)" }}
            color="blue"
            onClick={handleChange}
          />
        );
      case CHECKBOX_STATES.Empty:
        return (
          <input
            type="checkbox"
            style={{ transform: "scale(2)" }}
            onClick={handleChange}
          />
        );
      case CHECKBOX_STATES.NonApplicable:
        return (
          <input
            type="checkbox"
            checked
            style={{ transform: "scale(2)", filter: "hue-rotate(200deg)" }}
            color="green"
            onClick={handleChange}
          />
        );
      case CHECKBOX_STATES.Negative:
        return (
          <input
            type="checkbox"
            checked
            style={{ transform: "scale(2)",  filter: "hue-rotate(140deg)"}}
            onClick={handleChange}
          />
        );
      default:
        return;
    }
  };
  console.log(isChecked);
  return <>{conditionalRender()}</>;
};

export default CustomCheckbox;
