import React, { createContext, useContext, useReducer } from "react";

const CardStateContext = createContext();
const CardDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, {
                id: action.id,
                name: action.name,
                qty: action.qty,
                size: action.size,
                price: action.price,
                img: action.price
            }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;

        case "DROP":
            let empArray = []
            return empArray;
        
        default:
            console.log("error in reducer");
    }
}
export const CardProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [])
    return (
        <CardDispatchContext.Provider value={dispatch}>
            <CardStateContext.Provider value={state}>
                {children}
            </CardStateContext.Provider>

        </CardDispatchContext.Provider>
    )
}

export const useCard = () => useContext(CardStateContext);
export const useDispatchCard = () => useContext(CardDispatchContext);