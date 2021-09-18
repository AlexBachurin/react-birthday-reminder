import React from 'react'
import Alert from './Alert';


const Form = ({ fileInputRef, person, handleSubmit, handleChange, alert, closeModal }) => {
    return (
        <form className="form" action="">

            <h3>Заполните информацию</h3>
            <Alert alert={alert} />
            <div className="form-wrapper">
                <div className="form-image-container">
                    <div className="form-control">
                        <div className="photo-container">
                            {/* show preview only if src is provided */}
                            {person.img && <img src={person.img} alt="person" className="photo-preview" />}
                        </div>
                        <label htmlFor="image">
                            <input
                                onChange={handleChange}

                                id="image"
                                name="image"
                                accept="image/*"
                                type="file"
                                title="choose"
                                ref={fileInputRef}
                            />
                            <p> Добавить фото: <span>(необязательно)</span></p>
                        </label>


                    </div>
                </div>
                <div className="form-info-container">
                    <div className="form-name-container">
                        <div className="form-control">
                            <label htmlFor="firstName">Имя:

                            </label>
                            <input
                                onChange={handleChange}

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
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={person.lastName}
                            />
                        </div>
                    </div>
                    <div className="form-control-date">
                        <label htmlFor="date">Дата:</label>
                        <input
                            onChange={handleChange}
                            id="date"
                            name="date"
                            type="number"
                            min="1"
                            max="31"
                            value={person.date}
                        />
                    </div>
                    <div className="form-control-date">
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
                    <div className="form-control-date">
                        <label htmlFor="year">Год:</label>
                        <input
                            onChange={handleChange}
                            id="year"
                            name="year"
                            type="number"
                            min="0"
                            value={person.year}
                        />
                    </div>
                </div>
            </div>
            <div className="form-btns-container">
                <button onClick={closeModal} className="cancel-btn" type="button">Отмена</button>
                <button onClick={handleSubmit} className="submit-btn" type="submit"> Добавить </button>

            </div>
        </form>
    )
}

export default Form
