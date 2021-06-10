import React from "react";
const BlurModalContext = React.createContext();
const BlurModalContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const value = { isOpen, setIsOpen };
  return (
    <BlurModalContext.Provider value={value}>
      {children}
    </BlurModalContext.Provider>
  );
};

export { BlurModalContext, BlurModalContextProvider };