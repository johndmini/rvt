import React from 'react';

import { Box, Button, ButtonGroup } from '@mui/material';
import {
  ArrowCircleDownTwoTone,
  ArrowCircleUpTwoTone,
} from '@mui/icons-material';

const ButtonSx = {
  fontSize: {
    mobile: '9px',
    tablet: '10px',
    desktop: '12px',
    wide: '13px',
  },
};

export default function FunctionsBar(props) {
  const { allIssues, setAllIssues } = props;

  const sortIssuesUp = (issues) => {
    const sortedIssues = issues.sort((a, b) => {
      if (a.upVotes.length > b.upVotes.length) {
        return -1;
      }
      if (a.upVotes.length < b.upVotes.length) {
        return 1;
      }
      return 0;
    });
    setAllIssues(sortedIssues.map((issue) => issue));
  };

  const sortIssuesDown = (issues) => {
    const sortedIssues = issues.sort((a, b) => {
      if (a.downVotes.length > b.downVotes.length) {
        return -1;
      }
      if (a.downVotes.length < b.downVotes.length) {
        return 1;
      }
      return 0;
    });
    setAllIssues(sortedIssues.map((issue) => issue));
  };

  return (
    <Box sx={{ display: 'block', textAlign: 'center', m: '10px' }}>
      <ButtonGroup variant="contained">
        <Button
          sx={ButtonSx}
          size="small"
          startIcon={<ArrowCircleUpTwoTone />}
          onClick={() => sortIssuesUp(allIssues)}
        >
          Sort by Upvotes
        </Button>
        <Button
          sx={ButtonSx}
          size="small"
          startIcon={<ArrowCircleDownTwoTone />}
          onClick={() => sortIssuesDown(allIssues)}
        >
          Sort by Downvotes
        </Button>
      </ButtonGroup>
    </Box>
  );
}
