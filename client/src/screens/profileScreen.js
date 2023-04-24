import React, { useEffect, useState } from 'react'
import {Tabs} from 'antd'
import axios from 'axios'
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2'
import { Space, Tag } from 'antd';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
  } from '@ant-design/icons';

import SecureLS from "secure-ls";
import jwtDecode from 'jwt-decode';

const ls = new SecureLS({ encodingType: 'aes', isCompression: false });

const {TabPane} = Tabs;
function ProfileScreen() {

  var decoded = {}
  const token = ls.get('token')
  if(token) {
   decoded = jwtDecode(token);
  }

useEffect(() => {
    if(!token) {
        window.location.href = '/login'
    }
}, [])


  return (
    <div className='ml-3 mt-3'>
      <Tabs defaultActiveKey='1'>
        <TabPane tab="Profile" key = "1">
            <h1> My Profile </h1>
            <br>
            </br>

            <h1>Name: {decoded.name}</h1>
            {/* <h1>Email: {d.email}</h1> */}
            <h1>isAdmin : {decoded.isAdmin == "YES" ? 'YES' : 'NO'}</h1>

        </TabPane>
        <TabPane tab="Bookings" key = "2">
            <MyBookings></MyBookings>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ProfileScreen





export function MyBookings() {

  var decoded = {}
  const token = ls.get('token')
  if(token) {
   decoded = jwtDecode(token);
  }
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(false);
    const[error, setError] = useState();

    useEffect( () =>  {
        async function fetchData() {
        try {
            setLoading(true)
            const bookings = await(await axios.post('/api/bookings/getbookingsbyuserid', {userid: decoded.userid})).data
            setBookings(bookings)
            setLoading(false)
        }

        catch(e) {
            console.log(e)
            setLoading(false)
            setError(error)
        }
        }
        fetchData()

        }, [])

        async function cancelBooking(bookingid, roomid) {

            try {
                setLoading(true)
                const result = await(await axios.post('/api/bookings/cancelbooking', {bookingid, roomid})).data
                console.log(result)
                setLoading(false)
                Swal.fire("Congrats", "Your booking has been cancelled", "success").then(result => {
                    window.location.reload()
                })
            } catch (error) {
                console.log(error)
                setLoading(false)
                Swal.fire("Oops", "Something went wrong", "error")
            }

        }
   


  return (
    <div>
      <div className='row'>

        <div className='col-md-6'>
            {loading && (<Loader></Loader>)}
            {bookings && (bookings.map(booking => {

                   return  <div className='bs ml-5'>
                        <p style={{textAlign: "right"}}> {booking.status == 'booked' ? <Tag icon={<CheckCircleOutlined />} color="success">CONFIRMED</Tag> : <Tag icon={<CloseCircleOutlined />} color="error">CANCELLED</Tag>}</p>
                        <h1>{booking.room}</h1>
                        <p><b>Booking id:</b> {booking._id}</p>
                        <p><b>Checkin Date:</b> {booking.fromDate}</p>
                        <p><b>Checkout Date:</b> {booking.toDate}</p>
                        <p><b>Total Amount:</b> {booking.totalamount}</p>
                        

                        {booking.status !== "cancelled" && (
                        <div className='text-right'>
                            <button className='btn btn-primary' onClick={()=> {cancelBooking(booking._id, booking.roomid)}}>Cancel Booking</button>
                        </div>)}
                    </div>

            }))}
        </div>

      </div>
    </div>
  )
}
