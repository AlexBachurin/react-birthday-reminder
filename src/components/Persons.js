import React from 'react'

const Person = ({ personsBirthToday, todayYear }) => {
    return (
        <>
            {
                personsBirthToday.map((person, index) => {
                    return (
                        <article key={index} className="birthday">
                            <div className="img-container">
                                {/* check if user added image of person then show it , if not use placeholder avatar */}
                                <img src={person.img && (person.img.endsWith('jpg') || person.img.endsWith('jpeg') || person.img.endsWith('png')) ? person.img : 'https://res.cloudinary.com/dljezd6qv/image/upload/v1631577257/react-birthday-reminder/avatar-placeholder.png'} alt={person.firstName} />
                            </div>
                            <h4>{person.firstName} {person.lastName}</h4>
                            <p>Сегодня {person.firstName} празднует свое {todayYear - person.year} летие! </p>
                        </article>
                    )
                })
            }
        </>
    )

}

export default Person
