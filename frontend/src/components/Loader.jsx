import React from 'react'

const Loader = ({icon}) => {
  return (
    <div className='loader'>
          <span className="material-symbols-outlined">{icon}</span>
    </div>
  )
}

export default Loader