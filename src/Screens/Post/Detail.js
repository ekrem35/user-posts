import React from 'react'
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core'
import { useLocation, useHistory } from 'react-router-dom'
import { RemoveRedEye } from '@material-ui/icons'

function Detail () {
  const history = useHistory()
  const { post } = useLocation().state
  return (
    <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
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
          <a className="listItem" onClick={() => history.push({ pathname: `/profile/${post.id}`, state: { post } })}> <RemoveRedEye style={{ color: '#606060', marginRight: 10 }} /> See User Card</a>
        </ListItem>
      </div>
    </div>
  )
}

export default Detail
