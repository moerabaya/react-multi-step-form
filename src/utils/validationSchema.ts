import { date, object, string } from 'yup';

const today = new Date();

// ✅ Reset a Date's time to midnight
today.setHours(0, 0, 0, 0);

export const generalSchema: any = {
  0: object({
    "nationalId": string().required("Nation ID is requried"),
    "firstName": string().required("First Name is requried"),
    "lastName": string().required("Last Name is requried"),
    "DOB": date().required("Date of Birth is requried").max(today, "Date cannot be in the future"),
    "gender": string().required("Gender is requried"),
    "maritalStatus": string().required("Marital Status is requried")
  }),
  1: object({
    "country": string().required("Country is requried"),
    "city": string().required("City is requried"),
    "address": string().required("Address is requried"),
    "phone": string().required("Phone is requried").matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Phone number is not valid'),
    "hireDate": date().required("Hire Date is requried"),
    "monthlySalary": string().required("Monthly Salary is requried")
  }),
  2: object({
    "department": string().required("Department is requried"),
    "qualifications": string().required("Qualifications is requried"),
    "workPermitId": string().required("Work Permit Id is requried"),
    "workPermitExpiryDate": date().required("Work Permit Expiry Date is requried").min(today, "Date cannot be in the past"),
    "employeePhoto": string().required("Employee Photo is requried")
  })
};