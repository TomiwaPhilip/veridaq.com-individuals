import React, { useState } from 'react';

interface WorkReferenceProps {
  onFormSubmit: () => void;
}

const WorkReference: React.FC<WorkReferenceProps> = ({ onFormSubmit }) => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (step === 4) {
      // If it's the last step, submit the form
      onFormSubmit();
    } else {
      // Otherwise, move to the next step
      handleNextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {step === 1 && (
        <div>
          <h2>Step 1</h2>
          <button type="button" onClick={handleNextStep}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2>Step 2</h2>
          <button type="button" onClick={handlePrevStep}>Previous</button>
          <button type="button" onClick={handleNextStep}>Next</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2>Step 3</h2>
          <button type="button" onClick={handlePrevStep}>Previous</button>
          <button type="button" onClick={handleNextStep}>Next</button>
        </div>
      )}
      {step === 4 && (
        <div>
          <h2>Step 4</h2>
          <button type="button" onClick={handlePrevStep}>Previous</button>
          <button type="submit">Submit</button>
        </div>
      )}
    </form>
  );
};

export default WorkReference;
