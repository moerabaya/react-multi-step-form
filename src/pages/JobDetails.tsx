import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormControl, InputLabel, Select, MenuItem, FormLabel, Radio, RadioGroup, FormHelperText, Avatar } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux';
import { updateForm } from '../state/actions';
import FileUpload from '../components/FileUpload';
import EmployeeInterface from 'multi-step-form';

const CURRENT_STEP = 2;
export default function JobDetails() {
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
        Personal Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
					<FormControl fullWidth>
						<InputLabel id="department-label">Department</InputLabel>
						<Select
							labelId="department-label"
							id="department"
							value={form["department"]}
							label="Department"
              error={errors["department"]}
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
          <FormControl error={errors["qualifications"]}>
            <FormLabel id="qualifications-group-label">Qualifications</FormLabel>
            <RadioGroup
              aria-labelledby="qualifications-group-label"
              defaultValue={form["qualifications"]}
              name="qualifications"
              onChange={handleChange}
            >
              <FormControlLabel value="Bachelor" control={<Radio />} label="Bachelor" />
              <FormControlLabel value="Master" control={<Radio />} label="Master" />
              <FormControlLabel value="Phd" control={<Radio />} label="Phd" />
            </RadioGroup>
            {errors["qualifications"] && <FormHelperText>{errors["qualifications"]}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="workPermitId"
            error={errors["workPermitId"]}
            helperText={errors["workPermitId"]}
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
            minDate={new Date()}
            value={form["workPermitExpiryDate"]}
            onChange={(value) => handleForm("workPermitExpiryDate", value?.toString())}
            renderInput={(params) => <TextField {...params} error={errors["workPermitExpiryDate"]}
            helperText={errors["workPermitExpiryDate"]} fullWidth />}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl error={errors["employeePhoto"]} fullWidth>
            <FormLabel id="qualifications-group-label">Employee Photo</FormLabel>
            <FileUpload onChange={(value) => handleForm("employeePhoto", value)} />
            {errors["employeePhoto"] && <FormHelperText>{errors["employeePhoto"]}</FormHelperText>}
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}