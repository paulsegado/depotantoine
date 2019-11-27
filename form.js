import React, { useReducer } from 'react';

const Max = 5;
const initialState = {
  notes: [],
  max: Max,
  hasError: { type: null, message: "" },
  coeff : 1,
  note : "",
  stop : false,
  average : 0,
  count : 0
};

const reducer = (state, action) => {

  switch (action.type) {
    case 'ADD_NOTE':

      if(action.value =="") return { ...state, note : "" }

      const newNote = parseInt(action.value);

      if ( isNaN(newNote) ) return { ...state, hasError: true }

      return {
        ...state, note: newNote, hasError: false
      }

    case 'ADD_COEFF':
      const newCoeff = parseInt(action.value);
      
      return { ...state, coeff : newCoeff }
    
    case 'PUSH_NOTE':
      const notes = state.notes;
      notes.push(state.note * state.coeff);

      let stop = false;
      let average = 0;
      const notesLength = notes.length;

      if (notesLength == Max ) { 
        stop = true; 
        average = notes.reduce((acc, curr) => acc + curr, 0) ;
      }; 

      return { 
          ...state, 
          count : notesLength,
          coeff : 1, 
          notes : notes, 
          stop : stop, 
          note : "", 
          average : Math.round( average/ notesLength , 1) 
      }

    default:
      return state;
  }
}

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { value, name } = e.target;
    dispatch({type : 'ADD_NOTE', value})
  }

  const handleChangeCoeff = (e) => {
    const { value } = e.target;
    dispatch({type : 'ADD_COEFF', value});
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    dispatch({ type : 'PUSH_NOTE'})
  }

  return (
    <>
      <h1>Saisir une note</h1>
      <p>Nb notes : {state.count}</p>
      { state.stop == false && 
      <form onSubmit={handleSubmit} >
        <p>Notes : <input
          type="text"
          name="note"
          onChange={handleChange}
          value={state.note}
        />
        </p>
        <p>
          <label htmlFor="">Coeff :</label>
          <select value={state.coeff} onChange={handleChangeCoeff}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </p>
        <p><button>Add</button></p>
      </form>
      }
      { state.stop && <p>{state.average}</p>}
    </>
  );
}

export default Form;
