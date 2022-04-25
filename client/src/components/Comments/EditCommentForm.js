import React, { useState, useEffect } from 'react';

import { Box, TextField, Button } from '@mui/material';
import { Save } from '@mui/icons-material';

const ButtonSx = {
  fontSize: {
    mobile: '9px',
    tablet: '10px',
    desktop: '12px',
    wide: '13px',
  },
  mb: '10px',
};

const EditFormSx = {
  mr: '10px',
  mb: '10px',
  width: {
    mobile: '275px',
    tablet: '600px',
    desktop: '900px',
    wide: '1000px',
  },
};

export default function EditCommentForm(props) {
  const [rows, setRows] = useState(5);
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
      setRows(15);
    } else if (width <= 1023) {
      setRows(7);
    } else if (width <= 1279) {
      setRows(5);
    } else {
      setRows(7);
    }
  }, [width]);

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
        `https://johnd-rvt.herokuapp.com/api/issues/comments/${id}/comments/${commentId}`,
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
        sx={EditFormSx}
        multiline
        rows={rows}
        inputProps={{ style: { fontSize: '14px' } }}
        name="comment"
        value={commentInput.comment}
        onChange={handleChange}
      />

      <Button
        startIcon={<Save />}
        sx={ButtonSx}
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
