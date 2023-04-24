import React, {useState, useEffect} from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment'
import StripeCheckout from 'react-stripe-checkout';
import Swal from "sweetalert2"
import SecureLS from "secure-ls";
import jwtDecode from 'jwt-decode';

const ls = new SecureLS({ encodingType: 'aes', isCompression: false });

function BookingScreen({match}) {

    const [loading, setLoading] = useState(true);
    const[error, setError] = useState();
    const [room, setRoom] = useState();
    const params = useParams();
    const roomid = params.roomid
    const fromDate = moment(params.fromDate, 'DD-MM-YYYY')
    const toDate = moment(params.toDate, 'DD-MM-YYYY')

    const totalDays = moment.duration(toDate.diff(fromDate)).asDays()+1;
    const [totalAmount, setTotalAmount] = useState()
    const [userid, setUserId] = useState('')
    const [name, setName] = useState('')
  
    useEffect( () =>  {

      
      const token = ls.get('token')
      if(token) {
        
       setUserId(jwtDecode(token).userid)
       setName(jwtDecode(token).name)
      }
      else {
        window.location.href = "/login"
      }

        async function fetchData() {
        try {
          console.log(params.roomid)
          const data = (await axios.post('/api/rooms/getroombyid', {roomid : params.roomid})).data
          setTotalAmount(totalDays*data.rentperday)
          setRoom(data)
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


   async  function onToken(token){

      
      const bookingDetails = {
        room,
        userid,
        fromDate,
        toDate,
        totalAmount,
        totalDays,
        token

      }

      try {
        setLoading(true);
        const result = await axios.post('/api/bookings/bookroom', bookingDetails)
        setLoading(false);
        Swal.fire("Congratulations", "Your room booked Successfully", "success").then(result => {
          window.location.href = "/profile"
        })
      } catch (error) {
        setLoading(false);
        Swal.fire("Oops", "Something went wrong", "error")
      }
    }
    
  return (
    <div className='m-5'>
      {loading ? <h1><Loader></Loader></h1> : room ?   <div> 
        
          <div className='row justify-content-center mt-5 bs' >
            <div className='col-md-6'>
              <h1>
                {room.name}
              </h1>
              <img src = {room.imgeurls[0]} className = "bigimg"></img>
            </div>
            <div className='col-md-6'>
              <div style={{textAlign:'right'}}>
              <h1>Booking Details</h1>
              <hr></hr> 

              <b>
                <p>Name: {name}</p>
                <p>From Date: {params.fromDate}</p>
                <p>To Date: {params.toDate}</p>
                <p>Max Count: {room.maxcount}</p>
              </b>
              </div>

              <div style={{textAlign:'right'}}>
                <b>
                <h1>Amount</h1>
                <hr></hr>
                  <p>Total days: {totalDays} </p>
                  <p>Rent per day: {room.rentperday}</p>
                  <p>Total Amount: {totalAmount}</p>
                </b>
              </div>

              <div style={{float: "right"}}>
                

                <StripeCheckout
                  currency='USD'
                  amount={totalAmount*100}
                  token={onToken}
                  stripeKey="pk_test_51MyGL1JEu8LiqnuffixE8R5alO1p8IBNOC4aGPIpBhmFfsx1SvGFiUxSdBzbZXnQkNTja53FCRsw3t8JCtBo9Kmx00Lh0DjbM8"
                >

                      <button className='btn btn-primary' >Pay Now</button>

                </StripeCheckout>
                </div>
              
            </div>
          </div>

        </div> : (<Error></Error>)}
    </div>
  )
}

export default BookingScreen
