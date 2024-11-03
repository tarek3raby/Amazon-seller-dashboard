import { useState, useContext } from 'react';
import { Stepper, Step, StepLabel, Button, TextField, Typography, Paper, Box, MenuItem } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { authContext } from '../Context/authentication';

const steps = ['Business Information', 'Seller Information', 'Billing'];

// Validation schemas for each step
const validationSchemas = [
  Yup.object().shape({
    businessName: Yup.string().required('Business Name is required'),
    businessNameArabic: Yup.string()
      .matches(/^[\u0600-\u06FF\s]+$/, 'Only Arabic characters are allowed')
      .required('Business Name in Arabic is required'),
    registrationNumber: Yup.string().required('Company Registration Number is required'),
    country: Yup.string().required('Country is required'),
    addressLine: Yup.string().required('Address Line is required'),
    governorate: Yup.string().required('Governorate is required'),
    phoneNumber: Yup.string().required('Phone Number for Verification is required'),
  }),
  Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    countryOfCitizenship: Yup.string().required('Country of Citizenship is required'),
    countryOfBirth: Yup.string().required('Country of Birth is required'),
    dateOfBirthDay: Yup.string().required('Day is required'),
    dateOfBirthMonth: Yup.string().required('Month is required'),
    dateOfBirthYear: Yup.string().required('Year is required'),
    identityProof: Yup.string().required('Identity Proof is required'),
    countryOfIssue: Yup.string().required('Country of Issue is required'),
    nationalIdOrPassport: Yup.string().required('National ID or Passport Number is required'),
  }),
  Yup.object().shape({
    cardNumber: Yup.string().required('Card Number is required'),
    expirationMonth: Yup.string().required('Expiration Month is required'),
    expirationYear: Yup.string().required('Expiration Year is required'),
    cardHolderName: Yup.string().required("Card Holder's Name is required"),
  }),
];

const countries = [
  'Egypt', 'Saudi Arabia', 'United Arab Emirates', 'Jordan', 'Kuwait', 
  'Bahrain', 'Oman', 'Qatar', 'Iraq', 'Lebanon'
];

