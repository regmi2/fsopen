import React from 'react'

const Course = ({courses}) => {
    return(
   <div>
     {courses.map(course =>
     <div key={course.id}>
       <Header name={course.name} />
       <Content parts={course.parts} />
       <Total parts={course.parts} />
       
   
     </div>
     )}
   
   
     </div>
    )
   }

   const Header = ({name}) => {
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
  }
  
  const Part = (props) => {
    
    return(
  
      <p>{props.name} {props.exercise}</p>
  
    )
  }
  const Content = ({parts}) => {
  
    return (
      <div>
        {parts.map((part,id) => 
        <Part name={part.name} exercise={part.exercises} key={id} partId={part.id}/>)}
      </div>
    )
  
  }
  
  const Total = ({parts}) => {
    return(
      <div>
        <p><strong>total of </strong>
        <strong> {parts.reduce((sum,part) => sum + part.exercises, 0)} exercises </strong></p>
  
      </div>
    )
  }


export default Course