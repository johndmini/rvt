import React from 'react';

import { Box, Button, TextField } from '@mui/material';
import { Delete, Edit, Save } from '@mui/icons-material';

export default function EditForm(props) {
  const {
    toggleEdit,
    toggleSave,
    handleChange,
    editId,
    issueElement,
    deleteIssue,
    _id,
    light,
  } = props;

  const inputProps = {
    style: { color: light ? 'black' : 'white' },
  };
  return (
    <Box>
      {editId === _id && (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
          <TextField
            label="Title"
            name="title"
            inputProps={inputProps}
            value={issueElement.title}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            inputProps={inputProps}
            value={issueElement.description}
            onChange={handleChange}
            multiline
            rows={5}
          />
        </Box>
      )}
      {editId !== _id ? (
        <Button
          startIcon={<Edit />}
          variant="contained"
          size="small"
          sx={{ backgroundColor: 'cornflowerblue' }}
          onClick={() => toggleEdit(_id)}
        >
          Edit
        </Button>
      ) : (
        <Button
          startIcon={<Save />}
          variant="contained"
          size="small"
          sx={{ backgroundColor: 'green' }}
          onClick={() => toggleSave(_id, issueElement)}
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
          deleteIssue(_id);
        }}
      >
        Delete
      </Button>
    </Box>
  );
}
