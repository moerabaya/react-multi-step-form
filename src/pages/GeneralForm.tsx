import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormControl, FormLabel, RadioGroup, Radio } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function GeneralForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        General Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="nationalId"
            name="nationalId"
            label="National ID"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        
        <Grid item xs={12}>
          <DatePicker
            label="Date of Birth"
            inputFormat="MM/DD/YYYY"
            value={"0"}
            onChange={() => {}}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="gender-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="gender-radio-buttons-group-label"
              defaultValue="male"
              name="gender-radio-buttons-group"
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="status-radio-buttons-group-label">Marital Status</FormLabel>
            <RadioGroup
              aria-labelledby="status-radio-buttons-group-label"
              defaultValue="single"
              name="status-radio-buttons-group"
            >
              <FormControlLabel value="single" control={<Radio />} label="Single" />
              <FormControlLabel value="married" control={<Radio />} label="Married" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}