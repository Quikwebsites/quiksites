import React, { createContext, useContext, useReducer } from "react";

export const PageContext = createContext()

export const PageContextProvider = ({ initialState, 
  reducer, 
  children }) => (
  <PageContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </PageContext.Provider>
)

export const usePageContext = () => useContext(PageContext)