import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import {Heading} from "components"
import {Grid, Typography} from "@material-ui/core"
import { FourOFour } from 'views/common/FourOFour/FourOFour'
import moment from "moment";
 

const News = props => {

    if(props.location.state === null || props.location.state === undefined){return <FourOFour /> }
    const {news} = props.location.state
    return news !== undefined ? (<> 
    <Grid container justify="center">
        <Grid item xs={11} md={7} component={Link} to="/home"  style={{textDecoration: "none"}}>
        <Heading title="  <  Back" color="primary" />
        </Grid>
        <Grid item xs={11} md={7} style={{padding: "1vh 0"}}>
            <Typography variant="h4">{news.title}</Typography>
        </Grid>
        <Grid item xs={11} md={7}>
            <img  alt="news"src={news.imageURL} style={{width: "100%", borderRadius: "10px", maxHeight:" 500px"}} />
        </Grid>
        <Grid item xs={11} md={7} style={{padding: "1vh 0"}}>
            <Typography 
            variant="caption" >
                {moment().format("LL")}
            </Typography>
        </Grid>
        <Grid item xs={11} md={7}>
            <Typography 
            variant="body1" 
            dangerouslySetInnerHTML={{ __html: news.content }}
           />
        </Grid>
    </Grid>
    </>) : ""
}


export default withRouter(News)