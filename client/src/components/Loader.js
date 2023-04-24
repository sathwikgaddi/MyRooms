import React, {useState, CSSProperties} from 'react'
import CircleLoader from "react-spinners/CircleLoader";



function Loader() {

    let [loading, setLoading] = useState(true);
  

  const override = CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };


  return (
    <div style={{marginTop : '50px'}}>
      <div className="sweet-loading text-center">
      

      <CircleLoader
        color="#000"
        loading={loading}
        cssOverride=""
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    </div>
  )
}

export default Loader
