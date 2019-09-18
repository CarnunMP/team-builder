import React, {useState} from 'react';
import './App.css';
import uuid from "uuid";

const initialTeam = [
  {name: "Carnun", age: 22, id: uuid()},
  {name: "Tiy", age: 20, id: uuid()},
  {name: "Khem", age: 15, id: uuid()},
  {name: "Rhea", age: 11, id: uuid()},
];

const initialForm = {
  name: "",
  age: "",
};

export default function App() {
  const [team, setTeam] = useState(initialTeam);
  const [form, setForm] = useState(initialForm);
  return (
    <div className="App">
      <FriendsList team={team} />
    </div>
  );
}

function FriendsList(props) {
  return (
    props.team.map(member => 
      <h4 key={member.id}>
        {member.name} is {member.age} years old.
      </h4>
    )
  )
}