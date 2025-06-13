import React, { useState, useContext, useRef, useCallback, useMemo } from 'react'
import { Box, Typography, TextField, Checkbox, FormControlLabel } from '@mui/material'
import MyContext from './ContexExp'
import ButtonPrint from './ButtonPrint'
import PrintLayout from './PrintLayout'
import { useReactToPrint } from 'react-to-print'
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import dayjs from 'dayjs';

const Inputs = () => {
  const { setDataOne } = useContext(MyContext);
  const [formData, setFormData] = useState({
      vehicleCode: '',
      vehicleNumber: '',
      timeIn: null,
      timeOut: null,
      weight1: '',
      weight2: '',
      netWeight: '',
      bags: '',
      charges: '250',
      driverStatus: 'Without Driver',
    });
  const [driverStatus, setDriverStatus] = useState({
    withDriver: false,
    withoutDriver: true  // Set to true by default
  });

  // Memoized handlers
  const handleDateTimeChange = useCallback((field) => (newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: newValue ? dayjs(newValue) : null
    }));
  }, []);

  const handleChange = useCallback((field) => (event) => {
    const { value, type, checked } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [field]: type === "checkbox" ? checked : value
    }));
  }, []);

  const handleCheckboxChange = useCallback((field) => (event) => {
    const newDriverStatus = {
      withDriver: field === 'withDriver' ? event.target.checked : false,
      withoutDriver: field === 'withoutDriver' ? event.target.checked : false
    };
    setDriverStatus(newDriverStatus);
    setFormData(prevData => ({
      ...prevData,
      driverStatus: newDriverStatus.withDriver ? 'With Driver' : 'Without Driver'
    }));
  }, []);

  // Only update context onBlur or on print
  const handleBlur = useCallback(() => {
    setDataOne(formData);
  }, [formData, setDataOne]);

  const componentRef = useRef(null)

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "printlayout",
    // onAfterPrint: () => {
    //   setFormData({
    //     vehicleCode: '',
    //     vehicleNumber: '',
    //     timeIn: null,
    //     timeOut: null,
    //     weight1: '',
    //     weight2: '',
    //     netWeight: '',
    //     bags: '',
    //     charges: '250',
    //     driverStatus: 'Without Driver',
    //   });
    //   setDriverStatus({
    //     withDriver: false,
    //     withoutDriver: true
    //   });
    //   setDataOne({
    //     vehicleCode: '',
    //     vehicleNumber: '',
    //     timeIn: null,
    //     timeOut: null,
    //     weight1: '',
    //     weight2: '',
    //     netWeight: '',
    //     bags: '',
    //     charges: '250',
    //     driverStatus: 'Without Driver',
    //   });
    // }
  });

  // Memoize derived values
  const mAt40 = useMemo(() => {
    const net = Number(formData.netWeight) || 0;
    return {
      m: Math.floor(net / 40),
      kg: net % 40
    };
  }, [formData.netWeight]);

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
            color: '#1e3c72',
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
            value={formData.vehicleCode}
            onChange={handleChange('vehicleCode')}
            onBlur={handleBlur}
            variant="outlined"
            size="small"
            placeholder="ABC"
            sx={{
              width: '100px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#1e3c72',
                  borderWidth: '2px'
                },
                '&:hover fieldset': {
                  borderColor: '#2a5298'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1e3c72'
                }
              },
              '& .MuiInputLabel-root': {
                color: '#1e3c72',
                fontSize: '0.9rem'
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#1e3c72'
              },
              '& input': {
                fontSize: '1rem',
                padding: '10px 14px',
                textTransform: 'uppercase'
              }
            }}
            inputProps={{
              maxLength: 3
            }}
          />
          <TextField 
            id="vehicle-number"  
            label="Vehicle No." 
            variant="outlined"
            type='number' 
            value={formData.vehicleNumber}
            onChange={handleChange('vehicleNumber')}
            onBlur={handleBlur}
            size="small"
            placeholder="123"
            sx={{
              width: '100px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#1e3c72',
                  borderWidth: '2px'
                },
                '&:hover fieldset': {
                  borderColor: '#2a5298'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1e3c72'
                }
              },
              '& .MuiInputLabel-root': {
                color: '#1e3c72',
                fontSize: '0.9rem'
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#1e3c72'
              },
              '& input': {
                fontSize: '1rem',
                padding: '10px 14px'
              }
            }}
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
            '& .MuiCheckbox-root': {
              color: '#1e3c72',
              '&.Mui-checked': {
                color: '#2a5298'
              }
            }
          }}>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={driverStatus.withDriver}
                  onChange={handleCheckboxChange('withDriver')}
                  size="small"
                />
              }
              label={
                <Typography sx={{ 
                  fontSize: '0.9rem', 
                  color: '#1e3c72',
                  fontWeight: driverStatus.withDriver ? 600 : 400 
                }}>
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
                />
              }
              label={
                <Typography sx={{ 
                  fontSize: '0.9rem', 
                  color: '#1e3c72',
                  fontWeight: driverStatus.withoutDriver ? 600 : 400 
                }}>
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
            color: '#1e3c72',
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
            value={formData.timeIn || null}
            onChange={handleDateTimeChange('timeIn')}
            format="DD-MM-YYYY HH:mm"
            sx={{
              width: '220px',
              '& .MuiPickersOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#1e3c72',
                  borderWidth: '2px'
                },
                '&:hover fieldset': {
                  borderColor: '#2a5298'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1e3c72 !important'
                }
              },
              '& .MuiInputLabel-root': {
                color: '#1e3c72',
                fontSize: '0.9rem'
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#1e3c72'
              },
              '& input': {
                fontSize: '1rem',
                padding: '10px 14px'
              }
            }}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          <DateTimeField
            id="datetime-out"
            label="Time Out"
            value={formData.timeOut || null}
            onChange={handleDateTimeChange('timeOut')}
            format="DD-MM-YYYY HH:mm"
            sx={{
              width: '220px',
              '& .MuiPickersOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#1e3c72',
                  borderWidth: '2px'
                },
                '&:hover fieldset': {
                  borderColor: '#2a5298'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1e3c72 !important'
                }
              },
              '& .MuiInputLabel-root': {
                color: '#1e3c72',
                fontSize: '0.9rem'
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#1e3c72'
              },
              '& input': {
                fontSize: '1rem',
                padding: '10px 14px'
              }
            }}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </Box>

      {/* Weights Section */}
      <Box sx={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: '100%'
        
      }} >
        <Typography
          sx={{
            color: '#1e3c72',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '0.5rem'
          }}
        >
          Enter Weights
        </Typography>
        
        <Box sx={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {/* Weight 1 */}
          <TextField 
            id="weight-1"
            label="Weight 1"
            variant="outlined"
            size="small"
            value={formData.weight1}
            onChange={handleChange('weight1')}
            onBlur={handleBlur}
            type="text"
            placeholder="0.00"
            sx={{
              width: '150px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#1e3c72',
                  borderWidth: '2px'
                },
                '&:hover fieldset': {
                  borderColor: '#2a5298'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1e3c72'
                }
              },
              '& .MuiInputLabel-root': {
                color: '#1e3c72',
                fontSize: '0.9rem'
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#1e3c72'
              },
              '& input': {
                fontSize: '1rem',
                padding: '10px 14px',
                textAlign: 'right'
              }
            }}
            InputProps={{
              endAdornment: (
                <Typography sx={{ color: '#1e3c72', fontSize: '0.8rem', marginRight: '-7px' }}>
                  kg
                </Typography>
              )
            }}
          />

          {/* Weight 2 */}
          <TextField 
            id="weight-2"
            label="Weight 2"
            variant="outlined"
            size="small"
            value={formData.weight2}
            onChange={handleChange('weight2')}
            onBlur={handleBlur}
            type="text"
            placeholder="0.00"
            sx={{
              width: '150px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#1e3c72',
                  borderWidth: '2px'
                },
                '&:hover fieldset': {
                  borderColor: '#2a5298'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1e3c72'
                }
              },
              '& .MuiInputLabel-root': {
                color: '#1e3c72',
                fontSize: '0.9rem'
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#1e3c72'
              },
              '& input': {
                fontSize: '1rem',
                padding: '10px 14px',
                textAlign: 'right'
              }
            }}
            InputProps={{
              endAdornment: (
                <Typography sx={{ color: '#1e3c72', fontSize: '0.8rem', marginRight: '-7px' }}>
                  kg
                </Typography>
              )
            }}
          />

          {/* Net Weight - now editable */}
          <TextField 
            id="net-weight"
            label="Net Weight"
            variant="outlined"
            size="small"
            value={formData.netWeight}
            onChange={handleChange('netWeight')}
            onBlur={handleBlur}
            type="text"
            placeholder="0.00"
            sx={{
              width: '150px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#1e3c72',
                  borderWidth: '2px'
                },
                '&:hover fieldset': {
                  borderColor: '#2a5298'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1e3c72'
                }
              },
              '& .MuiInputLabel-root': {
                color: '#1e3c72',
                fontSize: '0.9rem'
              },
              '& input': {
                fontSize: '1rem',
                padding: '10px 14px',
                textAlign: 'right'
              }
            }}
            InputProps={{
              endAdornment: (
                <Typography sx={{ color: '#1e3c72', fontSize: '0.8rem', marginRight: '-7px' }}>
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
        borderTop: '1px solid rgba(30, 60, 114, 0.1)',
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
            backgroundColor: 'rgba(30, 60, 114, 0.05)',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            border: '2px solid rgba(30, 60, 114, 0.1)'
          }}>
            <Typography sx={{ 
              color: '#1e3c72', 
              fontSize: '1rem',
              fontWeight: 600
            }}>
              M@(40) = {mAt40.m}M and {mAt40.kg} kg
            </Typography>
          </Box>

          {/* Bags */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem' }}>
            <Typography sx={{ color: '#1e3c72', fontSize: '0.9rem', minWidth: '40px' }}>
              Bag:
            </Typography>
            <TextField 
              id="bags"
              variant="outlined"
              size="small"
              value={formData.bags}
              onChange={handleChange('bags')}
              onBlur={handleBlur}
              type="text"
              placeholder="0"
              sx={{
                width: '100px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#1e3c72',
                    borderWidth: '2px'
                  },
                  '&:hover fieldset': {
                    borderColor: '#2a5298'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1e3c72'
                  }
                },
                '& input': {
                  fontSize: '1rem',
                  padding: '10px 14px',
                  textAlign: 'right'
                }
              }}
            />
          </Box>

          {/* Charges */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem' , marginTop: '1rem'}}>
            <Typography sx={{ color: '#1e3c72', fontSize: '0.9rem', minWidth: '65px' }}>
              Charges:
            </Typography>
            <TextField 
              id="charges"
              variant="outlined"
              size="small"
              value={formData.charges}
                onChange={handleChange('charges')}
                onBlur={handleBlur}
              type="text"
              sx={{
                width: '100px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#1e3c72',
                    borderWidth: '2px'
                  },
                  '&:hover fieldset': {
                    borderColor: '#2a5298'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1e3c72'
                  }
                },
                '& input': {
                  fontSize: '1rem',
                  padding: '10px 14px',
                  textAlign: 'right'
                }
              }}
              InputProps={{
                startAdornment: (
                  <Typography sx={{ color: '#1e3c72', fontSize: '0.9rem', marginRight: '4px' }}>
                    Rs.
                  </Typography>
                )
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Print Button */}
      <ButtonPrint onClick={handlePrint} />
      {/* <PreviewButton onClick={handlePreview} formData={formData} /> */}
    
    </Box>
    <PrintLayout ref={componentRef}/>
    </>
  )
}   

export default React.memo(Inputs);