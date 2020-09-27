import React from 'react'
import { useParams } from 'react-router-dom'

function Detail () {
  const { id } = useParams()
  return <div>profile id : {id}</div>
}

export default Detail
