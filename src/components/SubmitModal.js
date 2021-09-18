import React from 'react'
import Form from './Form'
const SubmitModal = ({ fileInputRef, alert, person, handleChange, handleSubmit }) => {
    return (
        <div className='modal-overlay show'>
            <div className="modal-content">
                <Form fileInputRef={fileInputRef} alert={alert} person={person} handleChange={handleChange} handleSubmit={handleSubmit} />
            </div>
        </div>
    )
}

export default SubmitModal
