import React, { useContext } from 'react';
import { Box, Typography, TextField, MenuItem } from '@mui/material';
import MyContext from './ContexExp';

const FontSelector = ({
  label = "Font Family",
  sampleText = "The quick brown fox jumps over the lazy dog.",
  sx = {},
}) => {
  const { fontFamily, FONT_OPTIONS, handleFontChange } = useContext(MyContext);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', ...sx }}>
      <Typography sx={{ color: '#1e3c72', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>
        Select Font Family
      </Typography>
      <TextField
        select
       
        label={label}
        value={fontFamily}
        onChange={handleFontChange}
        variant="outlined"
        size="small"
        sx={{
          width: '220px',
          '& .MuiOutlinedInput-root': {
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
          '& .MuiInputLabel-root': {
            color: '#1e3c72',
            fontSize: '0.9rem',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#1e3c72',
          },
          fontFamily: fontFamily,
        }}
      >
        {FONT_OPTIONS.map((font) => (
          <MenuItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>
            {font.label}
          </MenuItem>
        ))}
      </TextField>
      {sampleText ? (
        <Box
          mt={1}
          p={2}
          border={1}
          borderRadius={2}
          borderColor="grey.300"
          bgcolor="grey.50"
          sx={{ fontFamily: fontFamily, fontSize: '1.1rem', color: '#1e3c72', width: 'fit-content' }}
        >
          {sampleText}
        </Box>
      ) : null}
    </Box>
  );
};

export default FontSelector;
