import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Modal, 
  Typography, 
  Paper,
  Grid as MuiGrid,
  Divider,
  IconButton
} from '@mui/material';
import { 
  Preview as PreviewIcon,
  Close as CloseIcon,
  DirectionsCar as CarIcon,
  AccessTime as TimeIcon,
  Scale as ScaleIcon,
  LocalShipping as ShippingIcon,
  Payment as PaymentIcon,
  Print as PrintIcon
} from '@mui/icons-material';
import PrintLayout from './PrintLayout';

// Create a styled Grid component with div as the default component
const Grid = (props) => <MuiGrid component="div" {...props} />;

const PreviewButton = ({ onClick, formData }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    if (onClick) onClick();
  };

  const handleClose = () => setOpen(false);

  const handlePrint = () => {
    // Close the modal before printing
    setOpen(false);
    // Add a small delay to ensure modal is closed
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return '-';
    return new Date(dateTimeStr).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  const DataRow = ({ icon, label, value, color = '#1e3c72' }) => (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 2, 
      mb: 2,
      py: 1,
      px: 2,
      backgroundColor: 'rgba(30, 60, 114, 0.03)',
      borderRadius: '8px',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: 'rgba(30, 60, 114, 0.06)',
        transform: 'translateX(4px)'
      },
      '@media print': {
        display: 'none'
      }
    }}>
      {React.cloneElement(icon, { sx: { color } })}
      <Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
          {label}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500, color }}>
          {value || '-'}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Print Layout - Hidden by default, only shown when printing */}
  

      {/* Preview Button */}
      <Box sx={{ 
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        mt: 2,
        '@media print': {
          display: 'none'
        }
      }}>
        <Button
          variant="outlined"
          startIcon={<PreviewIcon />}
          onClick={handleOpen}
          sx={{
            width: '100%',
            color: '#006838',
            borderColor: '#006838',
            borderWidth: '2px',
            padding: '10px 30px',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(5px)',
            boxShadow: '0 2px 8px rgba(0, 104, 56, 0.1)',
            '&:hover': {
              borderColor: '#008d4c',
              borderWidth: '2px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 4px 12px rgba(0, 104, 56, 0.2)',
              transform: 'translateY(-1px)',
              color: '#008d4c'
            },
            '&:active': {
              transform: 'translateY(0)',
            },
            transition: 'all 0.2s ease'
          }}
        >
          Preview Details
        </Button>
      </Box>

      {/* Preview Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="preview-modal"
        aria-describedby="preview-form-details"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          '@media print': {
            display: 'none !important'
          }
        }}
      >
        <Paper
          elevation={24}
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflowY: 'auto',
            bgcolor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            border: '2px solid rgba(0, 104, 56, 0.1)',
            '@media print': {
              display: 'none !important'
            }
          }}
        >
          {/* Header */}
          <Box sx={{ 
            p: 3, 
            borderBottom: '1px solid rgba(0, 104, 56, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant="h5" sx={{ 
              color: '#006838',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <PreviewIcon /> Preview Details
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                onClick={handlePrint}
                sx={{ 
                  color: '#006838',
                  '&:hover': { 
                    backgroundColor: 'rgba(0, 104, 56, 0.1)' 
                  }
                }}
              >
                <PrintIcon />
              </IconButton>
              <IconButton 
                onClick={handleClose}
                sx={{ 
                  color: '#006838',
                  '&:hover': { 
                    backgroundColor: 'rgba(0, 104, 56, 0.1)' 
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Content */}
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {/* Vehicle Information */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ 
                  color: '#1e3c72', 
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <CarIcon /> Vehicle Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <DataRow 
                      icon={<CarIcon />}
                      label="Registration Code"
                      value={formData.vehicleCode}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DataRow 
                      icon={<CarIcon />}
                      label="Vehicle Number"
                      value={formData.vehicleNumber}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DataRow 
                      icon={<ShippingIcon />}
                      label="Driver Status"
                      value={formData.driverStatus}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              {/* Time Information */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ 
                  color: '#1e3c72', 
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <TimeIcon /> Time Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <DataRow 
                      icon={<TimeIcon />}
                      label="Time In"
                      value={formatDateTime(formData.timeIn)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DataRow 
                      icon={<TimeIcon />}
                      label="Time Out"
                      value={formatDateTime(formData.timeOut)}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              {/* Weight Information */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ 
                  color: '#1e3c72', 
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <ScaleIcon /> Weight Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <DataRow 
                      icon={<ScaleIcon />}
                      label="Weight 1"
                      value={formData.weight1 ? `${formData.weight1} kg` : '-'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <DataRow 
                      icon={<ScaleIcon />}
                      label="Weight 2"
                      value={formData.weight2 ? `${formData.weight2} kg` : '-'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <DataRow 
                      icon={<ScaleIcon />}
                      label="Net Weight"
                      value={formData.netWeight ? `${formData.netWeight} kg` : '-'}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              {/* Additional Information */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ 
                  color: '#1e3c72', 
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <PaymentIcon /> Additional Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <DataRow 
                      icon={<ShippingIcon />}
                      label="Bags"
                      value={formData.bags}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DataRow 
                      icon={<PaymentIcon />}
                      label="Charges"
                      value={formData.charges ? `Rs. ${formData.charges}` : '-'}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};

export default PreviewButton; 