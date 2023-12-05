import * as Yup from 'yup'; 

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

const registerSchema = Yup.object().shape({
  fullName:Yup.string().required('Full Name is required'),
  username: Yup.string().min(3, 'Password must meet the requirements! Username must be at leat 3 simvols').required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().matches(passwordRegex, 'Password must meet the requirements').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Password must meet the requirements'),
  isPublic: Yup.boolean().required('Please specify the visibility of your account'),
});

export default registerSchema