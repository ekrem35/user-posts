import React, { Component } from 'react'
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core'
import request from '../../helpers/request'
import { withRouter } from 'react-router-dom'

type Props = {
  location: {state: {post: Object}}
}

class Detail extends Component<Props> {
  state = { loading: true }
  async componentDidMount () {
    const { post } = this.props.location.state
    const user = await request('https://jsonplaceholder.typicode.com/users?id=' + post.userId)
    this.setState({ user: user[0], loading: false })
  }

  render () {
    const { user, loading } = this.state
    if (loading) return null
    return (
      <div style={{ maxWidth: 500 }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={`https://avatars.dicebear.com/api/human/${user.id}.svg`} />
          </ListItemAvatar>
          <ListItemText primary={user.name} />
        </ListItem>
        <ListItem>
          <ListItemText secondary ="Email Adress" />
          <ListItemText primary ={user.email} />
        </ListItem>
        <ListItem>
          <ListItemText secondary ="Username" />
          <ListItemText primary ={user.username} />
        </ListItem>
        <ListItem>
          <ListItemText secondary ="Phone Number" />
          <ListItemText primary ={user.phone} />
        </ListItem>
        <ListItem>
          <ListItemText secondary ="Website" />
          <ListItemText primary ={user.website} />
        </ListItem>
      </div>
    )
  }
}

export default withRouter(Detail)
