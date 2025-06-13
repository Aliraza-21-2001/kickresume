import React, { useContext } from 'react';
import { forwardRef } from 'react';
import { Box, Typography } from '@mui/material';
import '../App.css';

import MyContext from './ContexExp';
import dayjs from 'dayjs';

function formatDateTimeToDDMMYYYY_HHMM(dateVal) {
  if (!dateVal) return '';
  
  // If it's a dayjs object, format it directly
  if (typeof dateVal === 'object' && dayjs.isDayjs(dateVal)) {
    return dateVal.format('DD-MM-YYYY').padEnd(15, '   \u00A0 ') + dateVal.format('HH:mm'); // Add custom padding here
  }

  // If it's a string, try to parse with dayjs
  const d = dayjs(dateVal);
  if (d.isValid()) {
    return d.format('DD-MM-YYYY').padEnd(15, '    ') + d.format('HH:mm'); // Add custom padding here
  }
  
  return '';
}


/**
 
 */
const PrintLayout = forwardRef(function PrintLayout(props, ref) {
  const { fontFamily } = useContext(MyContext);
  const commonStyles = {
    fontFamily: fontFamily || 'Courier New',
     fontWeight: 'normal',
    fontSize: '14pt',
    letterSpacing: '0.2pt',
    color: '#000000',
    WebkitPrintColorAdjust: 'exact !important',
    MozPrintColorAdjust: 'exact !important',
    printColorAdjust: 'exact',
    lineHeight: '1.3',
    
  };
  const { dataOne } = useContext(MyContext);
   

  return (
    <Box
      ref={ref}
      sx={{
        display: "none",
        "@media print": {
          display: "flex",
          position: "relative",
          width: "210mm",
          height: "297mm",
          backgroundColor: "white",
          fontFamily: '"Courier New", monospace',
          fontWeight: "normal",
         letterSpacing: "0.2pt",
          color: "#000000",
          WebkitPrintColorAdjust: "exact !important",
          MozPrintColorAdjust: "exact !important",
          printColorAdjust: "exact !important",
          padding: "0",
          margin: "0",
          lineHeight: "1.3",
          marginTop: "50px",
          
          
          
        },
      }}
    >
      <Box sx={{ marginLeft: '116.75px', marginTop: "215.15px", position: "absolute" }}>
        <Typography sx={{ ...commonStyles, fontSize: "22pt", fontWeight: "bold" ,letterSpacing:"0.5pt"}}>{dataOne.vehicleCode ? dataOne.vehicleCode.toUpperCase() : ''}   {dataOne.vehicleNumber || ''}</Typography>
      </Box>
      <Box sx={{ marginLeft: '430.63px', marginTop: " 297.00px", position: "absolute" }}>
        <Typography sx={{...commonStyles, fontSize:"14pt",fontWeight:"bold"}}>AVG PER BAG :-&nbsp;&nbsp;&nbsp;0.00</Typography>
      </Box>
      <Box sx={{ marginLeft: '116.75px', marginTop: "305.23px", position: "absolute", padding: "0" }}>
        <Typography sx={{...commonStyles , marginTop: "0",marginBottom: "0",padding: "0",fontSize:"14pt",lineHeight:"1",fontWeight:"bold" }}> M@(40)=&nbsp;&nbsp;&nbsp;<span style={{fontSize:"22pt"}}>{dataOne.netWeight ? Math.floor(dataOne.netWeight / 40) : 0}</span>&nbsp;M&nbsp;and&nbsp;<span style={{fontSize:"22pt"}}>{dataOne.netWeight ? dataOne.netWeight % 40 : 0}</span>&nbsp;kg</Typography>
        <Typography sx={{...commonStyles , marginTop: "0",marginBottom: "0",padding: "0", fontSize:"14pt",fontWeight:"bold",lineHeight:"1" }}>BAG =</Typography>
        <Typography sx={{...commonStyles , marginTop: "0",marginBottom: "0",padding: "0", fontSize:"14pt",fontWeight:"bold",lineHeight:"1" }}>{dataOne.driverStatus ? dataOne.driverStatus.toUpperCase() : ''}</Typography>
      </Box>
      <Box sx={{ marginLeft: '530.05px', marginTop: "324.22px", position: "absolute" }}>
        <Typography sx={{ ...commonStyles, fontSize: "22pt", fontWeight: "bold" }}>{dataOne.charges || ''}   &nbsp; /=</Typography>
      </Box>
      <Box sx={{ marginLeft: "300.18px", marginTop: "210.33px", position: "absolute", padding: "0" }}>
        <Typography sx={{...commonStyles, fontSize:"13.5pt",fontWeight:"bold"}}>{formatDateTimeToDDMMYYYY_HHMM  (dataOne.timeIn)}</Typography>
        <Typography sx={{...commonStyles ,  fontSize:"13.5pt",fontWeight:"bold"}}>{formatDateTimeToDDMMYYYY_HHMM  (dataOne.timeOut)}</Typography>
      </Box>
      <Box sx={{ left: "505.45px", top: "180.0px", textAlign: "right", position: "absolute" }}>
        <Box  sx={{}}>
          <Typography sx={{ ...commonStyles, fontSize: "21pt", fontWeight: "bold" }}>&nbsp;{dataOne.weight1}{dataOne.weight1 ? "\u00A0\u00A0KG": ""}</Typography>
        </Box>
        <Box  sx={{}}>
          <Typography sx={{ ...commonStyles, fontSize: "21pt", fontWeight: "bold" }}>&nbsp;{dataOne.weight2}{dataOne.weight2 ? "\u00A0\u00A0KG": ""}</Typography>
        </Box>
        <Box  sx={{}}>
          <Typography sx={{ ...commonStyles, fontSize: "21pt", fontWeight: "bold" }}>&nbsp;{dataOne.netWeight}{dataOne.netWeight ? "\u00A0\u00A0KG": ""}</Typography>
        </Box>
      </Box>
    </Box>
  );
});

export default PrintLayout;
