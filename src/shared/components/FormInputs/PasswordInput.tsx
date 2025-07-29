import React, { useState } from 'react';
import { InputProps } from '../../interfaces/FormInputInterface';

const PasswordInput: React.FC<InputProps> = ({ id, name, placeholder, defaultValue, errors, register }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='d-flex flex-row justify-content-between align-items-center gap-2'>
      <input type={showPassword ? 'text' : 'password'} id={id} defaultValue={defaultValue||''} {...register(name)} placeholder={placeholder} className={`form-control ${errors?.[name] ? 'is-invalid' : ''}`} />
      <div
        style={{ cursor: 'pointer' }}
        onClick={togglePasswordVisibility}
      >
        {showPassword ? 'hide' : 'show'}
      </div>
    </div>
  )
}
export default PasswordInput;