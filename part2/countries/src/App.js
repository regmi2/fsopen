
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'



const App = () => {
const [countries,setCountries] = useState([])
const [filteredCountries,setFilteredCountries] = useState([])
const [newSearch, setNewSearch] = useState('')

//Fetching Data from restcountries.com
useEffect(() => {
  axios.get('https://restcountries.com/v3.1/all')
    .then(response =>{
      setCountries(response.data)
    })
},[])




//filter Handler
const handleFilter = (event) => {
  setNewSearch(event.target.value)
}

//created filteredCountries using filter function
const fCountries = countries.filter(country => country.name.common.toLowerCase().includes(newSearch.toLowerCase()))
  return (
      <div>
         
            <div className='input-box'>
    find countries <input 
        type="text" placeholder="search" value={newSearch} onChange={handleFilter}/>
</div>
            <Country countries={fCountries} setCountries={setFilteredCountries} />

        </div>
    )
}

export default App;
