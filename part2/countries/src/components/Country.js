const Country = ({countries, setCountries}) => {

 
  if(countries.length > 10){
    console.log('access into Countries')
    return(<p> Too many matches, specify another filter</p>)
  }
  
  else if(countries.length === 1){
    const country = countries[0]
    const lang = country.languages

    return(
      <div>
        <h1>{countries[0].name.common}</h1>
        <p>capital: {countries[0].capital}</p>
        <p>population: {countries[0].population}</p>
        <h3>languages</h3> 
          <ul>
            {
              Object.keys(lang).map(
                (key, i) => {
                return <div key={i}>{lang[key]}</div>
              }
              )
            }
            
            </ul> 
        
        <p>flag: {countries[0].flag} </p>
      </div>
    )
  } else {
    return countries.map(country => {
      return(
        <div key={country.name.common}>
          {country.name.common} <button onClick={() => setCountries([country])}>show</button>
        </div>
      )
    })
    
  }



  }

export default Country