import React, { Component } from 'react'
import loading from './Loading.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} width='80px' alt="loading" />
      </div>
    )
  }
}

export default Spinner