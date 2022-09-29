import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormControl, InputLabel, Select, MenuItem, FormLabel, Radio, RadioGroup, FormHelperText } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux';
import { updateForm } from '../state/actions';

const CURRENT_STEP = 2;
export default function JobDetails() {
  const dispatch = useDispatch();
  const form = useSelector((state: any) => state.formData[CURRENT_STEP]);
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
        Personal Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
					<FormControl fullWidth>
						<InputLabel id="department-label">Department</InputLabel>
						<Select
							labelId="department-label"
							id="department"
							value={form.department}
							label="Department"
              error={errors.department}
              // variant="standard"
              name="department"
							onChange={handleChange}
						>
							<MenuItem value={"Engineering"}>Engineering</MenuItem>
							<MenuItem value={"Management"}>Management</MenuItem>
							<MenuItem value={"Product"}>Product</MenuItem>
						</Select>
            {errors["department"] && <FormHelperText>{errors["department"]}</FormHelperText>}
					</FormControl>
				</Grid>
        <Grid item xs={12}>
          <FormControl error={errors.qualifications}>
            <FormLabel id="qualifications-group-label">Qualifications</FormLabel>
            <RadioGroup
              aria-labelledby="qualifications-group-label"
              defaultValue={form.qualifications}
              name="qualifications"
              onChange={handleChange}
            >
              <FormControlLabel value="bachelor" control={<Radio />} label="Bachelor" />
              <FormControlLabel value="master" control={<Radio />} label="Master" />
              <FormControlLabel value="phd" control={<Radio />} label="Phd" />
            </RadioGroup>
            {errors["qualifications"] && <FormHelperText>{errors["qualifications"]}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="workPermitId"
            error={errors.workPermitId}
            helperText={errors.workPermitId}
            name="workPermitId"
            onChange={handleChange}
            label="Work Permit Id"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            label="Work Permit Expiry Date"
            inputFormat="MM/DD/YYYY"
            value={form.workPermitExpiryDate}
            onChange={(value) => handleForm("workPermitExpiryDate", value?.toString())}
            renderInput={(params) => <TextField {...params} error={errors.workPermitExpiryDate}
            helperText={errors.workPermitExpiryDate} fullWidth />}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}