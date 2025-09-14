import { createContext, useContext } from "react";

// Create the context with a default value of null
const CurrentUserContext = createContext(null);

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  return context;
};

export default CurrentUserContext;
