import React from 'react';
import { Box, Typography, Button, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CookieConsent = ({ onAccept, onDecline }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: '90%',
          maxWidth: 600,
          p: 4,
          borderRadius: 2,
          position: 'relative'
        }}
      >
        {/* Close button in top-right corner */}
        <IconButton
          onClick={onDecline}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        
        <Typography variant="h5" gutterBottom align="center" sx={{ mb: 3 }}>
          Cookie Consent
        </Typography>
        
        <Typography variant="body1" paragraph align="center">
          This site uses cookies to enhance your experience and store your preferences like language, theme, and favorite number.
        </Typography>
        
        <Typography variant="body1" paragraph align="center">
          By accepting, you agree to our use of cookies. If you decline, your preferences won't be saved between sessions.
        </Typography>
        
        {/* Buttons at bottom middle */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 4,
          gap: 2
        }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={onDecline}
          >
            Decline
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onAccept}
          >
            Accept
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CookieConsent;