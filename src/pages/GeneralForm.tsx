import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControl, FormLabel, RadioGroup, Radio, FormHelperText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { forwardRef } from 'react';
import { updateForm } from '../state/actions';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeInterface from 'multi-step-form';

const CURRENT_STEP = 0;
const GeneralForm = forwardRef((props, ref) => {
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
        General Information
      </Typography>
      {/* <pre>
        {JSON.stringify(form, null, 2)}
      </pre> */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            error={errors.nationalId}
            helperText={errors.nationalId}
            value={form.nationalId}
            id="nationalId"
            name="nationalId"
            label="National ID"
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            error={errors.firstName}
            helperText={errors.firstName}
            value={form.firstName}
            id="firstName"
            name="firstName"
            label="First name"
            onChange={handleChange}
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            error={errors.lastName}
            helperText={errors.lastName}
            value={form.lastName}
            id="lastName"
            name="lastName"
            label="Last name"
            onChange={handleChange}
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        
        <Grid item xs={12}>
          <DatePicker
            label="Date of Birth"
            inputFormat="MM/DD/YYYY"
            value={form.DOB}
            maxDate={new Date()}
            onChange={(value) => handleForm("DOB", value?.toString())}
            renderInput={(params) => <TextField {...params} error={errors.DOB} helperText={errors.DOB} fullWidth />}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl error={errors.gender}>
            <FormLabel id="gender-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="gender-radio-buttons-group-label"
              defaultValue={form.gender}
              name="gender"
              onChange={handleChange}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
            </RadioGroup>
            {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl error={errors.maritalStatus}>
            <FormLabel id="status-radio-buttons-group-label">Marital Status</FormLabel>
            <RadioGroup
              aria-labelledby="status-radio-buttons-group-label"
              defaultValue={form.maritalStatus}
              name="maritalStatus"
              onChange={handleChange}
            >
              <FormControlLabel value="single" control={<Radio />} label="Single" />
              <FormControlLabel value="married" control={<Radio />} label="Married" />
            </RadioGroup>
            {errors.maritalStatus && <FormHelperText>{errors.maritalStatus}</FormHelperText>}
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
});

export default GeneralForm;