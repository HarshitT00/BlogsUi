import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

interface BaseLayoutProps {
  header?: React.ReactNode;
  body?: React.ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ header, body }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <StyledToolbar>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }} paddingLeft={10}>
            Blogs
          </Typography>
          <StyledButton color="inherit">Login</StyledButton>
          <StyledButton color="inherit">Sign In</StyledButton>
        </StyledToolbar>
      </StyledAppBar>
      <main>
        <div>{header}</div>
        <div>{body}</div>
      </main>
    </Box>
  );
};

const StyledAppBar = styled(AppBar)({
    height: '15vh',
    display: 'flex',
    justifyContent: 'center',
});
  
const StyledToolbar = styled(Toolbar)({
    minHeight: '15vh',
    paddingRight: '10vw ! important',
});

const StyledButton = styled(Button)({
    fontSize: '1rem',
});