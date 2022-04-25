import React, { useState, useEffect } from 'react';
import AddCommentForm from '../components/Comments/AddCommentForm';
import EditCommentForm from '../components/Comments/EditCommentForm';
import FunctionsBar from '../components/Tools/FunctionsBar';

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

const ButtonSx = {
  fontSize: {
    mobile: '9px',
    tablet: '10px',
    desktop: '12px',
    wide: '13px',
  },
};

const ButtonGroupSx = {
  mb: {
    mobile: '7px',
    tablet: '10px',
    desktop: '15px',
    wide: '15px',
  },
};

const CommentSx = {
  mb: '10px',
  ml: '30px',
  width: {
    mobile: '290px',
    tablet: '620px',
    desktop: '920px',
    wide: '1020px',
  },
};

const BannerSx = {
  typography: {
    mobile: 'h5',
    tablet: 'h5',
    desktop: 'h3',
    wide: 'h3',
  },
};

const TitleSx = {
  textDecoration: 'underline',
  typography: {
    mobile: 'subtitle1',
    tablet: 'subtitle1',
    desktop: 'h6',
    wide: 'h6',
  },
};

export default function Public(props) {
  const { userAxios, user, light } = props;
  const [allIssues, setAllIssues] = useState([]);
  const [comments, setComments] = useState([]);
  const [toggleComments, setToggleComments] = useState(null);
  const [toggleAddCommentForm, setAddToggleCommentForm] = useState(null);
  const [toggleEditCommentForm, setToggleEditCommentForm] = useState(null);

  const getAllIssues = async () => {
    const response = await userAxios.get(
      'https://johnd-rvt.herokuapp.com/api/issues'
    );
    setAllIssues(response.data);
  };

  const handleUpvote = async (id) => {
    try {
      const response = await userAxios.put(
        `https://johnd-rvt.herokuapp.com/api/issues/${id}/upvote`
      );
      setAllIssues(
        allIssues.map((issue) => (issue._id === id ? response.data : issue))
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDownvote = async (id) => {
    try {
      const response = await userAxios.put(
        `https://johnd-rvt.herokuapp.com/api/issues/${id}/downvote`
      );
      setAllIssues(
        allIssues.map((issue) => (issue._id === id ? response.data : issue))
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleNoVote = async (id) => {
    try {
      const response = await userAxios.put(
        `https://johnd-rvt.herokuapp.com/api/issues/${id}/novote`
      );
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
        `https://johnd-rvt.herokuapp.com/api/issues/comments/${id}/comments`
      );
      setComments(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDeleteComment = async (id, commentId) => {
    try {
      const response = await userAxios.delete(
        `https://johnd-rvt.herokuapp.com/api/issues/comments/${id}/comments/${commentId}`
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
        <Typography sx={BannerSx} fontFamily="monospace">
          Welcome To Rock The Vote
        </Typography>
      </Box>
      <FunctionsBar setAllIssues={setAllIssues} allIssues={allIssues} />
      {allIssues.map((issue) => (
        <Box
          key={issue._id}
          sx={{
            mb: '20px',
            p: '20px',
            backgroundColor: light ? '#a6c1ed' : '#2c4963',
            borderRadius: '20px',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ mr: 'auto' }}>
              <Typography sx={TitleSx}>
                <strong>{issue.title}</strong>
              </Typography>
              <Typography variant="subtitle2">{issue.description}</Typography>
            </Box>
            <Typography variant="subtitle2">
              {new Date(issue.datecreated).toLocaleDateString()}
            </Typography>
          </Box>
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
            <ButtonGroup sx={ButtonGroupSx} variant="contained" size="small">
              <Button
                sx={ButtonSx}
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
                sx={ButtonSx}
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
                  light={light}
                />
              </Box>
            )}
            {toggleComments === issue._id && (
              <Box>
                {comments.map((comment) => (
                  <Box key={comment._id} sx={CommentSx}>
                    <Typography variant="subtitle2" paragraph>
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
                          sx={ButtonSx}
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
                          sx={ButtonSx}
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
