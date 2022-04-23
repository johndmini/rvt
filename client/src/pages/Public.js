import React, { useState, useEffect } from 'react';
import AddCommentForm from '../components/Comments/AddCommentForm';
import EditCommentForm from '../components/Comments/EditCommentForm';

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
  Delete,
} from '@mui/icons-material';

export default function Public(props) {
  const { userAxios, user, light } = props;
  const [allIssues, setAllIssues] = useState([]);
  const [comments, setComments] = useState([]);
  const [toggleComments, setToggleComments] = useState(null);
  const [toggleAddCommentForm, setAddToggleCommentForm] = useState(null);
  const [toggleEditCommentForm, setToggleEditCommentForm] = useState(null);

  const getAllIssues = async () => {
    const response = await userAxios.get('/api/issues');
    setAllIssues(response.data);
  };

  // sort allissues by number of upvotes or downvotes
  const sortIssues = (issues) => {
    return issues.sort((a, b) => {
      if (a.upvotes.length > b.upvotes.length) {
        return -1;
      }
      if (a.upvotes.length < b.upvotes.length) {
        return 1;
      }
      return 0;
    });
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

  const handleDeleteComment = async (id, commentId) => {
    try {
      const response = await userAxios.delete(
        `/api/issues/comments/${id}/comments/${commentId}`
      );
      setComments(
        comments.map((comment) =>
          comment._id === commentId ? response.data : comment
        )
      );
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
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h3" fontFamily="monospace">
          Welcome To Rock The Vote
        </Typography>
      </Box>
      {allIssues.map((issue) => (
        <Box
          key={issue._id}
          sx={{
            mb: '20px',
            p: '20px',
            backgroundColor: light ? '#a6c1ed' : '#172e42',
            borderRadius: '20px',
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ textDecoration: 'underline' }}
          >
            {issue.title}
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
                  toggleAddCommentForm === issue._id ? (
                    <Close />
                  ) : (
                    <AddComment />
                  )
                }
                onClick={
                  toggleAddCommentForm !== issue._id
                    ? () => setAddToggleCommentForm(issue._id)
                    : () => setAddToggleCommentForm(null)
                }
              >
                {toggleAddCommentForm === issue._id ? 'Close' : 'Add Comment'}
              </Button>
            </ButtonGroup>
            {toggleAddCommentForm === issue._id && (
              <Box sx={{ mb: '20px' }}>
                <AddCommentForm
                  issueId={issue._id}
                  userAxios={userAxios}
                  setComments={setComments}
                />
              </Box>
            )}
            {toggleComments === issue._id && (
              <Box>
                {comments.map((comment) => (
                  <Box key={comment._id} sx={{ mb: '10px', ml: '30px' }}>
                    <Typography variant="subtitle2">
                      {comment.comment}
                    </Typography>
                    {toggleEditCommentForm === comment._id && (
                      <EditCommentForm
                        userAxios={userAxios}
                        {...comment}
                        issueId={issue._id}
                        setComments={setComments}
                        setToggleEditCommentForm={setToggleEditCommentForm}
                      />
                    )}
                    {comment.user === user._id && (
                      <ButtonGroup variant="contained" size="small">
                        <Button
                          startIcon={<Edit />}
                          onClick={
                            toggleEditCommentForm === comment._id
                              ? () => setToggleEditCommentForm(null)
                              : () => setToggleEditCommentForm(comment._id)
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          startIcon={<Delete />}
                          color="error"
                          onClick={() =>
                            handleDeleteComment(issue._id, comment._id)
                          }
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
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
