import { useState } from 'react'

const Button = 
  ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>


const MostVotesDisplay = (props) => {
  
  if(props.votes[props.mvi] === 0){
    return (
    <div>no one has voted yet - be the first one!</div>
    )
  } 
  
  else {
    return (
      <div>
      {props.anecdotes[props.mvi]}
      <p>has {props.votes[props.mvi]} votes</p>
    </div>
    )
  }

  
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  //created new useStates to check index (number) + to count votes (array)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0,0])

  //chooses a random number between 0 - 6 for index of selected anecdote
  let random = Math.floor(Math.random() * 7)


  //function to duplicate votes array, add one vote to selected anecdote,
  //and pass the newly updated array with vote into setVotes
  const voteClick = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  //identifies the highest voted index and stores it
  let mostVotedIndex= votes.indexOf(Math.max(...votes))



  return (
    <div>
      <h1> Anecdote Of The Day </h1>
      {anecdotes[selected]}<br></br>
      {votes[selected]} votes <br></br>
      <Button handleClick={voteClick} text="vote" />
      <Button handleClick={() => setSelected(random)} text="next anecdote" />

      <h1> Anecdote with most votes </h1>
      <MostVotesDisplay anecdotes={anecdotes} votes={votes} mvi={mostVotedIndex} />

      
    </div>
  )
}

export default App




