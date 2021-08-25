import { createContext, useContext, useReducer } from 'react'

const initialState = {
  isLogin: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return { isLogin: true }
    case 'logout':
      return { isLogin: false }
    default:
      return new Error()
  }
}

const StateContext = createContext()
const DispatchContext = createContext()

function useStateStore() {
  return useContext(StateContext)
}

function useDispatchStore() {
  return useContext(DispatchContext)
}

function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export { useStateStore, useDispatchStore, StoreProvider }
