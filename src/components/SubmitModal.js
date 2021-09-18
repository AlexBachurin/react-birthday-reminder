import React from 'react'
import Form from './Form'
import { AiOutlineClose } from 'react-icons/ai'
import { useGlobalContext } from '../context'
const SubmitModal = () => {
    const { fileInputRef, alert, person, handleChange, handleSubmit, closeModal, isModalOpen } = useGlobalContext();
    let clsName = isModalOpen ? 'modal-overlay show' : 'modal-overlay'
    return (
        <div className={clsName}>
            <div className="modal-content">
                <button onClick={closeModal} className="btn close-btn"><AiOutlineClose className="close-icon" /></button>
                <Form closeModal={closeModal} fileInputRef={fileInputRef} alert={alert} person={person} handleChange={handleChange} handleSubmit={handleSubmit} />
            </div>
        </div>
    )
}

export default SubmitModal
