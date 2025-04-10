import { createContext, useState, ReactNode, useContext } from 'react';

interface ItemData {
  itemId: number | null;
  itemType: string | null;
}

interface ModalContextType {
  modalId: string | null;
  setModalId: (id: string | null) => void;
  itemData: ItemData;
  setItemData: (data: ItemData) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalId, setModalId] = useState<string | null>(null);
  const [itemData, setItemData] = useState<ItemData>({ itemId: null, itemType: null });

  return (
    <ModalContext.Provider value={{ modalId, setModalId, itemData, setItemData }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModalContext debe usarse dentro de ModalProvider');
  return context;
};