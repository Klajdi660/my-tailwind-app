import { useContext } from 'react';
import { FormListContext } from '../contexts/FormListContext';

export const useFormList = () => {
  const context = useContext(FormListContext);

  if (!context) throw new Error('useFormList must be used iniside FormListProvider');

  return context;
};
