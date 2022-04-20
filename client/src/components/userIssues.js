import React, { useState } from 'react';

import { Box, Typography, Button, TextField } from '@mui/material';
import { Delete, Edit, Save } from '@mui/icons-material';

export default function UserIssues(props) {
  const { userIssues, deleteIssue, editIssue } = props;
  console.log(userIssues);
  const [editId, setEditId] = useState(null);
  const [issueElement, setIssueElement] = useState();

  const toggleEdit = (id) => {
    setEditId(id);
    const issue = userIssues.find((issue) => issue._id === id);
    setIssueElement(issue);
  };

  const toggleSave = (id, issueElement) => {
    setEditId(null);
    editIssue(id, issueElement);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssueElement((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const listIssues = userIssues.map((issue) => (
    <Box key={issue._id} sx={{ mb: '20px' }}>
      <Typography variant="h5">
        <u>{issue.title}</u>
      </Typography>
      <Typography>{issue.description}</Typography>
      {editId === issue._id && (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
          <TextField
            label="Title"
            name="title"
            value={issueElement.title}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            value={issueElement.description}
            onChange={handleChange}
            multiline
            rows={5}
          />
        </Box>
      )}
      {editId !== issue._id ? (
        <Button
          startIcon={<Edit />}
          variant="contained"
          size="small"
          sx={{ backgroundColor: 'cornflowerblue' }}
          onClick={() => toggleEdit(issue._id)}
        >
          Edit
        </Button>
      ) : (
        <Button
          startIcon={<Save />}
          variant="contained"
          size="small"
          sx={{ backgroundColor: 'green' }}
          onClick={() => toggleSave(issue._id, issueElement)}
        >
          Save
        </Button>
      )}
      <Button
        startIcon={<Delete />}
        variant="contained"
        size="small"
        sx={{ backgroundColor: 'red' }}
        onClick={() => {
          deleteIssue(issue._id);
        }}
      >
        Delete
      </Button>
    </Box>
  ));

  return <Box>{listIssues}</Box>;
}
