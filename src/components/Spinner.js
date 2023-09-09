import React from 'react'
import loading from './Loading.gif'

function Spinner(){
    return (
      <div className='text-center'>
        <img src={loading} width='80px' alt="loading" />
      </div>
    )
}

export default Spinner