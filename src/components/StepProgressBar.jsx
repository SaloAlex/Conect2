import React, { useState } from 'react';

const StepProgressBar = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  const handleNextStep = () => {
    const nextStep = currentStep < 4 ? currentStep + 1 : currentStep;
    setCurrentStep(nextStep);
  };

  const handlePrevStep = () => {
    const prevStep = currentStep > 1 ? currentStep - 1 : currentStep;
    setCurrentStep(prevStep);
  };

  return (
    <div className="flex items-center justify-center mt-8">
      {/* Botón para ir hacia atrás */}
      <button
        onClick={handlePrevStep}
        className="mr-4 bg-gray-300 px-3 py-1 rounded-full"
      >
        ←Prev
      </button>

      {/* Barra de pasos */}
      <div className="flex space-x-8">
        {[1, 2, 3, 4].map((stepNumber) => (
          <div
            key={stepNumber}
            onClick={() => handleStepChange(stepNumber)}
            className={`w-8 h-8 flex items-center justify-center rounded-full bg-blue-800 text-white cursor-pointer ${
              currentStep >= stepNumber ? "bg-blue-800" : "bg-gray-300"
            }`}
          >
            {stepNumber}
          </div>
        ))}
      </div>

      {/* Botón para ir hacia adelante */}
      <button
        onClick={handleNextStep}
        className="ml-4 bg-blue-800 hover:bg-blue-700 px-3 py-1 rounded-full text-white"
      >
        Next→
      </button>

      {/* Número de paso actual */}
      <div className="ml-4 text-xl font-bold">{currentStep}</div>
    </div>
  );
};

export default StepProgressBar;
