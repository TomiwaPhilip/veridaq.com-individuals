import React from 'react';
import WorkReference from '../form/workReference/workReference';

interface StepperFormProps {
  id: string;
  onNextStep: () => void;
}

const StepperForm: React.FC<StepperFormProps> = ({ id, onNextStep }) => {
  let content;
  let title;

  switch (id) {
    case '1':
      content = (
        <WorkReference
          onFormSubmit={onNextStep} // Submit the form when the last step is reached
        />
      );
      title = "Request Work Reference Veridaq"; // Change the title based on the id
      break;
    // Include cases for other card ids if needed
    default:
      content = null;
      title = "Modal Stepper Form";
  }

  return (
    <div>
      <h2 className="font-semibold text-[24px] px-8 pt-8">{title}</h2>
      {content}
    </div>
  );
};

export default StepperForm;
