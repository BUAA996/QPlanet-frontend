import { createContext, useContext, useReducer } from "react";

const initialState = {
  isLogin: !!window.localStorage.getItem("userId"),
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      window.localStorage.setItem("userId", action.data);
      return { isLogin: true };
    case "logout":
      window.localStorage.removeItem("userId");
      return { isLogin: false };
    default:
      return new Error();
  }
}

const StateContext = createContext();
const DispatchContext = createContext();

function useStateStore() {
  return useContext(StateContext);
}

function useDispatchStore() {
  return useContext(DispatchContext);
}

function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export { useStateStore, useDispatchStore, StoreProvider };
