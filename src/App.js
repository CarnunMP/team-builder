import React, {useState, useEffect} from 'react';
import './App.css';
import uuid from "uuid";
import { ninvoke } from 'q';

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
    setMemberToEdit(member);
  }

  const editMember = (memberToEdit) => e => {
    e.preventDefault();
    const editedMember = team.find(member => member.id === memberToEdit.id);
    const rest = team.filter(member => member != editedMember);
    
    if (form.name && form.email && form.role) {
      setTeam([memberToEdit, ...rest]);
      setForm(initialForm);
    } else {
      alert(`Please fill empty fields.`)
    }
  }
  
  return (
    <div className="App">
      <Form
        form={form}
        onChange={onChange}
        onFormSubmit={onFormSubmit}
        memberToEdit={memberToEdit}
        setMemberToEdit={setMemberToEdit}
        editMember={editMember}
        setForm={setForm}
      />
      <FriendsList team={team} onEditPress={onEditPress} />
    </div>
  );
}

function Form(props) {
  const {form, onChange, onFormSubmit, memberToEdit, setMemberToEdit, editMember, setForm} = props;
  const {name, email, role} = form;

  useEffect(() => {
    if (memberToEdit != null) {
      setForm({name: memberToEdit.name, email: memberToEdit.email, role: memberToEdit.role});
      // setMemberToEdit(null);
    }
  }, [memberToEdit]);

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
        onClick={
          memberToEdit === null 
            ? onFormSubmit
            : editMember(memberToEdit)
        }
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