import React from 'react';
import { TextField } from '@mui/material';

const FavoriteNumberInput = ({ favoriteNumber, setFavoriteNumber }) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      type="number"
      label="Favorite Number"
      value={favoriteNumber}
      onChange={(e) => setFavoriteNumber(Number(e.target.value))}
      InputProps={{
        inputProps: { min: 0 }
      }}
    />
  );
};

export default FavoriteNumberInput;