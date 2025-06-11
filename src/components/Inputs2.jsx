import React, { useState, useContext, useRef, useCallback, useMemo } from 'react';
import { Box, Typography, TextField, Checkbox, FormControlLabel, Button,} from '@mui/material';
import MyContext from './ContexExp';
import PrintButton2 from './PrintButton2';
import { useReactToPrint } from 'react-to-print';
import PrintLayout2 from './PrintLayout2'; 
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import dayjs from 'dayjs';


const textFieldStyle = {
  width: '100px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#008d4c', borderWidth: '2px' },
    '&:hover fieldset': { borderColor: '#008d4c' },
    '&.Mui-focused fieldset': { borderColor: '#008d4c' }
  },
  
  '& .MuiInputLabel-root': { color: '#008d4c', fontSize: '0.9rem' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#008d4c' },
  '& input': { fontSize: '1rem', padding: '10px 14px', textTransform: 'uppercase' }
};


const checkboxStyle = {
  color: '#008d4c',
  '&.Mui-checked': { color: '#008d4c' }
};

const checkboxLabelStyle = (checked) => ({
  fontSize: '0.9rem',
  color: '#008d4c',
  fontWeight: checked ? 600 : 400
});

function Inputs2() {
  const { setDataTwo } = useContext(MyContext);
  const [formDataTwo, setFormDataTwo] = useState({
    vehicleCode: '',
    vehicleNumber: '',
    timeIn: '',
    netWeight: '',
    bags: '',
    charges: '0',
    driverStatus: 'Without Driver',
  });

  const [driverStatus, setDriverStatus] = useState({
    withDriver: false,
    withoutDriver: true
  });

  // Memoized handlers
  const handleDateTimeChange = useCallback((field) => (newValue) => {
    setFormDataTwo((prevData) => ({
      ...prevData,
      [field]: newValue ? dayjs(newValue) : null
    }));
  }, []);

  const handleChange = useCallback((field) => (event) => {
    const { value, type, checked } = event.target;
    setFormDataTwo((prevData) => ({
      ...prevData,
      [field]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const handleCheckboxChange = useCallback((field) => (event) => {
    const newDriverStatus = {
      withDriver: field === 'withDriver' ? event.target.checked : false,
      withoutDriver: field === 'withoutDriver' ? event.target.checked : false
    };
    setDriverStatus(newDriverStatus);
    setFormDataTwo((prevData) => ({
      ...prevData,
      driverStatus: newDriverStatus.withDriver ? 'With Driver' : 'Without Driver'
    }));
  }, []);

  // Only update context onBlur or on print
  const handleBlur = useCallback(() => {
    setDataTwo(formDataTwo);
  }, [formDataTwo, setDataTwo]);

  const componentRef = useRef(null);

  const handlePrint2 = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "printlayout2",
    onAfterPrint: () => {
      setFormDataTwo({
        vehicleCode: '',
        vehicleNumber: '',
        timeIn: '',
        netWeight: '',
        bags: '',
        charges: '0',
        driverStatus: 'Without Driver',
      });
      setDriverStatus({
        withDriver: false,
        withoutDriver: true
      });
      setDataTwo({
        vehicleCode: '',
        vehicleNumber: '',
        timeIn: '',
        netWeight: '',
        bags: '',
        charges: '0',
        driverStatus: 'Without Driver',
      });
    }
  });

  // Memoize derived values
  const mAt40 = useMemo(() => {
    const net = Number(formDataTwo.netWeight) || 0;
    return {
      m: Math.floor(net / 40),
      kg: net % 40
    };
  }, [formDataTwo.netWeight]);

  return (
<>

    <Box sx={{
      display: 'flex',
      lineHeight: '1.5',
      gap: '1rem',
      alignItems: 'flex-start',
      flexDirection: 'column'
    }}>
      {/* Vehicle Details Section */}
      <Box sx={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-start',
        flexDirection: 'column'
      }}>
        <Typography
          sx={{
            color: '#008d4c',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '0.5rem'
          }}
        >
          Enter Vehicle Details
        </Typography>
        
        <Box sx={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <TextField 
            id="vehicle-code"  
            label="Reg. Code" 
            type='text' 
            value={formDataTwo.vehicleCode}
            onChange={handleChange('vehicleCode')}
            onBlur={handleBlur}
            variant="outlined"
            size="small"
            placeholder="ABC"
            sx={textFieldStyle}
            inputProps={{
              maxLength: 3
            }}
          />
          <TextField 
            id="vehicle-number"  
            label="Vehicle No." 
            variant="outlined"
            type='number' 
            value={formDataTwo.vehicleNumber}
            onChange={handleChange('vehicleNumber')}
            onBlur={handleBlur}
            size="small"
            placeholder="123"
            sx={textFieldStyle}
            inputProps={{
              maxLength: 3,
              type: 'number',
              pattern: '[0-9]*'
            }}
          />

          <Box sx={{ 
            display: 'flex', 
            gap: '1rem',
            marginLeft: '1rem',
            '& .MuiCheckbox-root': checkboxStyle
          }}>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={driverStatus.withDriver}
                  onChange={handleCheckboxChange('withDriver')}
                  size="small"
                  sx={checkboxStyle}
                />
              }
              label={
                <Typography sx={checkboxLabelStyle(driverStatus.withDriver)}>
                  With Driver
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Checkbox 
                  checked={driverStatus.withoutDriver}
                  onChange={handleCheckboxChange('withoutDriver')}
                  size="small"
                  sx={checkboxStyle}
                />
              }
              label={
                <Typography sx={checkboxLabelStyle(driverStatus.withoutDriver)}>
                  Without Driver
                </Typography>
              }
            />
          </Box>
        </Box>
      </Box>

      {/* Date Time Section */}
      <Box sx={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: '100%'
      }}>
        <Typography
          sx={{
            color: '#008d4c',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '0.5rem'
          }}
        >
          Enter Time Details
        </Typography>
        
        <Box sx={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
         <DateTimeField
  id="datetime-in"
  label="Time In"
  variant="outlined"
  value={formDataTwo.timeIn ? dayjs(formDataTwo.timeIn) : null}
  onChange={handleDateTimeChange('timeIn')}
  format="DD-MM-YYYY HH:mm"
  sx={{
    width: '220px',

    // Outer root style (custom input base)
    '& .MuiPickersInputBase-root': {
      // You can also add padding or background here
    },

    // Input field text
    '& .MuiPickersInputBase-root input': {
      fontSize: '1rem',
      padding: '10px 14px',
      textTransform: 'uppercase',
    },

    // Border (fieldset) styling
    '& .MuiPickersOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#008d4c',
        borderWidth: '2px',
      },
      '&:hover fieldset': {
        borderColor: '#008d4c',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#008d4c !important',
      },
    },

    // Label styling
    '& .MuiInputLabel-root': {
      color: '#008d4c',
      fontSize: '0.9rem',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#008d4c',
    },
  }}
  slotProps={{
    textField: {
     variant: 'outlined',
    
      size: 'small',
      InputLabelProps: { shrink: true },
    },
  }}
/>
         
        </Box>
      </Box>

   
      <Box sx={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: '100%'
      }} >
        <Typography
          sx={{
            color: '#008d4c',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '0.5rem'
          }}
        >
          Enter Weight
        </Typography>
        
        <Box sx={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          

          {/* Net Weight - now editable */}
          <TextField 
            id="weight"
            label="Weight"
            variant="outlined"
            size="small"
            value={formDataTwo.netWeight}
            onChange={handleChange('netWeight')}
            onBlur={handleBlur}
            type="text"
            placeholder="0.00"
            sx={{ ...textFieldStyle, width: '150px' }}
            InputProps={{
              endAdornment: (
                <Typography sx={{ color: '#008d4c', fontSize: '0.8rem', marginRight: '-7px' }}>
                  kg
                </Typography>
              )
            }}
          />
        </Box>
      </Box>

      {/* M@40 and Bags Section */}
      <Box sx={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: '100%',
        borderTop: '1px solid rgba(0, 141, 76, 0.1)',
        paddingTop: '2rem'
      }}>
        <Box sx={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {/* M@40 Display */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            backgroundColor: 'rgba(0, 141, 76, 0.05)',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            border: '2px solid rgba(0, 141, 76, 0.1)'
          }}>
            <Typography sx={{ 
              color: '#008d4c', 
              fontSize: '1rem',
              fontWeight: 600
            }}>
              M@(40) = {mAt40.m}M and {mAt40.kg} kg
            </Typography>
          </Box>

          {/* Bags */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem' }}>
            <Typography sx={{ color: '#008d4c', fontSize: '0.9rem', minWidth: '40px' }}>
              Bag:
            </Typography>
            <TextField 
              id="bags"
              variant="outlined"
              size="small"
              value={formDataTwo.bags}
              onChange={handleChange('bags')}
              onBlur={handleBlur}
              type="text"
              placeholder="0"
              sx={{ ...textFieldStyle, width: '100px' }}
            />
          </Box>

          {/* Charges */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem' , marginTop: '1rem'}}>
            <Typography sx={{ color: '#008d4c', fontSize: '0.9rem', minWidth: '65px' }}>
              Charges:
            </Typography>
            <TextField 
              id="charges"
              variant="outlined"
              size="small"
              value={formDataTwo.charges}
              onChange={e => {
                const value = e.target.value;
                setFormDataTwo(prev => ({
                  ...prev,
                  charges: value === '' ? '250' : value
                }));
              }}
              onBlur={handleBlur}
              type="text"
              sx={{ ...textFieldStyle, width: '100px' }}
              InputProps={{
                startAdornment: (
                  <Typography sx={{ color: '#008d4c', fontSize: '0.9rem', marginRight: '4px' }}>
                    Rs.
                  </Typography>
                )
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Print Button */}
      {/* <ButtonPrint onClick={handlePrint} /> */}
      <PrintButton2 onClick={handlePrint2} />
      {/* <PreviewButton onClick={handlePreview} formData={formData} /> */}
    </Box>
    <PrintLayout2 ref={componentRef}/>
    </>

  );
}

export default React.memo(Inputs2);
