import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { MuiTelInput } from 'mui-tel-input';
import { useDispatch, useSelector } from 'react-redux';
import { updateForm } from '../state/actions';
import EmployeeInterface from 'multi-step-form';

const CURRENT_STEP = 1;
export default function PersonalForm() {
  const Cities: any = {
    "Jordan": ["Amman", "Irbid"],
    "UAE": ["AbuDhabi", "Dubai"],
    "KSA": ["Riyadh", "Jeddah"]
  }

  const dispatch = useDispatch();
  const form: EmployeeInterface = useSelector((state: any) => state.formData[CURRENT_STEP]);
  const errors = useSelector((state: any) => state.formErrors[CURRENT_STEP])

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    handleForm(name, value);
  }
  const handleForm = (name: string, value: any) => {
    dispatch(updateForm(CURRENT_STEP, name, value));
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Job Details
      </Typography>
      {/* <pre>
        {JSON.stringify(form, null, 2)}
      </pre> */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
					<FormControl fullWidth>
						<InputLabel id="country-label">Country of Residence</InputLabel>
						<Select
							labelId="country-label"
							id="country"
              name="country"
							value={form.country}
              error={errors.country ? true : false}
							label="Country of Residence"
							onChange={(e) => {
                handleForm("City", "");
                handleChange(e);
              }}
						>
							<MenuItem value={"Jordan"}>Jordan</MenuItem>
							<MenuItem value={"UAE"}>UAE</MenuItem>
							<MenuItem value={"KSA"}>KSA</MenuItem>
						</Select>
            {errors.country && <FormHelperText>{errors.country}</FormHelperText>}
					</FormControl>
				</Grid>
        <Grid item xs={12}>
					<FormControl fullWidth>
						<InputLabel id="city-label">City</InputLabel>
						<Select
							labelId="city-label"
							id="city"
              name="city"
							value={form.city}
              error={errors.city ? true : false}
							label="City"
							onChange={handleChange}
						>
              {form["country"] && Cities[form.country!].map((item: string) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
						</Select>
            {errors.city && <FormHelperText>{errors.city}</FormHelperText>}
					</FormControl>
				</Grid>
				<Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            value={form.address}
            error={errors.address ? true : false}
            helperText={errors.address}
            onChange={handleChange}
            fullWidth
            // variant="standard"
          />
        </Grid>

        <Grid item xs={12}>
          <MuiTelInput
          value={form.phone ? form.phone : form.country === "UAE" ? "+971" : form.country === "KSA" ? "+966" : "+962"}
          onChange={(data) => handleForm("phone", data)}
          error={errors.phone ? true : false}
          helperText={errors.phone}
          fullWidth
          onlyCountries={["JO", "AE", "SA"]}
           />
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            label="Hire Date"
            inputFormat="MM/DD/YYYY"
            value={form["hireDate"]}
            onChange={(value) => handleForm("hireDate", value?.toString())}
            renderInput={(params) => <TextField {...params} error={errors.hireDate ? true : false}
            helperText={errors["hireDate"]} fullWidth />}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="monthly-salary"
            name="monthlySalary"
            label="Monthly Salary"
            type="number"
            value={form.monthlySalary}
            error={errors.monthlySalary ? true : false}
            helperText={errors["monthlySalary"]}
            onChange={handleChange}
            fullWidth
            // variant="standard"
          />
        </Grid>
        
      </Grid>
    </React.Fragment>
  );
}