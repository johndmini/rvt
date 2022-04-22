import React, { useState, useEffect } from 'react';
import Issue from './Issue';
import EditForm from './EditIssueForm';

import { Box } from '@mui/material';

export default function UserIssues(props) {
  const { userIssues, deleteIssue, editIssue, getMyIssues } = props;
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

  useEffect(() => {
    getMyIssues();
  }, []);

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
