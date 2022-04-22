import React, { useState } from 'react';

import { Box, TextField, Button } from '@mui/material';

const initCommentInput = {
  comment: '',
};

export default function CommentForm(props) {
  const { issueId, userAxios, setComments } = props;
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
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
      <TextField
        label="Add Comments"
        multiline
        rows={4}
        name="comment"
        value={commentInput.comment}
        onChange={handleChange}
      />
      <Button
        sx={{ width: '150px' }}
        variant="contained"
        size="small"
        onClick={() => handleSubmit(issueId)}
      >
        Submit Comment
      </Button>
    </Box>
  );
}
