import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 300,
    textAlign: 'center'
  },
  avatar: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ContactCard = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
    <CardContent>
        <Avatar alt={props.name} src={props.picture} className={classes.avatar}/>
        <Typography variant="h6" component="h3">
          {props.name}
        </Typography>
        <Button size="small">Add</Button>
      </CardContent>
    </Card>
  );
}

export default ContactCard;