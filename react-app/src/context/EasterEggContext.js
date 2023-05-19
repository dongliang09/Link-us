import { createContext, useContext, useState } from 'react';

export const EasterEggContext = createContext();

export const useEasterEgg = () => useContext(EasterEggContext);

export default function EasterEggProvider({ children }) {
  const [easterEggFound, setEasterEggFound] = useState({});

  return (
    <EasterEggContext.Provider
      value={{
        easterEggFound,
        setEasterEggFound
      }}
    >
      {children}
    </EasterEggContext.Provider>
  );
}
