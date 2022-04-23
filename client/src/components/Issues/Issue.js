import React from 'react';

import { Box, Typography } from '@mui/material';

export default function Issue(props) {
  const { title, description, upVotes, downVotes, datecreated, user } = props;
  return (
    <Box sx={{ mb: '20px' }}>
      <Typography variant="h6">
        <u>{title}</u>
      </Typography>
      <Typography variant="subtitle1">{description}</Typography>
      <Typography variant="subtitle2">
        <strong>Upvotes : </strong>
        {upVotes.length}
      </Typography>
      <Typography variant="subtitle2">
        <strong>Downvotes : </strong>
        {downVotes.length}
      </Typography>
      <Typography variant="subtitle2">
        <strong>Posted By : </strong>
        {user.username}
      </Typography>
      <Typography variant="subtitle2">
        <strong>Posted On : </strong>
        {new Date(datecreated).toLocaleDateString()}
      </Typography>
    </Box>
  );
}
