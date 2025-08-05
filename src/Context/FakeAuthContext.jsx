import { createContext, useContext, useReducer } from "react";

const FakeAuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };

    case "logout":
      return { ...state, user: null, isAuthenticated: false };

    default:
      throw new Error("rak out a sahbi");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "J4ckSecureDev2025",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function FakeAuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (FAKE_USER.email === email && FAKE_USER.password === password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <FakeAuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </FakeAuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(FakeAuthContext);
  if (context === undefined)
    throw new Error("the context was outside the provider");

  return context;
}

export { FakeAuthProvider, useAuth };
