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
import { nextStep, previousStep, updateErrors } from '../state/actions';
import { object, string } from 'yup';
import CircularProgress from '@mui/material/CircularProgress';

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

let generalSchema: any = {
  0: object({
    nationalId: string().required(),
    firstName: string().required(),
    lastName: string().required(),
    DOB: string().required(),
    gender: string().required(),
    maritalStatus: string().required()
  }),
  1: object({
    country: string().required(),
    city: string().required(),
    address: string().required(),
    phone: string().required(),
    hireDate: string().required(),
    monthlySalary: string().required()
  }),
  2: object({
    department: string().required(),
    qualifications: string().required(),
    workPermitId: string().required(),
    workPermitExpiryDate: string().required()
  })
};

export default function Checkout() {
  const activeStep = useSelector((state: any) => state.formStep);
  const form = useSelector((state: any) => state.formData);
  const errors = useSelector((state: any) => state.formErrors);
  const [loading, setLoading] = React.useState(false);
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
      setLoading(true);
      setTimeout(() => {
        dispatch(nextStep());
        setLoading(false);
      }, 2000);
    }

    
    await generalSchema[activeStep].validate(form[activeStep], {abortEarly: false}).then(proceedStep).catch(errorHandling);
  }

  const handleNext = () => {
    onSubmit();
    // dispatch(nextStep())
  };

  const handleBack = () => {
    dispatch(previousStep());
  };

  return (
    <>
      <CssBaseline />
      {/* <pre>
        {JSON.stringify(errors, null, 2)}
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
                  Thank you for your creating an account.
                </Typography>
                <Typography variant="subtitle1">
                  Your account number is #2001539. We have emailed your
                  confirmation.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={loading}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {loading && <CircularProgress style={{marginRight: "1em"}} size={14} />}
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
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