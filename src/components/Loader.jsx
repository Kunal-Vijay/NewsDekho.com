import React, { Component } from 'react'
import loading from '../loading.gif'

export default class Loader extends Component {
  render() {
    return (
      <div className='d-flex align-items-center justify-content-center'>
          <img className="my-3" src={loading} alt="loading..." />
      </div>
    )
  }
}


