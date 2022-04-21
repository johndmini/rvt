import React, { useState } from 'react';
import Issue from './issue';
import EditForm from './EditForm';

import { Box } from '@mui/material';

export default function UserIssues(props) {
  const { userIssues, deleteIssue, editIssue } = props;
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

  return (
    <Box>
      {userIssues.map((issue) => (
        <Box key={issue._id} sx={{ mb: '20px' }}>
          <Issue key={issue._id} {...issue} />
          <EditForm
            {...issue}
            toggleEdit={toggleEdit}
            toggleSave={toggleSave}
            handleChange={handleChange}
            editId={editId}
            issueElement={issueElement}
            deleteIssue={deleteIssue}
          />
        </Box>
      ))}
    </Box>
  );
}
