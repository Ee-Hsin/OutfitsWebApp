// Create a context file (e.g., ClosetContext.js)
import { createContext, useContext, useState } from 'react';

const ClosetContext = createContext();

const ClosetProvider = ({ children }) => {
  const [uploadedItems, setUploadedItems] = useState([]);

  return (
    <ClosetContext.Provider value={{ uploadedItems, setUploadedItems }}>
      {children}
    </ClosetContext.Provider>
  );
};

const useCloset = () => {
  const context = useContext(ClosetContext);
  if (!context) {
    throw new Error('useCloset must be used within a ClosetProvider');
  }
  return context;
};

export { ClosetProvider, useCloset };
