import React from 'react'
import { FaBirthdayCake } from 'react-icons/fa'

const Person = ({ personsList, todayYear }) => {
    return (
        <div className="birthdays-wrapper">
            {
                personsList.map((person, index) => {
                    return (
                        <article key={index} className="birthday">
                            <div className="img-container">
                                {/* check if user added image of person then show it , if not use placeholder avatar */}
                                <img src={person.img ? person.img : 'https://res.cloudinary.com/dljezd6qv/image/upload/v1631577257/react-birthday-reminder/avatar-placeholder.png'} alt={person.firstName} />
                            </div>
                            <h4>{person.firstName} {person.lastName}</h4>
                            <p>Сегодня {person.firstName} празднует свое <span>{todayYear - person.year}</span>  летие! </p>
                            < FaBirthdayCake className="birthday-icon" />
                        </article>
                    )
                })
            }
        </div>
    )

}

export default Person
