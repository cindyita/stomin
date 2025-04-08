import { createContext, useState, ReactNode, useContext } from 'react';

interface ModalContextType {
  modalId: string | null;
  setModalId: (id: string | null) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalId, setModalId] = useState<string | null>(null);

  return (
    <ModalContext.Provider value={{ modalId, setModalId }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModalContext debe usarse dentro de ModalProvider');
  return context;
};