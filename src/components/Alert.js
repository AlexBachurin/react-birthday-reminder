import React from 'react'

const Alert = ({ alert }) => {
    //var for storing different paragraphs with error based on error type
    let errorElem = ``;
    if (alert.type === 'date') {
        errorElem = <p className="alert">Пожалуйста, введите правильную дату</p>;
    } else if (alert.type === 'success') {
        errorElem = <p className='success'>Пользователь успешно добавлен!</p>
    } else {
        errorElem = <p className="alert">Пожалуйста, заполните все необходимые поля</p>
    }
    return (
        <>
            {/* check alert state if its in true state render element with error else nothing */}
            {alert.state ? errorElem : null}
        </>
    )
}

export default Alert
