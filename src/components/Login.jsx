import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Only allow username 'admin' and password '4321'
    if (username === 'admin' && password === '4321') {
      setError('');
      setSuccess(true);
      setTimeout(() => {
        onLogin();
      }, 1000);
    } else {
      setError('Username and password are incorrect');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f6f8fd 50%, #e8eef9 50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: { xs: 3, md: 5 },
          borderRadius: '16px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          minWidth: { xs: '90vw', sm: 400 },
          maxWidth: 420,
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/koilawala.png"
          alt="Logo"
          sx={{
            width: 'auto',
            height: { xs: '40px', md: '60px' },
            mb: 2,
            objectFit: 'contain',
            filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))',
            opacity: 0,
            transform: 'scale(0.7)',
            animation: 'logoPopIn 1.1s cubic-bezier(.4,1.4,.7,1) 0.2s forwards',
            '@keyframes logoPopIn': {
              '0%': { opacity: 0, transform: 'scale(0.7)' },
              '60%': { opacity: 1, transform: 'scale(1.08)' },
              '100%': { opacity: 1, transform: 'scale(1)' },
            },
          }}
        />
        {success ? (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 3,
            mb: 2,
          }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 12px rgba(67,233,123,0.15)',
                animation: 'successPop 0.7s cubic-bezier(.4,1.4,.7,1)',
                '@keyframes successPop': {
                  '0%': { opacity: 0, transform: 'scale(0.7)' },
                  '60%': { opacity: 1, transform: 'scale(1.15)' },
                  '100%': { opacity: 1, transform: 'scale(1)' },
                },
              }}
            >
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="18" fill="none" />
                <path d="M10 19L16 25L26 13" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Box>
            <Typography sx={{ mt: 2, color: '#43e97b', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '1px', textAlign: 'center' }}>
              Login Successful!
            </Typography>
          </Box>
        ) : (
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={e => setUsername(e.target.value)}
              sx={{ mb: 2, borderRadius: '8px' }}
              InputProps={{
                sx: {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#1e3c72',
                    borderWidth: '2px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#2a5298',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1e3c72',
                  },
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={e => setPassword(e.target.value)}
              sx={{ mb: 2, borderRadius: '8px' }}
              InputProps={{
                sx: {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#1e3c72',
                    borderWidth: '2px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#2a5298',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1e3c72',
                  },
                },
              }}
            />
            {error && (
              <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>{error}</Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                color: '#fff',
                fontWeight: 700,
                borderRadius: '8px',
                py: 1.2,
                fontSize: '1.1rem',
                boxShadow: '0 2px 8px rgba(30, 60, 114, 0.2)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #2a5298 0%, #1e3c72 100%)',
                },
              }}
            >
              Login
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default Login; 