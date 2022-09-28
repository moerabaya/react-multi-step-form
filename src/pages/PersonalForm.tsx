import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { MuiTelInput } from 'mui-tel-input';

export default function PersonalForm() {
  const [form, setForm] = React.useState({
    country: ""
  });
  const Cities = {
    "Jordan": ["Amman", "Irbid"],
    "UAE": ["AbuDhabi", "Dubai"],
    "KSA": ["Riyadh", "Jeddah"]
  }

  const handleChange = (e: any) => {
    const {value, name} = e.target;
    setForm({
      ...form,
      [name]: value
    })
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Job Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
					<FormControl fullWidth>
						<InputLabel id="country-label">Country of Residence</InputLabel>
						<Select
							labelId="country-label"
							id="country"
              name="country"
							value={form.country}
							label="Country of Residence"
              // variant="standard"
							onChange={handleChange}
						>
							<MenuItem value={"Jordan"}>Jordan</MenuItem>
							<MenuItem value={"UAE"}>UAE</MenuItem>
							<MenuItem value={"KSA"}>KSA</MenuItem>
						</Select>
					</FormControl>
				</Grid>
        <Grid item xs={12}>
					<FormControl fullWidth>
						<InputLabel id="country-label">City</InputLabel>
						<Select
							labelId="country-label"
							id="country"
							// value={age}
              // vari`fant="standard"
							label="Country of Residence"
							// onChange={handleChange}
						>
              {Cities.Jordan?.map((item: string) => <MenuItem value={item}>{item}</MenuItem>)}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            // variant="standard"
          />
        </Grid>

        <Grid item xs={12}>
          <MuiTelInput
          value={"+962"}
          onChange={() => {}}
          fullWidth
          onlyCountries={["JO", "AE", "SA"]}
           />
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            label="Hire Date"
            inputFormat="MM/DD/YYYY"
            value={"0"}
            onChange={() => {}}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="monthly-salary"
            name="monthly-salary"
            label="Monthly Salary"
            type="number"
            fullWidth
            // variant="standard"
          />
        </Grid>
        
      </Grid>
    </React.Fragment>
  );
}