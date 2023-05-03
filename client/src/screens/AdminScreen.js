import React , {useState, useEffect} from 'react'
import {Tabs} from 'antd'
import axios from 'axios'
import Loader from '../components/Loader';
import Swal from 'sweetalert2'
import SecureLS from "secure-ls";
import jwtDecode from 'jwt-decode';
const {TabPane} = Tabs;
const ls = new SecureLS({ encodingType: 'aes', isCompression: false });


function AdminScreen() {

    useEffect( () =>  {

        console.log("nooooooooooooooooo4")
        const token = ls.get('token')
        if(token) {
          console.group(typeof jwtDecode(token).isAdmin)
         if(jwtDecode(token).isAdmin === "No") {
            console.log("noooo")
            window.location.href = "/home"
         }
         
        }
       
    }, [])


  return (
    <div className='mt-3 ml-3 mr-3 bs'>
      <h1 className='text-center' ><b>Admin Panel</b></h1>
      <Tabs defaultActiveKey='1'>
        <TabPane tab="Bookings" key = "1">
            <Bookings></Bookings>
        </TabPane>
        <TabPane tab="Rooms" key = "2">
            <Rooms></Rooms>
        </TabPane>
        <TabPane tab="Add Room" key = "3">
            <h1> <AddRoom></AddRoom> </h1>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default AdminScreen


export function Bookings() {



    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    

    useEffect(() => {

        async function fetchData() {

        try {

            const data = (await axios.get("/api/bookings/getallbookings")).data
            setBookings(data)
            setLoading(false)
            
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(error)
        }   
    }
    fetchData()

    }, [])

    return(
        <div className='row'>

            <div className='col-md-10'>
                
                <h1>Bookings</h1>

                {loading && (<Loader></Loader>)}

                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Booking ID</th>
                            <th>User ID</th>
                            <th>Rooom</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {bookings.length && ( bookings.map(booking => {
                        return <tr>
                            <td>{booking._id}</td>
                            <td>{booking.userid}</td>
                            <td>{booking.room}</td>
                            <td>{booking.fromDate}</td>
                            <td>{booking.toDate}</td>
                            <td>{booking.status}</td>
                        </tr>
                    })  
                    )}
                    </tbody>
                </table>
                
            </div>
                
        </div>
    )

}


export function Rooms() {



    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    

    useEffect(() => {

        async function fetchData() {

        try {

            const data = (await axios.get("/api/rooms/getallrooms")).data
            setRooms(data)
            console.log(rooms)
            setLoading(false)
            
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(error)
        }   
    }
    fetchData()

    }, [])

    return(
        <div className='row'>

            <div className='col-md-10'>
                
                <h1>Rooms</h1>

                {loading && (<Loader></Loader>)}

                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Room ID</th>
                            <th>Rooom Name</th>
                            <th>Type</th>
                            <th>Rent Per Day</th>
                            <th>Max Count</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                    {rooms.length && ( rooms.map(room => {
                        return <tr>
                            <td>{room._id}</td>
                            <td>{room.name}</td>
                            <td>{room.type}</td>
                            <td>{room.rentperday}</td>
                            <td>{room.maxcount}</td>
                            <td>{room.phonenumber}</td>
                        </tr>
                    })  
                    )}
                    </tbody>
                </table>
                
            </div>
                
        </div>
    )

}

export function AddRoom() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const [name, setName] = useState('')
    const[rentperday, setrentperday] = useState()
    const[maxcount, setmaxcount] = useState()
    const[description, setdescription] = useState()
    const[phonenumber, setphonenumber] = useState()
    const[type, settype] = useState()
    const[imageurl1, setimageurl1] = useState()
    const[imageurl2, setimageurl2] = useState()
    const[imageurl3, setimageurl3] = useState()

    async function addRoom() {

        const newroom = {
            name,
            rentperday,
            maxcount,
            description,
            phonenumber,
            type,
            imgeurls:[imageurl1, imageurl2, imageurl3]
        }

        try {
            setLoading(true)
            console.log(newroom.imageurls)
            const result = await axios.post('/api/rooms/addroom', newroom).data
            console.log(result)
            setLoading(false)
            Swal.fire("Congrats", "New Room Added Successfully", "success").then(result => {
                window.location.href = "/home"
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(error)
            Swal.fire("Oops", "Something Went Wrong", "error")
        }

        

    }



    return(
        <div className='row'>
            {loading && <Loader></Loader>}
            <div className='col-md-5'>
                <input type='text' className = 'form-control' placeholder='Room Name' value={name} onChange = {(e) => {setName(e.target.value)}}></input>
                <input type='text' className = 'form-control' placeholder='Rent per Day' value={rentperday} onChange = {(e) => {setrentperday(e.target.value)}}></input>
                <input type='text' className = 'form-control' placeholder='Max-Count' value={maxcount} onChange = {(e) => {setmaxcount(e.target.value)}}></input>
                <input type='text' className = 'form-control' placeholder='Description' value={description} onChange = {(e) => {setdescription(e.target.value)}}></input>
                <input type='text' className = 'form-control' placeholder='Phone Number' value={phonenumber} onChange = {(e) => {setphonenumber(e.target.value)}}></input>
            </div>
            <div className='col-md-5'>
            <input type='text' className = 'form-control' placeholder='Type' value={type} onChange = {(e) => {settype(e.target.value)}}></input>
            <input type='text' className = 'form-control' placeholder='Image URL 1' value={imageurl1} onChange = {(e) => {setimageurl1(e.target.value)}}></input>
            <input type='text' className = 'form-control' placeholder='Image URL 2' value={imageurl2} onChange = {(e) => {setimageurl2(e.target.value)}}></input>
            <input type='text' className = 'form-control' placeholder='Image URL 3' value={imageurl3} onChange = {(e) => {setimageurl3(e.target.value)}}></input>

            <div className = 'text-right'>
                <button className='btn btn-primary mt-2' onClick={addRoom}>Add Room</button>
            </div>

            <div></div>
            </div>
        </div>
    )
}