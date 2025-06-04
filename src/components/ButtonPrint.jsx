import React from 'react';
import { Box, Button } from '@mui/material';
import { Print } from '@mui/icons-material';

const ButtonPrint = ({ onClick }) => {
  return (
    <Box sx={{ 
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      mt: 1
    }}>
      <Button
        variant="contained"
        startIcon={<Print />}
        onClick={onClick}
        sx={{
          width: '100%',
          backgroundColor: '#1e3c72',
          padding: '10px 30px',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: '0 2px 8px rgba(30, 60, 114, 0.2)',
          '&:hover': {
            backgroundColor: '#2a5298',
            boxShadow: '0 4px 12px rgba(30, 60, 114, 0.3)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
          transition: 'all 0.2s ease'
        }}
      >
        Print Details
      </Button>
    </Box>
  );
};

export default ButtonPrint;
