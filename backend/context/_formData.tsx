import React, { createContext, useContext, useState, ReactNode } from 'react';
import { itemPintu, itemJendela } from '@/app/input/step4';
import { itemLampu, itemPeralatan } from '@/app/input/step5';

export type FormData = {
  // Step 1
  kota?: string;
  panjang?: number;
  lebar?: number;
  tinggi?: number;
  arah?: string;

  // Step 2
  atap?: string;
  strukturAtap?: string;
  langit?: string;
  dinding?: string;
  lantai?: string;

  // Step 3
  jenisRuang?: string;
  jumlahPenghuni?: number;

  // Step 4
  pintu?: string;
  pintuList?: itemPintu[];
  jendela?: string;
  jendelaList?: itemJendela[];

  // Step 5
  jumlahLampu?: string;
  lampuList?: itemLampu[];
  jumlahPeralatan?: string;
  peralatanList?: itemPeralatan[];
};

const FormContext = createContext<any>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormDataState] = useState<FormData>({});

  const setFormData = (data: Partial<FormData>) => {
    setFormDataState((prev) => ({ ...prev, ...data }));
  };

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};
