import React, { useState, useEffect } from 'react';

const ComplexFormWithValidation = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    interests: [],
    subscribe: false,
  });

  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const validateFullName = (fullName) => {
    // Implement full name validation logic here
    return fullName ? '' : 'Full Name is required.';
  };

  const validateEmail = (email) => {
    // Implement email validation logic here
    return email ? '' : 'Email is required.';
  };

  const validatePassword = (password) => {
    // Implement password validation logic here
    return password.length >= 8 ? '' : 'Password must be at least 8 characters long.';
  };

  const validateConfirmPassword = (confirmPassword) => {
    // Implement confirm password validation logic here
    return confirmPassword === formData.password ? '' : 'Passwords do not match.';
  };

  const validateGender = (gender) => {
    // Implement gender validation logic here
    return gender ? '' : 'Please select a gender.';
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: fieldValue,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form fields
    const fullNameError = validateFullName(formData.fullName);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword);
    const genderError = validateGender(formData.gender);

    setFormErrors({
      fullName: fullNameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
      gender: genderError,
    });

    // Check if form is valid
    const isFormValid =
      !fullNameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      !genderError;

    if (isFormValid) {
      // Perform form submission logic here
      console.log('Form submitted:', formData);
    }
  };

  useEffect(() => {
    // Update validation on input change
    const fullNameError = validateFullName(formData.fullName);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword);
    const genderError = validateGender(formData.gender);

    setFormErrors({
      ...formErrors,
      fullName: fullNameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
      gender: genderError,
    });
  }, [formData]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        {formErrors.fullName && <span className="error">{formErrors.fullName}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {formErrors.email && <span className="error">{formErrors.email}</span>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {formErrors.password && <span className="error">{formErrors.password}</span>}
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {formErrors.confirmPassword && <span className="error">{formErrors.confirmPassword}</span>}
      </div>
      <div>
        <label>Gender:</label>
        <div>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === 'male'}
            onChange={handleChange}
          />
          <label>Male</label>
        </div>
        <div>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === 'female'}
            onChange={handleChange}
          />
          <label>Female</label>
        </div>
        {formErrors.gender && <span className="error">{formErrors.gender}</span>}
      </div>
      <div>
        <label>Interests:</label>
        <div>
          <input
            type="checkbox"
            name="interests"
            value="sports"
            checked={formData.interests.includes('sports')}
            onChange={handleChange}
          />
          <label>Sports</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="interests"
            value="music"
            checked={formData.interests.includes('music')}
            onChange={handleChange}
          />
          <label>Music</label>
        </div>
      </div>
      <div>
        <label>Subscribe to Newsletter:</label>
        <input
          type="checkbox"
          name="subscribe"
          checked={formData.subscribe}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ComplexFormWithValidation;