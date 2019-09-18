import React, {useState} from 'react';
import './App.css';
import uuid from "uuid";

const initialTeam = [
  {name: "Carnun", email: "carnunmp.lambdaschool@gmail.com", role: "Senior Developer Extraordinaire", id: uuid()},
  {name: "Tiy", email: "tiy@email.co.uk", role: "Lead Product Designer", id: uuid()},
  {name: "Khem", email: "khem@mailness.com", role: "UX Developer", id: uuid()},
  {name: "Rhea", email: "rhea@rhea.com", role: "Head of Memeketing", id: uuid()},
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
      <Form/>
      <FriendsList team={team} />
    </div>
  );
}

function Form(props) {
  return (
    <form className="form">
      <label htmlFor="nameField">Name</label>
      <input id="nameField"/>

      <label htmlFor="emailField">Email</label>
      <input id="emailField"/>

      <label htmlFor="roleField">Role</label>
      <input id="roleField"/>

      <button
        disabled={true}
        // onClick={}
      >
        Submit
      </button>
    </form>
  )
}

function FriendsList(props) {
  return (
    <div className="friendsList">
      {props.team.map(member => 
        <h4 key={member.id}>
          {member.role}: {member.name}. <br />
          Email: {member.email}.
        </h4>
      )}
    </div>
  )
}