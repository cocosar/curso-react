import React, { useState } from "react";
import "./App.css";
import Person from "./Person/Person.js";
import Game from "./Game/Game.js";
import "./Person/Person.css";
import "./Game/Game.css";

const App = () => { 
    const [personsState, setPersonsState] = useState({
        persons: [
            { id: "fadgafdg", name: "Max", age: 24 },
            { id: "sdfgsdfg", name: "Coco", age: 28 },
            { id: "sdasddfg", name: "Guillo", age: 25 },
        ],
        otherState: "otro valor",
    });
    const [showState, setShowState] = useState({ showPersons: false });

    const style = {
        backgroundColor: "green",
        color: "white",
        padding: "15px",
        borderRadius: "15px",
        cursor: "pointer",
        
    }

    const nameChangeHandler = (event, id) => {
        const personIndex = personsState.persons.findIndex((p) => {
            return p.id === id;
        });
        const person = { ...personsState.persons[personIndex], };
        person.name = event.target.value;

        const persons = [...personsState.persons];
        persons[personIndex] = person;

        setPersonsState({ persons: persons });
    };

    const togglePersonHandler = () => {
        const doesShow = showState.showPersons;
        setShowState({ showPersons: !doesShow });
    };

    const deletePersonHandler = (index) => {
        const persons = personsState.persons.slice();
        persons.splice(index, 1);
        setPersonsState({ persons: persons });
    };

    let persons = null;
    if (showState.showPersons) {
        persons = (
            <div>
                {personsState.persons.map((person, index) => {
                    return (
                        <Person
                            click={() => deletePersonHandler(index)}
                            name={person.name}
                            age={person.age}
                            key={person.id}
                            changed={(event) =>
                                nameChangeHandler(event, person.id)
                            }
                        />
                    );
                })}
            </div>
        ); 
        style.backgroundColor = 'red';
    }

    const classes = [];
    if (personsState.persons.length <= 2){
        classes.push(['red']);
    }
    if (personsState.persons.length <= 1){
        classes.push('bold');
    }

    return (
        <div className="App">
            <h1>Curso de React papá</h1>
            <p className={classes.join(' ')}>Funciona</p>
            <button style={style} onClick={togglePersonHandler}>Switch Name</button>
            {persons}
            <Game />
        </div>
    );
};

export default App;
