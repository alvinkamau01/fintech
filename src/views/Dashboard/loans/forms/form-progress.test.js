import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import FormProgress from './form-progress';

describe('FormProgress Component', () => {
  const testSteps = [
    { id: 1, title: 'Personal Info', description: 'Basic details' },
    { id: 2, title: 'Loan Details', description: 'Loan information' },
    { id: 3, title: 'Review', description: 'Final review' }
  ];

  const renderWithChakra = (ui) => {
    return render(
      <ChakraProvider>{ui}</ChakraProvider>
    );
  };

  it('renders step titles', () => {
    renderWithChakra(<FormProgress steps={testSteps} currentStep={1} />);
    
    expect(screen.getByText('Personal Info')).toBeInTheDocument();
    expect(screen.getByText('Loan Details')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
  });

  it('renders step descriptions', () => {
    renderWithChakra(<FormProgress steps={testSteps} currentStep={1} />);
    
    expect(screen.getByText('Basic details')).toBeInTheDocument();
    expect(screen.getByText('Loan information')).toBeInTheDocument();
    expect(screen.getByText('Final review')).toBeInTheDocument();
  });

  it('shows check icon for completed steps', () => {
    renderWithChakra(<FormProgress steps={testSteps} currentStep={2} />);
    
    // First step should be completed and show check icon
    const checkIcons = screen.getAllByTestId('check-icon');
    expect(checkIcons).toHaveLength(1);
    
    // Second step (current) and third step should show numbers
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
