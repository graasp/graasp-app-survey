import Checkbox from "@mui/material/Checkbox";

const Legend = () => {
  return (
    <>
      <Checkbox checked={true} style={{ color: "green" }} />Yes &nbsp;&nbsp;&nbsp;&nbsp;
      <Checkbox checked={true} style={{ color: "red" }} />No &nbsp;&nbsp;&nbsp;&nbsp;
      <Checkbox checked={true} style={{ color: "orange" }} />N/A
    </>
  );
};

export default Legend;
