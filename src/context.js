import React, { useContext, useRef, useState, useEffect } from 'react'

//get data from local storage
const getLocalStorage = () => {
    let list = localStorage.getItem('birthdaysList');
    if (list) {
        return (list = JSON.parse(localStorage.getItem('birthdaysList')));
    } else {
        return [];
    }
}

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    //ref for modal overlay
    const modalOverlayRef = useRef(null);
    //ref for file input to clear value
    const fileInputRef = useRef(null)
    //set our people list with data from local storage
    const [peopleList, setpeopleList] = useState(getLocalStorage());
    //state for people who have birthday today
    const [personsBirthToday, setPersonsBirthToday] = useState([]);
    //state for single person
    const [person, setPerson] = useState({ id: '', firstName: '', lastName: '', date: '', month: 'Январь', year: '', img: '' })
    //state for alert
    const [alert, setAlert] = useState({ state: false, type: '' })
    //state for modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    //state for show all
    const [showAll, setShowAll] = useState(false);
    //get current date
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayDate = today.getDate();
    //get full month name with this method
    const todayMonth = today.toLocaleString('default', { month: 'long' });

    //handle person when we add him to the list
    const handleSubmit = (e) => {
        e.preventDefault();
        if (person.date < 0 || person.date > 31) {
            //set alert for date error
            setAlert({ state: true, type: 'date' })
        }
        else if (person.firstName && person.lastName && person.date && person.month && person.year) {
            //add id before adding to list
            const newPerson = { ...person, id: new Date().getTime().toString() + Math.random() }
            //if all values is allright set new person to our list
            setpeopleList([...peopleList, newPerson]);
            //reset person
            setPerson({ id: '', firstName: '', lastName: '', date: '', month: 'Январь', year: '', img: '' });
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

    //MODAL 
    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = (e) => {
        setIsModalOpen(false);
        //also clear form on close
        setPerson({ firstName: '', lastName: '', date: '', month: 'Январь', year: '', img: '' });
        fileInputRef.current.value = null;
    }
    const closeModalOnOverlayClick = (e) => {
        if (e.target === modalOverlayRef.current) {
            setIsModalOpen(false);
        }
    }

    //SHOW ALL/BIRTHDAYS
    const showAllPeople = () => {
        setShowAll(true)
    }

    const showBirthdays = () => {
        setShowAll(false);
    }

    //REMOVE PERSON
    const removePerson = (id) => {
        const newList = peopleList.filter(item => item.id !== id);
        setpeopleList(newList);
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



    return <AppContext.Provider value={{
        peopleList,
        personsBirthToday,
        person,
        alert,
        isModalOpen,
        showAll,
        todayDate,
        todayMonth,
        todayYear,
        handleSubmit,
        handleChange,
        openModal,
        closeModal,
        showAllPeople,
        showBirthdays,
        fileInputRef,
        modalOverlayRef,
        closeModalOnOverlayClick,
        removePerson

    }}>
        {children}
    </AppContext.Provider>
}


//custom hook

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider };


