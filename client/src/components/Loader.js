import React, {useState, CSSProperties} from 'react'
import CircleLoader from "react-spinners/CircleLoader";



function Loader() {

    let [loading, setLoading] = useState(true);


  return (

      <div className="sweet-loading text-center">
      

      <CircleLoader color="#000" loading={loading} size={80} css = ''/>
    </div>
  )
}

export default Loader
