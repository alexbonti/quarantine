import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography
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

export const ExpansionPanelComponent = ({ faq }) => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return faq !== undefined && faq.length > 0 ? (
    <div className={classes.root}>
      {faq.map((faq, key) => {
        return (
          <>
            <ExpansionPanel
              key={key}
              expanded={expanded === `panelS${key}`}
              onChange={handleChange(`panelS${key}`)}
              style={{ backgroundColor: " #5f5f5f" }}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography
                  style={{ flex: "100%" }}
                  className={classes.heading}
                >
                  {faq.title}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography dangerouslySetInnerHTML={{ __html: faq.content }} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </>
        );
      })}
    </div>
  ) : (
    ""
  );
};
