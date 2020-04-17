//Written by Alessio Bonti 
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { LayoutConfig } from "configurations";



const useStyles = makeStyles({
  root: {
    border: '1px solid #888888',
    margin: 'auto',
    borderRadius: 0,
    backgroundColor: 'white'
  },
  content: {
    padding: 24,
  },
  media: {
    height: 140,
  },
});

export const NewsBox = props=>{
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.news.imageURL}
          title={props.news.title}
        />
        <CardContent>
    
          <Typography gutterBottom variant="h5" component="h2" style={{
    fontSize: 18,
    fontWeight: 'bold',
    color:'#888888',
    marginBottom: '0.4em',
  }}>
         { props.news.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}