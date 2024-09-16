import React from 'react';
import DynamicForm from './components/DynamicForm/DynamicForm';
import { MyFormDTO } from './dto/MyFormDTO';

const App: React.FC = () => {
  return (
    <div>
      <h1>Dynamic Form with Decorators</h1>
      <DynamicForm dtoClass={MyFormDTO} />
    </div>
  );
};

export default App;
