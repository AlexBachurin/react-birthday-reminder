import React from 'react'
import { FaBirthdayCake } from 'react-icons/fa'
import { useGlobalContext } from '../context'

const Persons = ({ peopleList }) => {
    const { todayYear, todayDate, todayMonth } = useGlobalContext();
    return (
        <div className="birthdays-wrapper">
            {
                peopleList.map((person, index) => {
                    return (
                        <article key={index} className="birthday">
                            <div className="img-container">
                                {/* check if user added image of person then show it , if not use placeholder avatar */}
                                <img src={person.img ? person.img : 'https://res.cloudinary.com/dljezd6qv/image/upload/v1631577257/react-birthday-reminder/avatar-placeholder.png'} alt={person.firstName} />
                            </div>
                            <h4>{person.firstName} {person.lastName}</h4>
                            <p className='birthday-date'>{person.date} {person.month} {person.year}</p>

                            {(Number(person.date) === todayDate && person.month.toLowerCase() === todayMonth.toLowerCase()) ? <><p>Сегодня {person.firstName} празднует свое <span>{todayYear - person.year}</span>  летие! </p><FaBirthdayCake className="birthday-icon" /></> : null}

                        </article>
                    )
                })
            }
        </div>
    )

}

export default Persons
