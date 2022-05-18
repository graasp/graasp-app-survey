import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { MUTATION_KEYS, useMutation } from '../../config/queryClient';
import { APP_DATA_TYPES } from '../../config/appDataTypes';
import { useAppData } from '../context/appData';
import { uuid4 } from '@sentry/utils';

const CommentSection = (props) => {
  const { mutate: postAppData } = useMutation(MUTATION_KEYS.POST_APP_DATA);
  const {
    data: appData,
    isSuccess: isAppDataSuccess,
    // isStale: isAppDataStale,
    isLoading: isAppDataLoading,
  } = useAppData();
  const [comment, setComment] = useState(' ');
  const [commentObject, setCommentObject] = useState({});

  useEffect(() => {
    if (isAppDataSuccess && !isAppDataLoading) {
      const newComment = appData.filter(
        ({ type }) => type === APP_DATA_TYPES.COMMENT,
      );

      if (newComment._tail) {
        setCommentObject(newComment._tail.array[0]);
      } else {
        // Generate array of checkboxes where each checkbox his an object having a studentId, questionId and state (and type and visibility)
        setCommentObject({
          id: uuid4(),
          type: 'comment',
          data: {
            text: comment,
          },
        });
      }
    }
  }, [appData, isAppDataSuccess, isAppDataLoading]);

  const handleComment = (e) => {
    setComment(e.target.value);
    setCommentObject({
      ...commentObject,
      data: { ...commentObject.data, text: e.target.value },
    });
  };

  const handleClick = () => {
    postAppData(commentObject);
    props.setSubmitted(true);
  };
  const disableButton = () => {
    if (
      props.questionStudent.filter((e) => e.data.state === 'Empty').length > 0
    ) {
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
        onChange={handleComment}
      />
      <Button
        disabled={disableButton()}
        variant="contained"
        color="secondary"
        // type="submit"
        onClick={handleClick}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CommentSection;
