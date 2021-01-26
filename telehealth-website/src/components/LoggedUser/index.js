import React, {
  createContext,
  useContext,
  useState,
} from 'react';

const LoggedUserStateContext = createContext();

function LoggedUserProvider({ children }) {
  const [user, setUser] = useState({});

  return (
    <LoggedUserStateContext.Provider value={{user,setUser}}>
        {children}
    </LoggedUserStateContext.Provider>
  );
}

function useLoggedUserState() {
  const context = useContext(LoggedUserStateContext);

  if (context === undefined) {
    throw new Error('useLoggedUserState must be used within a LoggedUserProvider');
  }

  return context;
}

export {
  LoggedUserProvider,
  useLoggedUserState,
};
