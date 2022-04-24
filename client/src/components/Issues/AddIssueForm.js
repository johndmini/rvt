import React, { useState, useEffect } from 'react';

import { Box, TextField, Typography, Button } from '@mui/material';

const initIssueInputs = {
  title: '',
  description: '',
};

const ButtonSx = {
  width: '300px',
  m: '0 auto',
  mt: '10px',
  fontSize: {
    mobile: '9px',
    tablet: '10px',
    desktop: '12px',
    wide: '13px',
  },
};

export default function AddIssueForm(props) {
  const { addIssue, light } = props;
  const [issueInputs, setIssueInputs] = useState(initIssueInputs);
  const [titleRows, setTitleRows] = useState(1);
  const [descriptionRows, setDescriptionRows] = useState(10);
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

  const titleInputProps = {
    style: { color: light ? 'black' : 'white' },
    maxLength: 30,
  };

  const descriptionInputProps = {
    style: { color: light ? 'black' : 'white' },
    maxLength: 1000,
  };

  const AddIssueFormSx = {
    display: 'flex',
    flexDirection: 'column',
    m: '0 auto',
    backgroundColor: light ? 'gray' : '#2c4963',
    borderRadius: '10px',
    width: {
      mobile: '320px',
      tablet: '500px',
      desktop: '500px',
      wide: '500px',
    },
    p: {
      mobile: '10px',
      tablet: '15px',
      desktop: '25px',
      wide: '25px',
    },
  };

  const TextFieldSx = {
    backgroundColor: light ? 'white' : 'gray',
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
    <Box sx={AddIssueFormSx}>
      <Typography>Submit Issue Form</Typography>
      <TextField
        label="Title"
        name="title"
        multiline
        rows={titleRows}
        sx={TextFieldSx}
        value={issueInputs.title}
        onChange={handleIssueChange}
        inputProps={titleInputProps}
        helperText={`${issueInputs.title.length}/30`}
        InputLabelProps={titleInputProps}
      />
      <TextField
        label="Description"
        name="description"
        multiline
        rows={descriptionRows}
        sx={TextFieldSx}
        value={issueInputs.description}
        onChange={handleIssueChange}
        inputProps={descriptionInputProps}
        helperText={`${issueInputs.description.length}/1000`}
        InputLabelProps={descriptionInputProps}
      />
      <Button
        variant="contained"
        size="small"
        onClick={handleSubmitIssue}
        sx={ButtonSx}
      >
        Submit Issue
      </Button>
    </Box>
  );
}
