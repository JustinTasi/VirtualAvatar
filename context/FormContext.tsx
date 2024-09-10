import { createContext, useContext, useState } from 'react';

interface FormDataContextProps {
  formData: any;
  setFormData: (data: any) => void;
}

const FormDataContext = createContext<FormDataContextProps | undefined>(undefined);

export const FormDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState(null);

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => {
  const context = useContext(FormDataContext);

  if (!context) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
};