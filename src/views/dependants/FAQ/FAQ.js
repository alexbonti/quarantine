import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Grid , Typography} from "@material-ui/core";
import { ExpansionPanelComponent } from "components";
import { API } from "helpers/index";

const FAQ = props => {
  const [FAQData, setFAQData] = useState([]);

  useEffect(() => {
    const callAPI = async () => {
      let data = {
        category: "FAQ",
        numberOfRecords: 10
      };
      const FAQResp = await API.getNews(data);
      if (FAQResp) {
        setFAQData(FAQResp.response.data.data.data);
      }
    };
    callAPI();
  }, []);
  return (
    <Grid container justify="center" style={{padding: "2vh 0"}}>


    <Grid item xs={11}  md={7} lg={7}>
      
            <Typography variant="h5" align="center"> These are confusing times, so we have collected the most important information! </Typography>
            <hr />
          </Grid>
    
      <Grid item xs={11} md={7} lg={7} style={{padding: "3vh 0"}}>
        <ExpansionPanelComponent faq={FAQData} />
      </Grid>
    </Grid>
  );
};

export default withRouter(FAQ);
