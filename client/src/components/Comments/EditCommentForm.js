import React, { useState } from 'react';

import { Box, TextField, Button } from '@mui/material';
import { Save } from '@mui/icons-material';

export default function EditCommentForm(props) {
  const {
    userAxios,
    comment,
    _id,
    issueId,
    setComments,
    setToggleEditCommentForm,
  } = props;
  const initCommentInput = {
    comment: comment,
  };
  const [commentInput, setCommentInput] = useState(initCommentInput);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (id, commentId) => {
    try {
      const response = await userAxios.put(
        `/api/issues/comments/${id}/comments/${commentId}`,
        commentInput
      );
      setCommentInput(response.data.comment);
      setComments((prevState) =>
        prevState.map((comment) =>
          comment._id === commentId ? response.data : comment
        )
      );
      setToggleEditCommentForm(null);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Box>
      <TextField
        multiline
        rows={4}
        name="comment"
        value={commentInput.comment}
        onChange={handleChange}
      />
      <Button
        startIcon={<Save />}
        color="success"
        variant="contained"
        size="small"
        onClick={() => handleSubmit(issueId, _id)}
      >
        Save
      </Button>
    </Box>
  );
}
