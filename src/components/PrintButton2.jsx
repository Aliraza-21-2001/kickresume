import React from 'react';
import { Button } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

const PrintButton2 = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      startIcon={<PrintIcon />}
      onClick={onClick}
      sx={{
        width: '100%',
        backgroundColor:"#006838",
        color: '#fff',
        padding: '10px 30px',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: 600,
        textTransform: 'none',
        boxShadow: '0 2px 8px rgba(0,141,76,0.10)',
        '&:hover': {
          backgroundColor: '#008d4c',
          color: '#fff',
          boxShadow: '0 4px 12px rgba(0,141,76,0.18)',
          transform: 'translateY(-1px)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
        transition: 'all 0.2s ease',
        mt: 2
      }}
    >
      Print Details
    </Button>
  );
}
export default PrintButton2;