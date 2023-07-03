const Course = (props) => {
  const { name, parts } = props.course
  console.log(parts[0].exercises)
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total sum={parts.reduce((accum, part) => accum + part.exercises, 0)} />
    </div>
  )
}
const Header = ({ course }) =>
  <h2>{course}</h2>

const Total = ({ sum }) =>
  <p><strong>Number of exercises:</strong> <em>{sum}</em></p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  const mappedParts = parts.map(part => {
    console.log(part)
    return (<Part part={part} />)
  
})
console.log({mappedParts});
  return (
    
  <>
    {mappedParts}
  </>
  )
}

export default Course