import React, { useState, useEffect } from 'react';

import { Box, Typography, IconButton } from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';

export default function Public(props) {
  const { userAxios, user } = props;
  const [allIssues, setAllIssues] = useState([]);

  const getAllIssues = async () => {
    const response = await userAxios.get('/api/issues');
    setAllIssues(response.data);
  };

  useEffect(() => {
    getAllIssues();
  }, [allIssues.length]);

  const handleUpvote = async (id) => {
    const response = await userAxios.put(`/api/issues/${id}/upvote`);
    setAllIssues(
      allIssues.map((issue) => (issue._id === id ? response.data : issue))
    );
  };

  const handleDownvote = async (id) => {
    const response = await userAxios.put(`/api/issues/${id}/downvote`);
    setAllIssues(
      allIssues.map((issue) => (issue._id === id ? response.data : issue))
    );
  };

  const handleNoVote = async (id) => {
    const response = await userAxios.put(`/api/issues/${id}/novote`);
    setAllIssues(
      allIssues.map((issue) => (issue._id === id ? response.data : issue))
    );
  };

  return (
    <>
      {allIssues.map((issue) => (
        <Box key={issue._id} sx={{ mb: '20px' }}>
          <Typography variant="h6">
            <u>{issue.title}</u>
          </Typography>
          <Typography variant="subtitle1">{issue.description}</Typography>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ p: '10px' }}>
              <IconButton
                onClick={
                  issue.upVotes.includes(user._id)
                    ? () => handleNoVote(issue._id)
                    : () => handleUpvote(issue._id)
                }
              >
                <ThumbUp color="success" />
              </IconButton>
              <Typography variant="subtitle2">
                {issue.upVotes.length}
              </Typography>
            </Box>
            <Box sx={{ p: '10px' }}>
              <IconButton
                onClick={
                  issue.downVotes.includes(user._id)
                    ? () => handleNoVote(issue._id)
                    : () => handleDownvote(issue._id)
                }
              >
                <ThumbDown color="error" />
              </IconButton>
              <Typography variant="subtitle2">
                {issue.downVotes.length}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
}
