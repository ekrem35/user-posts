import { Card, CardHeader } from '@material-ui/core'
import React from 'react'
import { useParams, useLocation } from 'react-router-dom'

function Detail () {
  const { id } = useParams()
  const location = useLocation()
  console.log(location)
  return (
    <h1>postId: {id}</h1>
  )
}

export default Detail
