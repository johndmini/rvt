import React, { useState } from 'react';

import { Box, TextField, Typography, Button } from '@mui/material';

const initIssueInputs = {
  title: '',
  description: '',
};

export default function AddIssueForm(props) {
  const { addIssue } = props;
  const [issueInputs, setIssueInputs] = useState(initIssueInputs);

  const handleIssueChange = (e) => {
    const { name, value } = e.target;
    setIssueInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitIssue = (e) => {
    e.preventDefault();
    addIssue(issueInputs);
    setIssueInputs(initIssueInputs);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '500px',
        m: '0 auto',
        padding: '25px',
        backgroundColor: 'gray',
        borderRadius: '10px',
      }}
    >
      <Typography>Submit Issue Form</Typography>
      <TextField
        label="Title"
        name="title"
        value={issueInputs.title}
        onChange={handleIssueChange}
        sx={{ backgroundColor: 'white' }}
      />
      <TextField
        label="Description"
        name="description"
        value={issueInputs.description}
        onChange={handleIssueChange}
        multiline
        rows={5}
        sx={{ backgroundColor: 'white' }}
      />
      <Button
        variant="contained"
        size="small"
        onClick={handleSubmitIssue}
        sx={{ width: '300px', m: '0 auto', mt: '10px' }}
      >
        Submit Issue
      </Button>
    </Box>
  );
}
