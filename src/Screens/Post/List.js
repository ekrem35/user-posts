/**
 * @flow
 */

import React, { Component } from 'react'
import request from '../../helpers/request'
import {
  Avatar,
  CircularProgress as Spinner,
  Divider,
  List as MUIList,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Tooltip,
  Modal,
  Backdrop,
  Fade,
  Button,
  TextField,
  Snackbar,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog
} from '@material-ui/core'
import { DeleteOutline, EditOutlined, RemoveRedEye } from '@material-ui/icons'
import Pagination from '@material-ui/lab/Pagination'
import { withRouter } from 'react-router-dom'
import ThemeStyle from '../../helpers/theme'
import { Alert } from '@material-ui/lab'
import './styles.css'

type Props = {
  history: {push: () => void}
}

class List extends Component<Props> {
    state = {
      dialogVisible: false,
      alert: { visible: false, severity: 'info', message: '' },
      loading: true,
      modalVisible: false,
      selectToEdit: { title: '', body: '', id: 0 },
      page: 0
    }

    async componentDidMount () {
      try {
        const posts: Array = await request('https://jsonplaceholder.typicode.com/posts')
        this.setState({
          posts: {
            pages:
        [posts.slice(0, 20), posts.slice(20, 40), posts.slice(40, 60), posts.slice(60, 80), posts.slice(80, 100)]
          }
        })
        setTimeout(() => this.setState({ loading: false }), 600)
      } catch (error) {
        console.error(error)
      }
    }

  handleOpen = (post, index) => {
    this.setState({ modalVisible: true, selectToEdit: post, postIndex: index })
  }

  handleClose = () => {
    this.setState({ modalVisible: false, selectToEdit: {} })
  }

  async updatePost () {
    try {
      const { selectToEdit: post, page, posts, postIndex } = this.state
      const response = await request(`https://jsonplaceholder.typicode.com/posts/${post.id}`, 'PUT', post)
      posts.pages[page][postIndex] = response
      this.setState({ posts, modalVisible: false, alert: { visible: true, severity: 'success', message: 'The post was updated' } })
    } catch (error) {
      this.setState({ modalVisible: false, alert: { visible: true, severity: 'error', message: 'The post could not be updated' } })
    }
  }

  handleChange = (key, value) => {
    this.setState(prev => ({ selectToEdit: Object.assign({}, prev.selectToEdit, { [key]: value }) }))
  };

  handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ alert: { ...this.state.alert, ...{ visible: false } } })
  }

  handleCloseDialog = accept => {
    try {
      if (!accept) {
        this.setState({ dialogVisible: false })
        return
      }
      const { posts, postIndex, page } = this.state
      const post = posts.pages[page][postIndex]
      request(`https://jsonplaceholder.typicode.com/posts/${post.id}`, 'DELETE', post)
      delete posts.pages[page][postIndex]
      this.setState({ posts, dialogVisible: false, alert: { visible: true, severity: 'info', message: 'The post was deleted' } })
    } catch (error) {
      this.setState({ dialogVisible: false, alert: { visible: true, severity: 'error', message: 'The post could not be deleted' } })
      console.error(error.message)
    }
  }

  render () {
    const { loading } = this.state
    if (loading) return <div style={{ display: 'flex', justifyContent: 'center' }}><Spinner /></div>
    const { posts, modalVisible, selectToEdit, page, alert, dialogVisible } = this.state
    const { history } = this.props
    return (
      <MUIList>
        <ThemeStyle>
          {styles =>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={styles.modal}
              open={modalVisible}
              onClose={this.handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
            >
              <Fade in={modalVisible}>
                <div className={styles.paper}>
                  <form>
                    <TextField onChange={(event) => {
                      this.handleChange('title', event.target.value)
                    }} defaultValue={selectToEdit.title} fullWidth label="Title" style={{ marginTop: 10 }} />
                    <TextField onChange={(event) => {
                      this.handleChange('body', event.target.value)
                    }} defaultValue={selectToEdit.body} multiline fullWidth label="Body" style={{ marginTop: 10 }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                      <Button onClick={() => this.setState({ modalVisible: false })} variant="contained">Cancel</Button>
                      <Button onClick={() => this.updatePost()} variant="contained" color="primary">Save</Button>
                    </div>
                  </form>
                </div>
              </Fade>
            </Modal>
          }
        </ThemeStyle>
        {posts.pages[page].map((post, index) =>
          <div key={index}>
            <ListItem style={{ padding: 25, paddingLeft: 0 }}>
              <a className="listItem" onClick={() => history.push({ pathname: `/profile/${post.id}`, state: { post } })}>
                <ListItemAvatar>
                  <Avatar src={`https://avatars.dicebear.com/api/human/${post.userId}.svg`} />
                </ListItemAvatar>
                <ListItemText secondary={post.title} />
              </a>
              <Tooltip title="Delete">
                <IconButton onClick={() => this.setState({ postIndex: index, dialogVisible: true })} aria-label="delete"><DeleteOutline /></IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton onClick={() => this.handleOpen(post, index)} aria-label="edit"><EditOutlined /></IconButton>
              </Tooltip>
              <Tooltip title="Detail">
                <IconButton
                  onClick={() => history.push({ pathname: `/post/${post.userId}`, state: { post } })}
                  style={{ color: '#13CFB1' }} aria-label="detail"><RemoveRedEye /></IconButton>
              </Tooltip>
            </ListItem>
            <Divider></Divider>
          </div>)}
        <Pagination style={{ margin: 10 }} onChange={(event, page) => this.setState({ page: page - 1 })} count={posts.pages.length} />
        <Snackbar open={alert.visible} autoHideDuration={3000} onClose={this.handleAlertClose}>
          <Alert onClose={this.handleAlertClose} severity={alert.severity}>
            {alert.message}
          </Alert>
        </Snackbar>
        <Dialog
          open={dialogVisible}
          onClose={() => this.handleCloseDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            The post will be permanently deleted
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleCloseDialog(false)} color="primary">
            Cancel
            </Button>
            <Button onClick={() => this.handleCloseDialog(true)} color="secondary">
            Delete
            </Button>
          </DialogActions>
        </Dialog>
      </MUIList>
    )
  }
}

export default withRouter(List)
