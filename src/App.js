import React, { useState, useEffect, useRef } from 'react';
import Persons from './components/Persons';
import SubmitModal from './components/SubmitModal';
import { AiOutlineClose } from 'react-icons/ai'
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
  //ref for file input to clear value
  const fileInputRef = useRef(null)
  //set our people list with data from local storage
  const [peopleList, setpeopleList] = useState(getLocalStorage());
  //state for people who have birthday today
  const [personsBirthToday, setPersonsBirthToday] = useState([]);
  //state for single person
  const [person, setPerson] = useState({ firstName: '', lastName: '', date: '', month: 'Январь', year: '', img: '' })
  //state for alert
  const [alert, setAlert] = useState({ state: false, type: '' })
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
      //set alert for date error
      setAlert({ state: true, type: 'date' })
    }
    else if (person.firstName && person.lastName && person.date && person.month && person.year) {
      //if all values is allright set new person to our list
      setpeopleList([...peopleList, person]);
      //reset person
      setPerson({ firstName: '', lastName: '', date: '', month: 'Январь', year: '', img: '' });
      //show success alert
      setAlert({ state: true, type: 'success' })
      //clear value of file input
      fileInputRef.current.value = null;

    } else {
      //set alert for missing fields error
      setAlert({ state: true, type: 'fields' })
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
        //get our file
        const file = e.target.files[0];
        const reader = new FileReader();


        reader.onload = function (event) {
          // The file's url will be printed here
          const valueUrl = event.target.result;
          setPerson({ ...person, img: valueUrl })
        };
        //read file as url
        reader.readAsDataURL(file);
        break;
      default: {

      }
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

  //useEffect to remove alert after given time
  useEffect(() => {
    const alertId = setTimeout(() => {
      setAlert({ state: false, type: '' });
    }, 3000)
    return () => {
      clearTimeout(alertId)
    }
  }, [alert])


  //if theres no persons to display return no users

  return (
    <main>
      <section className="section">
        <img src="https://res.cloudinary.com/dljezd6qv/image/upload/v1619821176/main-logo-white-small.png" alt="logo" />
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
          {personsBirthToday.length !== 0 ? <Persons personsBirthToday={personsBirthToday} todayYear={todayYear} /> : <h3 className="birthdays-none">There is no birthdays today</h3>}

        </section>
        <div className="underline"></div>
        <button className="btn close-btn"><AiOutlineClose className="close-icon" /></button>
        <h4 className="form-title">Добавьте человека чтобы получить напоминание о его дне рождения!</h4>
        <button className="btn add-btn">Добавить</button>
        {/* FORM */}

      </section>
      <SubmitModal fileInputRef={fileInputRef} alert={alert} person={person} handleChange={handleChange} handleSubmit={handleSubmit} />
    </main>
  );
}

export default App;
