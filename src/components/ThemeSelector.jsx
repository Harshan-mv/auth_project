import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const ThemeSelector = ({ theme, setTheme }) => {
  const themes = [
    { code: 'light', name: 'Light', color: '#ffffff', textColor: '#000000' },
    { code: 'brown', name: 'Brown', color: '#deb887', textColor: '#000000' },
    { code: 'blue', name: 'Blue', color: '#e3f2fd', textColor: '#000000' },
    { code: 'green', name: 'Green', color: '#e8f5e9', textColor: '#000000' }
  ];

  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>Theme</Typography>
      <Grid container spacing={2}>
        {themes.map((t) => (
          <Grid item xs={3} key={t.code}>
            <Box
              onClick={() => setTheme(t.code)}
              sx={{
                backgroundColor: t.color,
                color: t.textColor,
                border: theme === t.code ? '2px solid #1976d2' : '1px solid #e0e0e0',
                borderRadius: 1,
                p: 2,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.9,
                }
              }}
            >
              {t.name}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ThemeSelector;