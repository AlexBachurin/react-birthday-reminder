import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Persons from './components/Persons';

//get data from local storage
const getLocalStorage = () => {
  let list = localStorage.getItem('birthdaysList');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('birthdaysList')));
  } else {
    return [];
  }
}
function App() {
  //set our people list with data from local storage
  const [peopleList, setpeopleList] = useState(getLocalStorage());
  //state for people who have birthday today
  const [personsBirthToday, setPersonsBirthToday] = useState([]);
  //state for single person
  const [person, setPerson] = useState({ firstName: '', lastName: '', date: '', month: 'Январь', year: '', img: '' })
  //get current date
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayDate = today.getDate();
  //get full month name with this method
  const todayMonth = today.toLocaleString('default', { month: 'long' });
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
    if (person.date < 0 || person.date > 31) {
      //placeholder for error handling
      console.log('wrong date')
    }
    else if (person.firstName && person.lastName && person.date && person.month && person.year) {
      //if all values is allright set new person to our list
      setpeopleList([...peopleList, person]);
      //reset person
      setPerson({ firstName: '', lastName: '', date: '', month: 'Январь', year: '', img: '' });

    } else {
      //placeholder for error handling
      console.log('error')
    }

  }
  //handle input changes, watch and control inputs in form
  const handleChange = (e) => {
    e.preventDefault();
    const target = e.currentTarget;

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
      case 'image':
        setPerson({ ...person, img: target.value });
    }

  }
  //functionality to check if person in our list birthday is today
  const checkBirthday = () => {
    const peopleWithBirthToday = peopleList.filter((person) => {
      //dont forget about types and cases
      return Number(person.date) === todayDate && person.month.toLowerCase() === todayMonth.toLowerCase();
    })
    setPersonsBirthToday(peopleWithBirthToday);
  }
  //check birthday on every page load
  useEffect(() => {
    checkBirthday();
  }, [])

  //change local storage value everytime we change our people list
  useEffect(() => {
    //also check people with birthdays on every add to our list
    checkBirthday();
    localStorage.setItem('birthdaysList', JSON.stringify(peopleList));
  }, [peopleList])


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
          {/* display people with birthday */}
          <Persons personsBirthToday={personsBirthToday} todayYear={todayYear} />
        </section>
        {/* FORM */}
        <Form person={person} handleChange={handleChange} handleSubmit={handleSubmit} />
      </section>
    </main>
  );
}

export default App;
