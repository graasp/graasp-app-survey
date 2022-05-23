import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { MUTATION_KEYS, useMutation } from '../../config/queryClient';
import { APP_DATA_TYPES } from '../../config/appDataTypes';
import { useAppData } from '../context/appData';

const CommentSection = ({ setSubmitted, disabled }) => {
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

      if (newComment?.lengnth > 0) {
        setCommentObject(newComment[0]);
      } else {
        // Generate array of checkboxes where each checkbox his an object having a studentId, questionId and state (and type and visibility)
        setCommentObject({
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
    setSubmitted(true);
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
        disabled={disabled}
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

CommentSection.propTypes = {
  setSubmitted: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default CommentSection;
