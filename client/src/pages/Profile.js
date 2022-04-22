import React, { useState } from 'react';
import AddIssueForm from '../components/Issues/AddIssueForm';
import UserIssues from '../components/Issues/UserIssues';

import { Box, Typography, Button } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

export default function Profile(props) {
  const { user, addIssue, deleteIssue, userIssues, editIssue, getMyIssues } = props;
  const [toggleIssue, setToggleIssue] = useState(false);

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography>Welcome {user.username}</Typography>
      <Box sx={{ mt: '40px' }}>
        <AddIssueForm addIssue={addIssue} />
      </Box>
      <Box sx={{ mt: '40px', mb: '40px' }}>
        <Typography>Your Issues</Typography>
        <Button
          startIcon={!toggleIssue ? <Add /> : <Remove />}
          variant="contained"
          size="small"
          onClick={() => setToggleIssue((prevState) => !prevState)}
        >
          {!toggleIssue ? 'Show Issues' : 'Hide Issues'}
        </Button>
      </Box>
      {toggleIssue && (
        <Box sx={{ textAlign: 'left' }}>
          <UserIssues
            deleteIssue={deleteIssue}
            userIssues={userIssues}
            editIssue={editIssue}
            getMyIssues={getMyIssues}
          />
        </Box>
      )}
    </Box>
  );
}
