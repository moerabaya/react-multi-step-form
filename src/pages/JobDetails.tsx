import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormControl, InputLabel, Select, MenuItem, FormLabel, Radio, RadioGroup } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function JobDetails() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
					<FormControl fullWidth>
						<InputLabel id="department-label">Department</InputLabel>
						<Select
							labelId="department-label"
							id="department"
							// value={age}
							label="Department"
              // variant="standard"
							// onChange={handleChange}
						>
							<MenuItem value={"Engineering"}>Engineering</MenuItem>
							<MenuItem value={"Management"}>Management</MenuItem>
							<MenuItem value={"Product"}>Product</MenuItem>
						</Select>
					</FormControl>
				</Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="qualifications-group-label">Qualifications</FormLabel>
            <RadioGroup
              aria-labelledby="qualifications-group-label"
              defaultValue="bachelor"
              name="qualifications-buttons-group"
            >
              <FormControlLabel value="bachelor" control={<Radio />} label="Bachelor" />
              <FormControlLabel value="master" control={<Radio />} label="Master" />
              <FormControlLabel value="phd" control={<Radio />} label="Phd" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="workPermitId"
            label="Work Permit Id"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            label="Work Pemit Expiry Date"
            inputFormat="MM/DD/YYYY"
            value={"0"}
            onChange={() => {}}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}