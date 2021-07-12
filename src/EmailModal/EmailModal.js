import React, { useEffect } from 'react'
import { useStateContext } from './EMProvider';
import Cookies from 'js-cookie';

function EmailModal() {
    const context = useStateContext();

    const {email, handleEmail, openModal, closeModal, modalOpened, handleSubmit, errorView, setErrorView, handleErrorView, formSubmitted} = context;

    useEffect(() => {
        document.body.addEventListener('mouseleave', () => {
            if(Cookies.get('modalRecentlyOpened') !== 'true' ){
                openModal();
            } 
        })
      }, [])

    return (
        <section className={`email-modal ${modalOpened ? "email-modal--visible" : ''}`}>
            <div 
                onClick={closeModal}
                className="email-modal__close-btn">
                <i className="gg-close" />
            </div>
            <div className="email-modal__container">
                <div className="email-modal__info">
                    <div className="logo">
                        Berry
                        <div className="logo__sub">
                            by Jenny
                        </div>
                    </div>
                    <h2>Don't miss this chance!</h2>
                    <p className="email-modal__message">Join our amazing community of more than <span className="email-modal__highlight-text">300,000 woman</span> who love fashion and receive <span className="email-modal__highlight-text">notifications, discounts, and our award winning newsletter.</span></p>
                    <div className={`email-modal__error-message ${errorView ? 'email-modal__error-message--active' : ''}`}>
                        Sorry this is not a valid email
                    </div>
                    <form className="email-modal__form-group"
                        onSubmit={handleSubmit}
                    >
                        <input type="email" 
                            className="email-modal__input" 
                            placeholder="youremail@mail.com" 
                            value={email}
                            onChange={handleEmail} 
                            onFocus={() => setErrorView(false)}
                            onBlur={handleErrorView}
                             />
                        <button type="submit" className="email-modal__button">Send</button>
                    </form>
                    <div className="email-modal__decline-offer"
                        onClick={closeModal}
                    >
                        Sorry, I'm not interested
                    </div>
                </div>
                <div className="email-modal__side-img">
                    <img src="img/pexels-photo-4462782.jpeg" alt="shoes" />
                </div>
                <div className={`email-thank ${formSubmitted ? 'email-thank--success' : ''}`}>
                    <div className="email-thank__title">
                        Thank You
                    </div>
                    <p className="email-thank__message">
                        check your email we sent you some instructions... by the way welcome to the community!
                    </p>
                </div>
            </div>
        </section>
    )
}

export default EmailModal
