import React, { useState, useEffect } from 'react';

//get data from local storage
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
}
function App() {
  //set our people list with data from local storage
  const [peopleList, setpeopleList] = useState(getLocalStorage());
  //state for people who have birthday today
  const [personBirthToday, setPersonBirthToday] = useState([]);
  //state for single person
  const [person, setPerson] = useState({ firstName: '', lastName: '', date: '', month: 'Январь', year: '' })
  //get current date
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayDate = today.getDate();
  //get full month name with this method
  const todayMonth = today.toLocaleString('default', { month: 'long' });;
  //function to transform month name
  const transformMonthName = (name) => {
    if (name.endsWith('ь') || name.endsWith('й')) {
      return `${name.slice(0, name.length - 1)}я`;
    } else {
      return `${name.slice(0, name.length - 1)}а`
    }
  }
  //handle person when we add him to the list
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  //handle input changes, watch and control inputs in form
  const handleChange = (e) => {
    e.preventDefault();
    const target = e.currentTarget;
    console.log(target.name);
    switch (target.name) {
      case `firstName`:
        setPerson({ ...person, firstName: target.value });
        break;
      case 'lastName':
        setPerson({ ...person, lastName: target.value });
        break;
      case 'date':
        setPerson({ ...person, date: target.value });
        break;
      case 'month':
        setPerson({ ...person, month: target.value });
        break;
      case 'year':
        setPerson({ ...person, year: target.value });
        break;
    }

    console.log(person);
  }
  return (
    <main>
      <section className="section">
        <div className="header">
          <h1 className="title">Birthday reminder app</h1>
          <div className="underline"></div>
        </div>
        <h2 className="birthdays-title">Дни Рождения Сегодня!</h2>
        <div className="date-container">
          <span className="date">{todayDate}</span>
          <span className="month">{transformMonthName(todayMonth)}</span>
          <span className="year">{todayYear}</span>
        </div>
        <section className="birthdays-section">
          <article className="birthday">
            <div className="img-container">
              <img src="https://briefly.ru/static/cache/authors/480/gogol.jpeg?1622718658" alt="gogol" />
            </div>
            <h4>John wick</h4>
            <p>21 dec 1992</p>
          </article>
          <article className="birthday">
            <div className="img-container">
              <img src="https://briefly.ru/static/cache/authors/480/gogol.jpeg?1622718658" alt="gogol" />
            </div>
            <h4>John doe</h4>
            <p>21 dec 1995</p>
          </article>
          <article className="birthday">
            <div className="img-container">
              <img src="https://briefly.ru/static/cache/authors/480/gogol.jpeg?1622718658" alt="gogol" />
            </div>
            <h4>Sally Smith</h4>
            <p>30 sep 1982</p>
          </article>
          <article className="birthday">
            <div className="img-container">
              <img src="https://briefly.ru/static/cache/authors/480/gogol.jpeg?1622718658" alt="gogol" />
            </div>
            <h4>Sally Smith</h4>
            <p>30 sep 1982</p>
          </article>
        </section>
        <form className="form" action="">
          <h4 className="form-title">Добавьте человека чтобы получить напоминание о его дне рождения!</h4>
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
            <label htmlfor="month">Месяц:</label>
            <select
              onChange={handleChange}
              required
              id="month"
              name="month"
              value={person.month}
            >
              <option selected>Январь</option>
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
          <button onClick={handleSubmit} className="submit-btn" type="submit"> Добавить </button>
        </form>
      </section>
    </main>
  );
}

export default App;
