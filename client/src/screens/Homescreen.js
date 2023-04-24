import React, {useState, useEffect} from 'react'
import axios from "axios";
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import moment from 'moment';

function Homescreen() {
  const [rooms, setrooms] = useState([])
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const { RangePicker } = DatePicker;

  const [fromDate, setfromDate] = useState()
  const [toDate, settoDate] = useState()
  const [duplicaterooms, setduplicaterooms] = useState([])

  const [searchKey, setsearchKey] = useState('');
  const [type, setType] = useState('all')


    useEffect( () =>  {
    async function fetchData() {
    try {
      
      const data = (await axios.get('/api/rooms/getallrooms')).data

      setrooms(data)
      setduplicaterooms(data)
      setLoading(false)
    }

    catch(e) {
        console.log(e)
        setError(true)
        setLoading(false)
    }
  }
  fetchData()

  }, [])


  function filterbyDate(dates) {


      setfromDate(moment(dates[0]).format("DD-MM-YYYY"))
      settoDate(moment(dates[1]).format("DD-MM-YYYY"))

      var temprooms = []
      var availability = false


      for(const room of duplicaterooms) {
        if(room.currentbookings.length > 0) {
          for (const booking of room.currentbookings){

            
             
            console.log(moment(moment(dates[0]).format("DD-MM-YYYY"), "DD-MM-YYYY").isBetween(moment(booking.fromDate, "DD-MM-YYYY"), moment(booking.toDate, "DD-MM-YYYY")) 
            && moment(moment(dates[0]).format("DD-MM-YYYY"), "DD-MM-YYYY").isBetween(moment(booking.fromDate, "DD-MM-YYYY"), moment(booking.toDate, "DD-MM-YYYY")))

            if(! moment(moment(dates[0]).format("DD-MM-YYYY"), "DD-MM-YYYY").isBetween(moment(booking.fromDate, "DD-MM-YYYY"), moment(booking.toDate, "DD-MM-YYYY")) 
            && ! moment(moment(dates[0]).format("DD-MM-YYYY"), "DD-MM-YYYY").isBetween(moment(booking.fromDate, "DD-MM-YYYY"), moment(booking.toDate, "DD-MM-YYYY"))) {

              

              if(moment(moment(dates[0]).format("DD-MM-YYYY"), "DD-MM-YYYY") !== moment(booking.fromDate, "DD-MM-YYYY") &&
              moment(moment(dates[1]).format("DD-MM-YYYY"), "DD-MM-YYYY") !== moment(booking.fromDate, "DD-MM-YYYY") &&
              moment(moment(dates[0]).format("DD-MM-YYYY"), "DD-MM-YYYY") !== moment(booking.toDate, "DD-MM-YYYY") &&
              moment(moment(dates[1]).format("DD-MM-YYYY"), "DD-MM-YYYY") !== moment(booking.toDate, "DD-MM-YYYY")) {
                availability = true;
              }

            }
            else {
              availability = false
            }
          }
        }

        if(availability == true || room.currentbookings.length == 0) {
          temprooms.push(room)
        }

        console.log(temprooms)
        setrooms(temprooms)
      }
       
  }

  function filterBySearch() {
    console.log("camehere")
    console.log(searchKey)
    const temprooms = duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchKey.toLowerCase()))
    setrooms(temprooms)
  }

  function filterByType(e) {

    setType(e)
    
    if(e!=='all') {
      const temprooms = duplicaterooms.filter(room => room.type.toLowerCase() == e.toLowerCase())
    setrooms(temprooms)
    }
    else {
      setrooms(duplicaterooms)
    }
  }

  return (
    <div className = "container">


      <div data-aos="fade-left" className='row mt-5 bs'>
        <div className='col md-4'>
            <RangePicker className='form-control' format = 'DD-MM-YYYY' onChange={filterbyDate}></RangePicker>
        </div>
        <div className='col-md-4' >
          <input type='text' className='form-control' placeholder='Search' value = {searchKey} onChange={e => {setsearchKey(e.target.value)}} onKeyUp={filterBySearch}></input>
        </div>
        <div className='col-md-4'>
          <select className='form-control' value={type} onChange={e => filterByType(e.target.value)}>
          <option value="all">All</option>
          <option value="premium">Premium</option>
          <option value="non-premium">Non Premium</option>
          </select>
        </div>
      </div>


      <div className='row justify-content-center mt-5'>
      {loading ? (
      <Loader></Loader>
      ) :  (
        rooms.map((room) => {
        return (
          <div  data-aos="zoom-in-up" className='col-md-9 mt-2'>

          <Room  room = {room} fromDate = {fromDate} toDate = {toDate}></Room>

        </div>
        );
      })
      )}
      
     
      </div>
    </div>
  )
}

export default Homescreen
