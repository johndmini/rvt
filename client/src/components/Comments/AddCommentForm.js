import React, { useState, useEffect } from 'react';

import { Box, TextField, Button } from '@mui/material';

const initCommentInput = {
  comment: '',
};

const ButtonSx = {
  fontSize: {
    mobile: '9px',
    tablet: '10px',
    desktop: '12px',
    wide: '13px',
  },
  width: {
    mobile: '120px',
    tablet: '120px',
    desktop: '150px',
    wide: '150px',
  },
};

const TextFieldSX = {
  display: 'flex',
  flexDirection: 'column',
  width: {
    mobile: '320px',
    tablet: '620px',
    desktop: '920px',
    wide: '1020px',
  },
};

export default function AddCommentForm(props) {
  const { issueId, userAxios, setComments, light } = props;
  const [commentInput, setCommentInput] = useState(initCommentInput);
  const [commentRows, setCommentRows] = useState(10);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (width <= 767) {
      setCommentRows(15);
    } else if (width <= 1023) {
      setCommentRows(10);
    } else if (width <= 1279) {
      setCommentRows(7);
    } else {
      setCommentRows(7);
    }
  }, [width]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (id) => {
    try {
      const response = await userAxios.post(
        `/api/issues/comments/${id}/comments`,
        commentInput
      );
      setCommentInput(initCommentInput);
      setComments((prevState) => [...prevState, response.data]);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Box sx={TextFieldSX}>
      <TextField
        label="Add Comments"
        multiline
        rows={commentRows}
        name="comment"
        inputProps={{
          style: { color: light ? 'black' : 'white' },
          maxLength: 500,
        }}
        helperText={`${commentInput.comment.length}/500`}
        value={commentInput.comment}
        onChange={handleChange}
      />
      <Button
        sx={ButtonSx}
        variant="contained"
        size="small"
        onClick={() => handleSubmit(issueId)}
      >
        Submit Comment
      </Button>
    </Box>
  );
}
