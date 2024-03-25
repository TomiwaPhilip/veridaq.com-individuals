"use client";

import React, { useState } from 'react';
import StepperForm from './Stepper';

interface ModalWithStepperProps {
  id: string;
  onClose: () => void;
}

const ModalWithStepper: React.FC<ModalWithStepperProps> = ({ id, onClose }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-lg normal-border" onClick={(e) => e.stopPropagation()}>
          <StepperForm id={id} onNextStep={handleNextStep} />
      </div>
    </div>
  );
};

export default ModalWithStepper;
