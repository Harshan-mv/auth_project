import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const LanguageSelector = ({ language, setLanguage }) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' }
  ];

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="language-select-label">Language</InputLabel>
      <Select
        labelId="language-select-label"
        id="language-select"
        value={language}
        label="Language"
        onChange={(e) => setLanguage(e.target.value)}
      >
        {languages.map((lang) => (
          <MenuItem key={lang.code} value={lang.code}>
            {lang.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;