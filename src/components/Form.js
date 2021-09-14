import React from 'react'
import Alert from './Alert'

const Form = ({ fileInputRef, person, handleSubmit, handleChange, alert }) => {
    return (
        <form className="form" action="">
            <h4 className="form-title">Добавьте человека чтобы получить напоминание о его дне рождения!</h4>
            <Alert alert={alert} />
            <div className="form-control">
                <label htmlFor="firstName">Имя:</label>
                <input
                    onChange={handleChange}
                    required
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={person.firstName}
                />
            </div>
            <div className="form-control">
                <label htmlFor="lastName">Фамилия:</label>
                <input
                    onChange={handleChange}
                    required id="lastName"
                    name="lastName"
                    type="text"
                    value={person.lastName}
                />
            </div>
            <div className="form-control">
                <label htmlFor="date">Дата:</label>
                <input
                    onChange={handleChange}
                    required id="date"
                    name="date"
                    type="number"
                    min="1"
                    max="31"
                    value={person.date}
                />
            </div>
            <div className="form-control">
                <label htmlFor="month">Месяц:</label>
                <select
                    onChange={handleChange}
                    required
                    id="month"
                    name="month"
                    value={person.month}
                >
                    <option defaultValue={person.month}>Январь</option>
                    <option>Февраль</option>
                    <option>Март</option>
                    <option>Апрель</option>
                    <option>Май</option>
                    <option>Июнь</option>
                    <option>Июль</option>
                    <option>Август</option>
                    <option>Сентябрь</option>
                    <option>Октябрь</option>
                    <option>Ноябрь</option>
                    <option>Декабрь</option>
                </select>
            </div>
            <div className="form-control">
                <label htmlFor="year">Год:</label>
                <input
                    onChange={handleChange}
                    required id="year"
                    name="year"
                    type="number"
                    min="0"
                    value={person.year}
                />
            </div>
            <div className="form-control">
                <label htmlFor="image">Фото: <span>(необязательно)</span></label>
                <div>
                    <input
                        onChange={handleChange}
                        required
                        id="image"
                        name="image"
                        accept="image/*"
                        type="file"
                        title="choose"
                        ref={fileInputRef}
                    />
                    {/* show preview only if src is provided */}
                    {person.img && <img src={person.img} alt="person" className="photo-preview" />}
                </div>


            </div>
            <button onClick={handleSubmit} className="submit-btn" type="submit"> Добавить </button>
        </form>
    )
}

export default Form
