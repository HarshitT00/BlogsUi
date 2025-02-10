import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/material/styles';
import { SignUpRequest } from '../../api/AuthApiModels';
import { useNavigate } from 'react-router-dom';

interface SignUpBodyProps {
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  handleSignUp: (req: SignUpRequest, callbacks?: { onSuccess: () => void }) => void;
}


export const SignUpBody = ({handleSignUp, isLoading, isError, errorMessage}: SignUpBodyProps) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); // Prevents default form submission
    handleSignUp(
      { userName, password, email }, 
      { onSuccess: () => navigate('/login') }
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <StyledLockIcon>
          <LockOutlinedIcon sx={{ color: 'white' }} />
        </StyledLockIcon>
        
        <Typography component="h1" variant="h5" gutterBottom>
          Sign Up
        </Typography>

        {isError && errorMessage && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ mt: 1, width: '100%' }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="email"
            type="email"
            id="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, height: 48 }}
          >
            {!isLoading ? <>Sign Up</> : <CircularProgress size={24} />}
          </Button>
        </Box>
      </StyledPaper>
    </Container>
  );
};


// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const StyledLockIcon = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
  borderRadius: '50%',
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));