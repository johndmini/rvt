import React, { useState } from 'react';

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
    tablet: '500px',
    desktop: '500px',
    wide: '500px',
  },
};

export default function AddCommentForm(props) {
  const { issueId, userAxios, setComments, light } = props;
  const [commentInput, setCommentInput] = useState(initCommentInput);

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
        rows={4}
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
