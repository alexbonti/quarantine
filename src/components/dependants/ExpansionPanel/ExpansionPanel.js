import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  Grid
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

export const ExpansionPanelComponent = ({ faq, interestedData }) => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return faq !== undefined && faq.length > 0 ? (
    <div className={classes.root}>
      {faq.map((faq, key) => {
        return (
          <ExpansionPanel
            key={key}
            expanded={expanded === `panelS${key}`}
            onChange={handleChange(`panelS${key}`)}
            style={{ background: "#00acc1" }}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography style={{ flex: "100%",color:"white ",fontWeight:"900" }} className={classes.heading}>
                {faq.title}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography style={{ flex: "100%",color:"white " }} dangerouslySetInnerHTML={{ __html: faq.content }} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </div>
  ) : interestedData !== undefined && interestedData.length > 0 ? (
    <div className={classes.root}>
    {interestedData.map((person, key) => {
      return (
        <ExpansionPanel
          key={key}
          expanded={expanded === `panelS${key}`}
          onChange={handleChange(`panelS${key}`)}
          style={{ background: "#0d6772" }}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography style={{ flex: "100%" }} className={classes.heading} variant="h6">
              {person.firstName} {" "} {person.lastName} 
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
         <Grid container>
           <Grid item xs={11}>

        <Typography variant="h6" >Email: <a target="blank" href={`mailto:${person.emailId}`} >{person.emailId}</a></Typography>
           </Grid>
           <Grid item xs={11}>

        <Typography variant="h6">Location: {person.suburb}</Typography>
           </Grid>
           <Grid item xs={11}>
        <Typography variant="h6">
          Phone Number: {person.countryCode} {person.phoneNumber}
        </Typography>

           </Grid>
         </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    })}
  </div>
  ) : (
    ""
  );
};
