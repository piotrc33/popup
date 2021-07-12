import React, { useContext, useState } from 'react';
import Cookies from 'js-cookie';

export const StateContext = React.createContext();

// zamiast robienia useContext w komponencie docelowym
export function useStateContext() {
    return useContext(StateContext);
}

function EMProvider({ children }) {
    const [email, setEmail] = useState('');
    const [modalOpened, setModalOpened] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [errorView, setErrorView] = useState(false);

    const openModal = () => {
        Cookies.set('modalRecentlyOpened', 'true', {expires: 7})
        setModalOpened(true);
    }

    const closeModal = () => {
        setEmail('');
        setModalOpened(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(checkEmail()){
            setFormSubmitted(true);
            setTimeout(closeModal, 3000)
        }
    }

    const handleEmail = e => {
        setEmail(e.target.value);
    }

    const checkEmail = () => {
        function isEmailValid(text){
            return /\S+@\S+\.\S+/.test(text);
        }
        return isEmailValid(email);
        
    }

    const handleErrorView = () => {
        if(!checkEmail())
            setErrorView(true);
    }

    return (
        <StateContext.Provider value={{email, handleEmail, openModal, closeModal, modalOpened, handleSubmit, errorView, setErrorView, handleErrorView, formSubmitted}} >
            {children}
        </StateContext.Provider>
    )
}


export default EMProvider
