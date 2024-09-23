import React from 'react';
import DynamicForm from './components/DynamicForm/DynamicForm';
import { LoginFormDTO } from './dto/LoginFormDTO';
import { SignupFormDTO } from './dto/SignupFormDTO';

const App: React.FC = () => {
  return (
    <div>
      <DynamicForm formFields={LoginFormDTO.formFields} moduleName={'Login Form'} />
      <DynamicForm formFields={SignupFormDTO.formFields} moduleName={'User Management'} />
    </div>
  );
};

export default App;
