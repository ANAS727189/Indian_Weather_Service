'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type TempUnit = 'C' | 'F';

interface TemperatureContextType {
  unit: TempUnit;
  toggleUnit: () => void;
}

const TemperatureContext = createContext<TemperatureContextType | undefined>(undefined);

export const TemperatureProvider = ({ children }: { children: ReactNode }) => {
  const [unit, setUnit] = useState<TempUnit>('C');

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'C' ? 'F' : 'C'));
  };

  return (
    <TemperatureContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </TemperatureContext.Provider>
  );
};

export const useTemperature = () => {
  const context = useContext(TemperatureContext);
  if (!context) {
    throw new Error('useTemperature must be used within a TemperatureProvider');
  }
  return context;
};
