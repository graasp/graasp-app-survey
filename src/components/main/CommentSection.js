import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const CommentSection = (props) => {
  const [comment, setComment] = useState(' ');

  const disableButton = () => {
    if (props.questionStudent.filter((e) => e.data.state === 'Empty').length > 0) {
     console.log(props.questionStudent.filter((e) => e.data.state === 'Empty'))
      return true;
    }
    return false;
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch', marginLeft: '0' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="filled-basic"
        label="Comments"
        variant="filled"
        multiline
        color="secondary"
        style={{ marginTop: '20px', width: '100%' }}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        disabled={disableButton()}
        variant="contained"
        color="secondary"
        // type="submit"
        onClick={() => setComment(comment)}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CommentSection;
