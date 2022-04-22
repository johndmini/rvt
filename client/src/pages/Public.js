import React, { useState, useEffect } from 'react';
import CommentForm from '../components/Comments/AddCommentForm';

import {
  Box,
  Typography,
  IconButton,
  Button,
  ButtonGroup,
} from '@mui/material';
import {
  ThumbUp,
  ThumbDown,
  ModeComment,
  AddComment,
  Close,
  Edit,
} from '@mui/icons-material';

export default function Public(props) {
  const { userAxios, user } = props;
  const [allIssues, setAllIssues] = useState([]);
  const [comments, setComments] = useState([]);
  const [toggleComments, setToggleComments] = useState(null);
  const [toggleCommentForm, setToggleCommentForm] = useState(null);

  const getAllIssues = async () => {
    const response = await userAxios.get('/api/issues');
    setAllIssues(response.data);
  };

  const handleUpvote = async (id) => {
    try {
      const response = await userAxios.put(`/api/issues/${id}/upvote`);
      setAllIssues(
        allIssues.map((issue) => (issue._id === id ? response.data : issue))
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDownvote = async (id) => {
    try {
      const response = await userAxios.put(`/api/issues/${id}/downvote`);
      setAllIssues(
        allIssues.map((issue) => (issue._id === id ? response.data : issue))
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleNoVote = async (id) => {
    try {
      const response = await userAxios.put(`/api/issues/${id}/novote`);
      setAllIssues(
        allIssues.map((issue) => (issue._id === id ? response.data : issue))
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  const getComments = async (id) => {
    try {
      const response = await userAxios.get(
        `/api/issues/comments/${id}/comments`
      );
      setComments(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleToggleComments = (id) => {
    getComments(id);
    setToggleComments(id);
  };

  useEffect(() => {
    getAllIssues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allIssues.length]);

  return (
    <>
      {allIssues.map((issue) => (
        <Box key={issue._id} sx={{ mb: '20px' }}>
          <Typography variant="h6">
            <u>{issue.title}</u>
          </Typography>
          <Typography variant="subtitle1">{issue.description}</Typography>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ p: '10px', textAlign: 'center' }}>
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
            <Box sx={{ p: '10px', textAlign: 'center' }}>
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
          <>
            <ButtonGroup sx={{ mb: '20px' }} variant="contained" size="small">
              <Button
                startIcon={<ModeComment />}
                onClick={
                  toggleComments !== issue._id
                    ? () => {
                        handleToggleComments(issue._id);
                      }
                    : () => setToggleComments(null)
                }
              >
                Comments
              </Button>
              <Button
                startIcon={
                  toggleCommentForm === issue._id ? <Close /> : <AddComment />
                }
                onClick={
                  toggleCommentForm !== issue._id
                    ? () => setToggleCommentForm(issue._id)
                    : () => setToggleCommentForm(null)
                }
              >
                {toggleCommentForm === issue._id ? 'Close' : 'Add Comment'}
              </Button>
            </ButtonGroup>
            {toggleCommentForm === issue._id && (
              <Box sx={{ mb: '20px' }}>
                <CommentForm
                  issueId={issue._id}
                  userAxios={userAxios}
                  setComments={setComments}
                />
              </Box>
            )}
            {toggleComments === issue._id && (
              <Box>
                {comments.map((comment) => (
                  <Box key={comment._id} sx={{ mb: '10px' }}>
                    <Typography variant="subtitle2">
                      {comment.comment}
                    </Typography>
                    {comment.user === user._id && (
                      <Button
                        startIcon={<Edit />}
                        variant="contained"
                        size="small"
                      >
                        Edit
                      </Button>
                    )}
                  </Box>
                ))}
              </Box>
            )}
          </>
        </Box>
      ))}
    </>
  );
}
