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
  email: "",
  role: "",
};

export default function App() {
  const [team, setTeam] = useState(initialTeam);
  const [form, setForm] = useState(initialForm);
  const [memberToEdit, setMemberToEdit] = useState(null);

  const onChange = e => {
    const inputValue = e.target.value;
    const formSection = e.target.id;
    
    setForm({...form, [formSection]: inputValue})
  }

  const onFormSubmit = e => {
    e.preventDefault();
    if (form.name && form.email && form.role) {
      setTeam([...team, {...form, id: uuid()}]);
      setForm(initialForm);
    } else {
      alert(`Please fill empty fields.`)
    }
  }

  const onEditPress = (member) => {
    console.log(member);
    setMemberToEdit(member);
  }
  
  return (
    <div className="App">
      <Form
        form={form}
        onChange={onChange}
        onFormSubmit={onFormSubmit}
        onEditPress={onEditPress}
      />
      <FriendsList team={team} onEditPress={onEditPress} />
    </div>
  );
}

function Form(props) {
  const {form, onChange, onFormSubmit, memberToEdit} = props;
  const {name, email, role} = form;

  return (
    <form className="form">
      <label htmlFor="name">Name</label>
      <input id="name" onChange={onChange} value={name} />

      <label htmlFor="email">Email</label>
      <input id="email" onChange={onChange} value={email} />

      <label htmlFor="role">Role</label>
      <input id="role" onChange={onChange} value={role}/>

      <button
        disabled={false}
        onClick={onFormSubmit}
      >
        Submit
      </button>
    </form>
  )
}

function FriendsList(props) {
  const {team, onEditPress} = props;
  return (
    <div className="friendsList">
      {team.map(member => 
        <div key={member.id}>
          <h4>
            {member.role}: {member.name}. <br />
            Email: {member.email}.
          </h4>
          <button onClick={() => onEditPress(member)}>Edit</button>
        </div>
      )}
    </div>
  )
}