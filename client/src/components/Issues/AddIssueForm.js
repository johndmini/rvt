import React, { useState } from 'react';

import { Box, TextField, Typography, Button, FormControl } from '@mui/material';

const initIssueInputs = {
  title: '',
  description: '',
};

export default function AddIssueForm(props) {
  const { addIssue, light } = props;
  const [issueInputs, setIssueInputs] = useState(initIssueInputs);
  const inputProps = {
    style: { color: light ? 'black' : 'white' },
  };

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
        backgroundColor: light ? 'gray' : '#2c4963',
        borderRadius: '10px',
      }}
    >
      <Typography>Submit Issue Form</Typography>
      <FormControl sx={{ backgroundColor: light ? 'white' : 'gray' }}>
        <TextField
          label="Title"
          name="title"
          value={issueInputs.title}
          onChange={handleIssueChange}
          inputProps={inputProps}
          InputLabelProps={inputProps}
        />
        <TextField
          label="Description"
          name="description"
          value={issueInputs.description}
          onChange={handleIssueChange}
          multiline
          rows={5}
          inputProps={inputProps}
          InputLabelProps={inputProps}
        />
      </FormControl>
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
