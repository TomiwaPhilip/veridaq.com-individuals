import React from 'react';
import WorkReference from '../form/workReference/workReference';

interface StepperFormProps {
  id: string;
  onNextStep: () => void;
}

const StepperForm: React.FC<StepperFormProps> = ({ id, onNextStep }) => {
  let content;

  switch (id) {
    case '1':
      content = (
        <WorkReference
          onFormSubmit={onNextStep} // Submit the form when the last step is reached
        />
      );
      break;
    // Include cases for other card ids if needed
    default:
      content = null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Modal Stepper Form</h2>
      {content}
    </div>
  );
};

export default StepperForm;
