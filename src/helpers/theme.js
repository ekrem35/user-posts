import { makeStyles } from '@material-ui/core'
import { FunctionComponent } from 'react'

type StyledComponent = (styles: Object) => any;

interface Props {
  children: StyledComponent;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: 600
  }
}))

const ThemeStyle: FunctionComponent<Props> = ({
  children
}) => {
  const style: Object = useStyles()
  return children(style)
}

export default ThemeStyle
