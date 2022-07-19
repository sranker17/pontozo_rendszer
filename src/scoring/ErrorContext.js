import { useState, createContext } from "react";

export const ErrorContext = createContext();

export const ErrorProvider = ({children}) => {
    const [errors, setErrors] = useState([]);
    return(
        <ErrorContext.Provider value={[errors, setErrors]}>
            {children}
        </ErrorContext.Provider>
    );
}