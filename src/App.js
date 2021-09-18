import React from 'react';
import Persons from './components/Persons';
import SubmitModal from './components/SubmitModal';
import transformMonthName from './utils';
import { useGlobalContext } from './context'
function App() {
  const { showAll, showBirthdays, showAllPeople, todayDate, todayYear, todayMonth, peopleList, personsBirthToday, openModal } = useGlobalContext();

  // classname for section

  let clsNameAll = showAll ? 'all-section show' : 'all-section'
  let clsNameBirthdays = showAll ? 'birthdays-section' : 'birthdays-section show'

  //claassname for button active 
  let btnClsNameAll = showAll ? 'btn active' : 'btn';
  let btnClsNameBirthdays = showAll ? 'btn' : 'btn active';
  return (
    <main>
      <section className="section">
        <img src="https://res.cloudinary.com/dljezd6qv/image/upload/v1619821176/main-logo-white-small.png" alt="logo" />
        <div className="header">
          <h1 className="title">Birthday reminder app</h1>
          <div className="underline"></div>
        </div>
        <div className="toggle-btn-container">
          <button className={btnClsNameBirthdays} onClick={showBirthdays}>Сегодня</button>
          <button className={btnClsNameAll} onClick={showAllPeople}>Все</button>
        </div>

        <section className={clsNameBirthdays}>
          <div className="birthday-section-header">
            <h2 className="birthdays-title">Дни Рождения Сегодня!</h2>
            <div className="date-container">
              <span className="date">{todayDate}</span>
              <span className="month">{transformMonthName(todayMonth)}</span>
              <span className="year">{todayYear}</span>
            </div>
          </div>
          {/* display people with birthday */}
          {personsBirthToday.length !== 0 ? <Persons peopleList={personsBirthToday} /> : <h3 className="birthdays-none">Сегодня Дни Рождения отсутствуют</h3>}

        </section>
        <section className={clsNameAll}>
          {/* display all */}
          {peopleList.length === 0 ? <h3 className="birthdays-none">Вы еще не добавили ни одного человека</h3> : <Persons peopleList={peopleList} />}
        </section>
        <div className="underline"></div>
        <h4 className="form-title">Добавьте человека чтобы получить напоминание о его дне рождения!</h4>
        <button onClick={openModal} className="btn add-btn">Добавить</button>
      </section>
      {/* FORM */}
      <SubmitModal />
    </main>
  );
}

export default App;
