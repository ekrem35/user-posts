import React from 'react'
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core'
import { useLocation, useHistory } from 'react-router-dom'

function Detail () {
  const history = useHistory()
  const { post } = useLocation().state
  return (
    <div style={{ maxWidth: 500 }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={`https://avatars.dicebear.com/api/human/${post.userId}.svg`} />
        </ListItemAvatar>
        <ListItemText primary={post.title} />
      </ListItem>
      <ListItem>
        <ListItemText secondary ={post.body} />
      </ListItem>
      <ListItem>
        <a className="listItem" onClick={() => history.push({ pathname: `/profile/${post.id}`, state: { post } })}>See User Card</a>
      </ListItem>
    </div>
  )
}

export default Detail
