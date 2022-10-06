const Header = (props) => {
  return (
    <div>
      <h1>{props.c}</h1>
    </div>
  )
}

const Parts = (props) => {
  return(
    <p>{props.name} {props.exercise}</p>
  )
}
const Content = (props) => {
  return (
    <div>
     <Parts name={props.parts[0].name} exercise={props.parts[0].exercises}  />
     <Parts name={props.parts[1].name} exercise={props.parts[1].exercises}  />
     <Parts name={props.parts[2].name} exercise={props.parts[2].exercises}  />

    </div>
  )

}

const Total = (props) => {
  console.log(props.parts)
  return(
    <div>
      <p>Number of exercises {props.parts[0].exercises + 
        props.parts[1].exercises + 
        props.parts[2].exercises}</p>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header c={course.name}  />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      
    </div>
  )
}

export default App