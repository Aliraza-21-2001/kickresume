import React, { useContext } from 'react';
import { forwardRef } from 'react';
import { Box, Typography } from '@mui/material';
import '../App.css';
import '../index.css';
import MyContext from './ContexExp';

function formatDateTimeToDDMMYYYY_HHMM(dateStr) {
  if (!dateStr) return '';
  const [datePart, timePart] = dateStr.split('T');
  const [yyyy, mm, dd] = datePart.split('-');
  let formatted = `${dd}-${mm}-${yyyy}`; // Removed extra space after date
  if (timePart) {
    const [hh, min] = timePart.split(':');
    formatted += `\u00A0\u00A0${hh}:${min}`; // Using non-breaking space character for consistent spacing
  }
  return formatted;
}

/**
 
 */
const PrintLayout = forwardRef(function PrintLayout(props, ref) {
  const { fontFamily } = useContext(MyContext);
  const commonStyles = {
    fontFamily: fontFamily || 'Courier New',
    fontWeight: "bold",
  };
  const { formData } = useContext(MyContext);

  return (
    <Box
      ref={ref}
      sx={{
        ...commonStyles,
        display: "none",
        '@media print': {
          display: 'flex',
           width: '210mm', // A4 width
      height: '297mm', // A4 height
          padding: '0',
          margin: "0",
          backgroundColor: '#fff',
          pageBreakAfter: 'always',
          textAlign: 'left',
          position: "relative",
        },
      }}
    >
      <Box sx={{ marginLeft: '140.6px', marginTop: "215.15px", position: "absolute" }}>
        <Typography sx={{ ...commonStyles, fontSize: "22px", fontWeight: "bold" }}>{formData.vehicleCode.toUpperCase()}   {formData.vehicleNumber}</Typography>
      </Box>
      <Box sx={{ marginLeft: '445.63px', marginTop: " 280.54px", position: "absolute" }}>
        <Typography sx={commonStyles}>AVG PER BAG :-&nbsp;&nbsp;&nbsp;0.00</Typography>
      </Box>
      <Box sx={{ marginLeft: '116.75px', marginTop: "270.23px", position: "absolute", padding: "22px" }}>
       
              <Typography sx={{...commonStyles , marginTop: "0",marginBottom: "-6px",padding: "0",fontSize:"16px" }}> M@(40)=&nbsp;&nbsp;&nbsp;<span style={{fontSize:"22px"}}>{Math.floor(formData.netWeight / 40)}</span>&nbsp;M&nbsp;and&nbsp;<span style={{fontSize:"22px"}}>{formData.netWeight % 40}</span>&nbsp;kg</Typography>
     
        
          <Typography sx={{...commonStyles , marginTop: "0",marginBottom: "-6px",padding: "0", fontSize:"16px" }}>BAG =</Typography>
     
        
          <Typography sx={{...commonStyles , marginTop: "0",marginBottom: "0",padding: "0", fontSize:"16px" }}>{formData.driverStatus.toUpperCase()}</Typography>
        
      </Box>
      <Box sx={{ marginLeft: '590.75px', marginTop: "320.22px", position: "absolute" }}>
        <Typography sx={{ ...commonStyles, fontSize: "22px", fontWeight: "bold" }}>250   &nbsp; /=</Typography>
      </Box>
      <Box sx={{ marginLeft: "300.18px", marginTop: "210.33px", position: "absolute", padding: "0"}}>
    
          <Typography sx={{...commonStyles , letterSpacing:"-1px", fontSize:"18px" ,marginBottom:"-10px"}}>{formatDateTimeToDDMMYYYY_HHMM  (formData.timeIn)}</Typography>
        
   
          <Typography sx={{...commonStyles , letterSpacing:"-1px", fontSize:"18px" ,marginBottom:"-10px"  }}>{formatDateTimeToDDMMYYYY_HHMM  (formData.timeOut)}</Typography>
      
      </Box>
      <Box sx={{ left: "510.45px", top: "185.9px", textAlign: "right", position: "absolute" }}>
        <Box>
          <Typography sx={{ ...commonStyles, fontSize: "22px", fontWeight: "bold" }}>&nbsp;{formData.weight1}&nbsp;&nbsp;&nbsp;KG</Typography>
        </Box>
        <Box>
          <Typography sx={{ ...commonStyles, fontSize: "22px", fontWeight: "bold" }}>&nbsp;{formData.weight2}&nbsp;&nbsp;&nbsp;KG</Typography>
        </Box>
        <Box>
          <Typography sx={{ ...commonStyles, fontSize: "22px", fontWeight: "bold" }}>&nbsp;{formData.netWeight}&nbsp;&nbsp;&nbsp;KG</Typography>
        </Box>
      </Box>
    </Box>
  );
});

export default PrintLayout;
