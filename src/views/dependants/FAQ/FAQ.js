import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Grid , Typography} from "@material-ui/core";
import { ExpansionPanelComponent } from "components";
import { API } from "helpers/index";

const FAQ = props => {
  const [FAQData, setFAQData] = useState([]);
  console.log("FAQData", FAQData);

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

    <Grid item xs={11} md={7} lg={5}>
        <Typography variant="h5">Frequent Asked Questions</Typography>
    </Grid>
      <Grid item xs={11} md={7} lg={5} style={{padding: "3vh 0"}}>
        <ExpansionPanelComponent faq={FAQData} />
      </Grid>
    </Grid>
  );
};

export default withRouter(FAQ);
