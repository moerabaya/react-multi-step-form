import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GeneralForm from './GeneralForm';
import PersonalForm from './PersonalForm';
import JobDetails from './JobDetails';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee, nextStep, previousStep, updateErrors } from '../state/actions';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Avatar, Grid } from '@mui/material';
import { generalSchema } from '../utils/validationSchema';
import { EmployeeEnum } from '../utils/constant';
import EmployeeInterface from 'multi-step-form';
import _ from 'lodash';

const steps = ['General Information', 'Personal Details', 'Job Details'];

function getStepContent(step: number) {
  
  switch (step) {
    case 0:
      return <GeneralForm />;
    case 1:
      return <PersonalForm />;
    case 2:
      return <JobDetails />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const activeStep = useSelector((state: any) => state.formStep);
  const form: EmployeeInterface[] = useSelector((state: any) => state.formData);
  const employee = useSelector((state: any) => state.employee);
  const dispatch = useDispatch();
  
  const onSubmit = async () => {
    const errorHandling = (errors: any)  => {
			let formErrorsList: any = {};
			if(errors.inner) {
				errors.inner.map((error: any) => {
					if(!formErrorsList[error.path])
						formErrorsList[error.path] = error.message;
				});
				dispatch(updateErrors(activeStep, formErrorsList));
			}
		};
    const proceedStep = (data: any) => {
      dispatch(updateErrors(activeStep, {}));
      if(activeStep === 2) {
        const result = _.reduce(form, function(memo, current) { return _.assign(memo, current) },  {});
        dispatch(createEmployee(result));
      } else {
        dispatch(nextStep());
      }
    }
    await generalSchema[activeStep].validate(form[activeStep], {abortEarly: false}).then(proceedStep).catch(errorHandling);
  }

  const handleNext = () => {
    onSubmit();
  };

  const handleBack = () => {
    dispatch(previousStep());
  };

  const renderBlocks = () => {
    const list: React.ReactNode[] = [];
    Object.keys(employee?.employee).forEach(function(key, index) {
      const i: keyof typeof EmployeeEnum = key as keyof typeof EmployeeEnum;
      list.push(
        <Grid key={index} container>
          <Grid item xs={4} p={1}>
            <strong>{EmployeeEnum[i]}</strong>
          </Grid>
          <Grid item xs={8} p={1}>
            {employee?.employee[key]}
          </Grid>
        </Grid>
      )
    });
    return list;
  };

  return (
    <>
      <CssBaseline />
      {/* <pre>
        {JSON.stringify(employee, null, 2)}
      </pre> */}
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Add Employee
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Employee Information
                </Typography>
                <Grid container justifyContent="center">
                  <Grid item p={4}>
                    {employee?.employee.employeePhoto && <Avatar src={employee?.employee.employeePhoto}  sx={{ height: '90px', width: '90px' }} />}
                  </Grid>
                  {renderBlocks()}
                </Grid>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                {employee.failed && 
                  <Box pt={3}>
                    <Alert severity="error">Something went wrong, please try again.</Alert>
                  </Box>
                }
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={employee.loading}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {employee.loading && <CircularProgress style={{marginRight: "1em"}} size={14} />}
                    {activeStep === steps.length - 1 ? 'Creates' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </LocalizationProvider>
        </Paper>
      </Container>
    </>
  );
}