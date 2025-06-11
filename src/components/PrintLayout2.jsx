import React, { useContext } from 'react';
import { forwardRef } from 'react';
import { Box, Typography } from '@mui/material';
import '../App.css';
import '../index.css';
import MyContext from './ContexExp';
import dayjs from 'dayjs';

function formatDateTimeToDDMMYYYY_HHMM(dateVal) {
  if (!dateVal) return '';
  // If it's a dayjs object, format it directly
  if (typeof dateVal === 'object' && dayjs.isDayjs(dateVal)) {
    return dateVal.format('DD-MM-YYYY  HH:mm');
  }
  // If it's a string, try to parse with dayjs
  const d = dayjs(dateVal);
  if (d.isValid()) {
    return d.format('DD-MM-YYYY  HH:mm');
  }
  return '';
}

/**
 
 */
const PrintLayout2 = forwardRef(function PrintLayout2(props, ref) {
  const { fontFamily } = useContext(MyContext);
  const commonStyles = {
    fontFamily: fontFamily || 'Courier New',
    fontWeight: "bold",
    
  };
  const { dataTwo } = useContext(MyContext);

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
        <Typography sx={{ ...commonStyles, fontSize: "24px", fontWeight: "bold" }}>{dataTwo.vehicleCode ? dataTwo.vehicleCode.toUpperCase() : ''}   {dataTwo.vehicleNumber || ''}</Typography>
      </Box>
      <Box sx={{ marginLeft: '445.63px', marginTop: " 280.54px", position: "absolute" }}>
        <Typography sx={commonStyles}>AVG PER BAG :-&nbsp;&nbsp;&nbsp;0.00</Typography>
      </Box>
      <Box sx={{ marginLeft: '116.75px', marginTop: "270.23px", position: "absolute", padding: "24px" }}>
        <Typography sx={{...commonStyles , marginTop: "0",marginBottom: "-6px",padding: "0",fontSize:"18px" }}> M@(40)=&nbsp;&nbsp;&nbsp;<span style={{fontSize:"22px"}}>{dataTwo.netWeight ? Math.floor(dataTwo.netWeight / 40) : 0}</span>&nbsp;M&nbsp;and&nbsp;<span style={{fontSize:"22px"}}>{dataTwo.netWeight ? dataTwo.netWeight % 40 : 0}</span>&nbsp;kg</Typography>
        <Typography sx={{...commonStyles , marginTop: "0",marginBottom: "-6px",padding: "0", fontSize:"18px" }}>BAG =</Typography>
        <Typography sx={{...commonStyles , marginTop: "0",marginBottom: "0",padding: "0", fontSize:"18px" }}>{dataTwo.driverStatus ? dataTwo.driverStatus.toUpperCase() : ''}</Typography>
      </Box>
      <Box sx={{ marginLeft: '590.75px', marginTop: "320.22px", position: "absolute" }}>
        <Typography sx={{ ...commonStyles, fontSize: "24px", fontWeight: "bold" }}>{dataTwo.charges || ''}   &nbsp; /=</Typography>
      </Box>
      <Box sx={{ marginLeft: "300.18px", marginTop: "215.15px", position: "absolute", padding: "0"}}>
        <Typography sx={{...commonStyles , letterSpacing:"-1px", fontSize:"20px" ,marginBottom:"-10px"}}>{formatDateTimeToDDMMYYYY_HHMM  (dataTwo.timeIn)}</Typography>
      </Box>
      <Box sx={{ left: "510.45px", top: "215.15px", textAlign: "right", position: "absolute" }}>
        <Box>
          <Typography sx={{ ...commonStyles, fontSize: "24px", fontWeight: "bold" }}>&nbsp;{dataTwo.netWeight}{dataTwo.netWeight ? '\u00A0\u00A0\u00A0KG' : ''}</Typography>
        </Box>
      </Box>
    </Box>
  );
});

export default PrintLayout2;
