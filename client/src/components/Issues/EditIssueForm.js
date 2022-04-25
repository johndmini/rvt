import React, { useState, useEffect } from 'react';

import { Box, Button, TextField } from '@mui/material';
import { Delete, Edit, Save } from '@mui/icons-material';

const EditIssueFormSx = {
  display: 'flex',
  flexDirection: 'column',
  width: {
    mobile: '340px',
    tablet: '520px',
    desktop: '520px',
    wide: '520px',
  },
};

export default function EditForm(props) {
  const [titleRows, setTitleRows] = useState(1);
  const [descriptionRows, setDescriptionRows] = useState(10);
  const [width, setWidth] = useState(window.innerWidth);

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

  const titleInputProps = {
    style: { color: light ? 'black' : 'white' },
    maxLength: 30,
  };

  const descriptionInputProps = {
    style: { color: light ? 'black' : 'white' },
    maxLength: 1000,
  };

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
      setTitleRows(2);
      setDescriptionRows(15);
    } else if (width <= 1023) {
      setTitleRows(1);
      setDescriptionRows(10);
    } else if (width <= 1279) {
      setTitleRows(1);
      setDescriptionRows(10);
    } else {
      setTitleRows(1);
      setDescriptionRows(10);
    }
  }, [width]);

  return (
    <Box>
      {editId === _id && (
        <Box sx={EditIssueFormSx}>
          <TextField
            label="Title"
            name="title"
            multiline
            rows={titleRows}
            inputProps={titleInputProps}
            value={issueElement.title}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            multiline
            rows={descriptionRows}
            inputProps={descriptionInputProps}
            value={issueElement.description}
            onChange={handleChange}
          />
        </Box>
      )}
      {editId !== _id ? (
        <Button
          startIcon={<Edit />}
          variant="contained"
          size="small"
          sx={{
            backgroundColor: 'cornflowerblue',
            mr: '10px',
            fontSize: {
              mobile: '9px',
              tablet: '10px',
              desktop: '12px',
              wide: '13px',
            },
          }}
          onClick={() => toggleEdit(_id)}
        >
          Edit
        </Button>
      ) : (
        <Button
          startIcon={<Save />}
          variant="contained"
          size="small"
          sx={{
            backgroundColor: 'green',
            mr: '10px',
            fontSize: {
              mobile: '9px',
              tablet: '10px',
              desktop: '12px',
              wide: '13px',
            },
          }}
          onClick={() => toggleSave(_id, issueElement)}
        >
          Save
        </Button>
      )}
      <Button
        startIcon={<Delete />}
        variant="contained"
        size="small"
        sx={{
          backgroundColor: 'red',
          fontSize: {
            mobile: '9px',
            tablet: '10px',
            desktop: '12px',
            wide: '13px',
          },
        }}
        onClick={() => {
          deleteIssue(_id);
        }}
      >
        Delete
      </Button>
    </Box>
  );
}
