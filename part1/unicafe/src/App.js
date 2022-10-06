import { useState } from 'react'

const StatisticLine = ({value,text,percent}) => {
  return( 
    <tbody>
    <tr>
        <td>{text}</td>
        <td>{value}</td>
        <td>{percent}</td>
        </tr>
    </tbody>
  )
}

const Statistics = (props) => {
 
  if(props.all === 0) return( "No feedback given")

  return (
    <div>
      <table>
     
        <StatisticLine value={props.good} text="Good:" />
        <StatisticLine value={props.neutral} text="Neutral:" />
        <StatisticLine value={props.bad} text="Bad:" />
        <StatisticLine value={props.all} text="All:" />
        <StatisticLine value={props.avg} text="Average:" />
        <StatisticLine value={props.positive} text="Positive:" percent="%" />
      
      </table>
    </div>
  )
}

const Button = 
  ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>




const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  let all = good + neutral + bad
  

  console.log("all: ", all, "good:", good, "neu:", neutral, "bad:", bad)


  const setToGood = (newGood) => {
    setGood(newGood)
  }




  const setToNeutral= (newNeutral) => {
    setNeutral(newNeutral)
  }

  const setToBad = (newBad) => {
    setBad(newBad)
  }


  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />

      <h1> Statistics </h1>
      <Statistics good={good} bad={bad} neutral={neutral} all={all}
      avg={(good - bad)/all} positive={(good/all) * 100} />


    </div>
  )
}

export default App