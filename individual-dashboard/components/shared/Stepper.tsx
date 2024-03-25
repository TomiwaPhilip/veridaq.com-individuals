import React from 'react';

interface StepperFormProps {
  id: string;
  currentStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
}

const StepperForm: React.FC<StepperFormProps> = ({ id, currentStep, onNextStep, onPrevStep }) => {
  let content = '';
  switch (id) {
    case '1':
      content = `Content for Card 1, Step ${currentStep + 1}`;
      break;
    case '2':
      content = `Content for Card 2, Step ${currentStep + 1}`;
      break;
    case '3':
      content = `Content for Card 3, Step ${currentStep + 1}`;
      break;
    case '4':
      content = `Content for Card 4, Step ${currentStep + 1}`;
      break;
    case '5':
      content = `Content for Card 5, Step ${currentStep + 1}`;
      break;
    default:
      content = '';
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Modal Stepper Form</h2>
      <p>{content}</p>
      <div className="flex justify-between mt-4">
        <button onClick={onPrevStep} disabled={currentStep === 0}>Previous</button>
        <button onClick={onNextStep}>Next</button>
      </div>
    </div>
  );
};

export default StepperForm;
