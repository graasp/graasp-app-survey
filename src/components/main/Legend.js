import React from 'react';
import Checkbox from '@mui/material/Checkbox';

const Legend = () => (
  <>
    <Checkbox checked style={{ color: 'green' }} />
    Yes &nbsp;&nbsp;&nbsp;&nbsp;
    <Checkbox checked style={{ color: 'red' }} />
    No &nbsp;&nbsp;&nbsp;&nbsp;
    <Checkbox checked style={{ color: 'orange' }} />
    N/A
  </>
);

export default Legend;
