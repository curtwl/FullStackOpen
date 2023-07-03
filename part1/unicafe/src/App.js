import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
  )
}
const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const average = (Math.round(((props.good * 1 + props.neutral * 0 + props.bad * -1) / total) * 10)) / 10
  const positive = `${(Math.round(((props.good / total) * 100) * 10) / 10)}%`

  if (total === 0) 
    return (
      <p>No feedback given</p>
    )
  else
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value ={props.good} />
          <StatisticLine text="neutral" value ={props.neutral} />
          <StatisticLine text="bad" value ={props.bad} />
          <StatisticLine text="all" value ={total} />
          <StatisticLine text="average" value ={average} />
          <StatisticLine text="positive" value ={positive} />
        </tbody>        
      </table>

    )
}

const App = () => {
  // save clicks of each button to its own state
  // the update function for each button is passed to handleClick
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (updateFunction, feedback) => {
    const newValue = feedback + 1
    updateFunction(newValue)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button 
        handleClick = {() => handleClick(setGood, good)}
        text='good'
      />
      <Button 
        handleClick = {() => handleClick(setNeutral, neutral)}
        text='neutral'
      />
      <Button 
        handleClick = {() => handleClick(setBad, bad)}
        text='bad'
      />
      <h2>statistics</h2>
      <Statistics 
        good = {good}
        neutral = {neutral}
        bad = {bad}
      />

    </div>
  )
}

export default App