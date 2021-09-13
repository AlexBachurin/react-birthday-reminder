import React from 'react'

const Person = ({ personsBirthToday, todayYear }) => {
    return (
        <>
            {
                personsBirthToday.map((person, index) => {
                    return (
                        <article key={index} className="birthday">
                            <div className="img-container">
                                <img src="https://briefly.ru/static/cache/authors/480/gogol.jpeg?1622718658" alt="gogol" />
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
