import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'
//mainComponent
function App() {
  //useState
  const [loading, setLoading] = useState(false);
  const [tours, setTours]= useState([]);
  //removeTour
  const removeTour = (id)=>{
    const newTours = tours.filter((tour)=>tour.id !==id)
    setTours(newTours);
  }
  //FetchingData
  const fetchTours = async()=>{
    try {
      setLoading(true)
      const response = await fetch(url)
      const tours = await response.json()
      setLoading(false)
      setTours(tours);
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  //useEffect
  useEffect(()=>{
    fetchTours()
  },[])
  //LoadingIsTrue
  if(loading){
    return(
      <main>
        <Loading/>
      </main>
    )
  }
  //deleteAllTours
  if(tours.length === 0){
    return(
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <button onClick={()=>fetchTours()} className="btn">refresh</button>
        </div>
      </main>
    )
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour}/>
    </main>
    )
}

export default App