const getStepContent = (step, values, handleChange, errors, touched) => {
  switch (step) {
    case 0:
      return (
        <>
          <Typography variant="h6" className="mb-2">Business Information</Typography>
          <TextField 
            label="Business name, used to register with your state or federal government" 
            fullWidth 
            margin="normal" 
            variant="outlined"
            name="businessName"
            value={values.businessName}
            onChange={handleChange}
            error={touched.businessName && Boolean(errors.businessName)}
            helperText={touched.businessName && errors.businessName}
          />
          <TextField 
            label="Business name in Arabic" 
            fullWidth 
            margin="normal" 
            variant="outlined"
            name="businessNameArabic"
            value={values.businessNameArabic}
            onChange={handleChange}
            error={touched.businessNameArabic && Boolean(errors.businessNameArabic)}
            helperText={touched.businessNameArabic && errors.businessNameArabic}
          />
          <TextField 
            label="Company Registration Number" 
            fullWidth 
            margin="normal" 
            variant="outlined"
            name="registrationNumber"
            value={values.registrationNumber}
            onChange={handleChange}
            error={touched.registrationNumber && Boolean(errors.registrationNumber)}
            helperText={touched.registrationNumber && errors.registrationNumber}
          />
          
          <Typography variant="subtitle1" className="mt-4">Registered Business Address:</Typography>
          <Box display="flex" flexDirection="row" flexWrap="wrap" margin={2}>
            <Box width={{ xs: '100%', sm: '50%' }} marginBottom={2}>
              <TextField 
                select 
                label="Country" 
                fullWidth 
                margin="normal"
                variant="outlined"
                name="country"
                value={values.country}
                onChange={handleChange}
                error={touched.country && Boolean(errors.country)}
                helperText={touched.country && errors.country}
              >
                <MenuItem value="Egypt">Egypt</MenuItem>
                {/* add more countries as needed */}
              </TextField>
            </Box>
            <Box width={{ xs: '100%', sm: '50%' }} marginBottom={2}>
              <TextField 
                label="Address Line" 
                fullWidth 
                margin="normal" 
                variant="outlined"
                name="addressLine"
                value={values.addressLine}
                onChange={handleChange}
                error={touched.addressLine && Boolean(errors.addressLine)}
                helperText={touched.addressLine && errors.addressLine}
              />
            </Box>
            <Box width={{ xs: '100%', sm: '50%' }} marginBottom={2}>
              <TextField 
                select 
                label="Governorate" 
                fullWidth 
                margin="normal"
                variant="outlined"
                name="governorate"
                value={values.governorate}
                onChange={handleChange}
                error={touched.governorate && Boolean(errors.governorate)}
                helperText={touched.governorate && errors.governorate}
              >
                {governorates.map((gov) => (
                  <MenuItem key={gov} value={gov}>{gov}</MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
          <TextField 
            label="Phone Number for Verification" 
            fullWidth 
            margin="normal" 
            variant="outlined"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            error={touched.phoneNumber && Boolean(errors.phoneNumber)}
            helperText={touched.phoneNumber && errors.phoneNumber}
          />
        </>
      );
    case 1:
      return (
        <>
          <Typography variant="h6" className="mb-2">Primary Contact Person Information</Typography>
          <Box mb={2}>
            <TextField 
              label="Full Name" 
              fullWidth 
              name="fullName" 
              value={values.fullName} 
              onChange={handleChange}
              error={touched.fullName && Boolean(errors.fullName)}
              helperText={touched.fullName && errors.fullName}
            />
          </Box>
          <Box mb={2}>
            <TextField 
              select 
              label="Country of Citizenship" 
              fullWidth 
              name="countryOfCitizenship" 
              value={values.countryOfCitizenship} 
              onChange={handleChange}
              error={touched.countryOfCitizenship && Boolean(errors.countryOfCitizenship)}
              helperText={touched.countryOfCitizenship && errors.countryOfCitizenship}
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>{country}</MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mb={2}>
            <TextField 
              select 
              label="Country of Birth" 
              fullWidth 
              name="countryOfBirth" 
              value={values.countryOfBirth} 
              onChange={handleChange}
              error={touched.countryOfBirth && Boolean(errors.countryOfBirth)}
              helperText={touched.countryOfBirth && errors.countryOfBirth}
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>{country}</MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mb={2}>
            <Typography variant="body1">Date of Birth</Typography>
            <Box display="flex" marginBottom={2}>
              <TextField 
                select 
                label="Day" 
                name="dateOfBirthDay" 
                value={values.dateOfBirthDay || ''} 
                onChange={handleChange}
                error={touched.dateOfBirthDay && Boolean(errors.dateOfBirthDay)}
                helperText={touched.dateOfBirthDay && errors.dateOfBirthDay}
                sx={{ mr: 2, width: '100px' }} 
                InputProps={{ style: { height: '47px', padding: '0 10px' } }} 
              >
                {[...Array(31)].map((_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
                ))}
              </TextField>
              <TextField 
                select 
                label="Month" 
                name="dateOfBirthMonth" 
                value={values.dateOfBirthMonth || ''} 
                onChange={handleChange}
                error={touched.dateOfBirthMonth && Boolean(errors.dateOfBirthMonth)}
                helperText={touched.dateOfBirthMonth && errors.dateOfBirthMonth}
                sx={{ mr: 2, width: '100px' }} 
                InputProps={{ style: { height: '47px', padding: '0 10px' } }} 
              >
                {[...Array(12)].map((_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
                ))}
              </TextField>
              <TextField 
                select 
                label="Year" 
                name="dateOfBirthYear" 
                value={values.dateOfBirthYear || ''} 
                onChange={handleChange}
                error={touched.dateOfBirthYear && Boolean(errors.dateOfBirthYear)}
                helperText={touched.dateOfBirthYear && errors.dateOfBirthYear}
                sx={{ width: '110px' }} 
                InputProps={{ style: { height: '47px', padding: '0 10px' } }}
              >
                {[...Array(47)].map((_, i) => (
                  <MenuItem key={2006 - i} value={2006 - i}>{2006 - i}</MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
          <Box mb={2}>
            <TextField 
              select 
              label="Identity Proof" 
              fullWidth 
              name="identityProof" 
              value={values.identityProof} 
              onChange={handleChange}
              error={touched.identityProof && Boolean(errors.identityProof)}
              helperText={touched.identityProof && errors.identityProof}
            >
              <MenuItem value="Passport">Passport</MenuItem>
              <MenuItem value="National ID">National ID</MenuItem>
              {/* Add more identity proofs as needed */}
            </TextField>
          </Box>
          <Box mb={2}>
            <TextField 
              select 
              label="Country of Issue" 
              fullWidth 
              name="countryOfIssue" 
              value={values.countryOfIssue} 
              onChange={handleChange}
              error={touched.countryOfIssue && Boolean(errors.countryOfIssue)}
              helperText={touched.countryOfIssue && errors.countryOfIssue}
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>{country}</MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mb={2}>
            <TextField 
              label="National ID or Passport Number" 
              fullWidth 
              name="nationalIdOrPassport" 
              value={values.nationalIdOrPassport} 
              onChange={handleChange}
              error={touched.nationalIdOrPassport && Boolean(errors.nationalIdOrPassport)}
              helperText={touched.nationalIdOrPassport && errors.nationalIdOrPassport}
            />
          </Box>
        </>
      );
    case 2:
      return (
        <>
          <Typography variant="h6" className="mb-2">Payment Information</Typography>
          <Box mb={2}>
            <TextField 
              label="Card Number" 
              fullWidth 
              name="cardNumber" 
              value={values.cardNumber} 
              onChange={handleChange}
              error={touched.cardNumber && Boolean(errors.cardNumber)}
              helperText={touched.cardNumber && errors.cardNumber}
            />
          </Box>
          <Box  marginBottom={2}>
            <TextField 
              select 
              label="Expiration Month" 
              name="expirationMonth" 
              value={values.expirationMonth || ''} 
              onChange={handleChange}
              error={touched.expirationMonth && Boolean(errors.expirationMonth)}
              helperText={touched.expirationMonth && errors.expirationMonth}
              sx={{ mr: 2, width: '180px' }}
            >
              {[...Array(12)].map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
              ))}
            </TextField>
            <TextField 
              select 
              label="Expiration Year" 
              name="expirationYear" 
              value={values.expirationYear || ''} 
              onChange={handleChange}
              error={touched.expirationYear && Boolean(errors.expirationYear)}
              helperText={touched.expirationYear && errors.expirationYear}
              sx={{ width: '180px' }}
            >
              {[...Array(10)].map((_, i) => (
                <MenuItem key={2023 + i} value={2023 + i}>{2023 + i}</MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mb={2}>
            <TextField 
              label="Card Holder's Name" 
              fullWidth 
              name="cardHolderName" 
              value={values.cardHolderName} 
              onChange={handleChange}
              error={touched.cardHolderName && Boolean(errors.cardHolderName)}
              helperText={touched.cardHolderName && errors.cardHolderName}
            />
          </Box>
        </>
      );
    default:
      return 'Unknown step';
  }
};

const governorates = [
  'Cairo', 'Alexandria', 'Giza', 'Qalyubia', 'Dakahlia', 
  'Sharqia', 'Gharbia', 'Monufia', 'Kafr El Sheikh', 
  'Damietta', 'Port Said', 'Suez', 'Ismailia', 'Faiyum', 
  'Beni Suef', 'Minya', 'Assiut', 'Sohag', 'Qena', 
  'Luxor', 'Aswan', 'Red Sea', 'Matrouh', 'North Sinai', 
  'South Sinai', 'New Valley', 'Ain Sokhna'
];

export default function SellerRegister() {
  const { token } = useContext(authContext);
  
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (values) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    // Combine date of birth fields into a single field
    const { dateOfBirthDay, dateOfBirthMonth, dateOfBirthYear, expirationMonth, expirationYear, ...rest } = values;
    const birthDate = `${dateOfBirthYear}-${String(dateOfBirthMonth).padStart(2, '0')}-${String(dateOfBirthDay).padStart(2, '0')}`;
    const expirationDate = `${String(expirationYear)}-${String(expirationMonth).padStart(2, '0')}-01`; 

    // Prepare the data to send to the backend
    const dataToSend = {
      ...rest,
      dateOfBirth: birthDate, // Add the combined birth date
      expirationDate: expirationDate, // Add the combined expiration date
    };

    // Handle form submission to API 
    try {
      const { data } = await axios.post('https://ahmed-sabry-ffbbe964.koyeb.app/sellers/register', dataToSend, {
        headers: {
          Authorization: `${token}`
        }      
      });
      if (data.status === "pending") {
        alert('Your application is pending approval from the admin. Please wait.');
      }
    } catch (error) {
      console.error("Error during registration:", error.response ? error.response.data : error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        businessName: '',
        businessNameArabic: '',
        registrationNumber: '',
        country: 'Egypt',
        addressLine: '',
        governorate: '',
        phoneNumber: '',
        fullName: '',
        countryOfCitizenship: '',
        countryOfBirth: '',
        dateOfBirthDay: '',
        dateOfBirthMonth: '',
        dateOfBirthYear: '',
        identityProof: '',
        countryOfIssue: '',
        nationalIdOrPassport: '',
        cardNumber: '',
        expirationMonth: '',
        expirationYear: '',
        cardHolderName: '',
      }}
      validationSchema={validationSchemas[activeStep]} 
      validateOnChange={true} // Validate on change
      validateOnBlur={true} // Validate on blur
      onSubmit={(values, { setSubmitting }) => {
        // Check if all fields across all steps are filled
        const allFieldsFilled = Object.values(values).every(value => value !== '');
        if (allFieldsFilled) {
          handleSubmit(values);
        } else {
          alert('Please fill in all fields before submitting.');
        }
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, errors, touched, isValid }) => {
        return (
          <Form>
            <div className="flex items-start justify-center h-screen bg-gray-100">
              <Paper elevation={3} className="p-6 w-full max-w-4xl mx-auto mt-4">
                <Typography variant="h5" className="mb-4">
                  Become A Seller Now
                </Typography>
                <Stepper activeStep={activeStep} className="mb-4">
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <div>{getStepContent(activeStep, values, handleChange, errors, touched)}</div>
                <div className="flex justify-between mt-4">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    type="button"
                    disabled={activeStep === 2} // Disable the Next button in the third step
                  >
                    Next
                  </Button>
                </div>
                {activeStep === steps.length - 1 && ( // Show submit button on the last step
                  <div className="flex justify-center mt-4">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit" // Submit button for the final step
                      disabled={!isValid || isSubmitting} // Disable if there are validation errors or if submitting
                    >
                      Submit
                    </Button>
                  </div>
                )}
              </Paper>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}


