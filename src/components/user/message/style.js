import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  messageHeader: {
    display: 'flex',
    flexWrap: 'wrap',
    '& .message-name': { color: 'rgba(0,0,0,.45)' },
    '& .message-time': { color: '#ccc', marginLeft: 'auto' },
    '& .message-emails': {
      color: 'rgba(0,0,0,.65)',
      '& *': { marginRight: '1rem' },
    },
    '& .message-time': { color: '#ccc', marginLeft: 'auto' },
  },
});
