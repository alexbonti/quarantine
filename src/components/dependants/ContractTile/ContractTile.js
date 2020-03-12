import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography, Grid } from "@material-ui/core";
import { RegularButton, Card, CardBody } from "components";
import { contractType } from "configurations";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
export const ContractTile = ({ list }) => {
  return list !== undefined ? (
    <>
      {list.map((contract, key) => {
        console.log("TCL: ContractTile -> contract", contract);

        return (
          <Grid
            item
            xs={9}
            key={key}
            style={{ textDecoration: "none" }}
            component={Link}
            to={{
              pathname: `/contract`,
              state: {
                _id: contract._id,
                type: contractType(contract.badgeContent)
              }
            }}
          >
            <Card style={{ margin: "1rem 0" }}>
              <Grid container justify="center">
                <Grid
                  item
                  xs={11}
                  style={{
                    borderBottom: `.5px solid ${contract.badgeColor}`,
                    height: "26px",
                    borderRadius: "12px 12px 0 0 "
                  }}
                >
                  <Typography
                    style={{ lineHeight: "26px" }}
                    variant="subtitle1"
                    align="center"
                  >
                    {contract.badgeContent}
                  </Typography>
                </Grid>
              </Grid>
              <CardBody>
                <Grid container alignItems="center" justify="space-between">
                  <Grid item xs={5} style={{ padding: "0" }}>
                    <Typography variant="body1">{contract.title}</Typography>
                  </Grid>
                  {contract.requests ? (
                    <Grid item xs={3} align="right" style={{ padding: "0" }}>
                      <RegularButton
                        variant="outlined"
                        color="warning"
                        size="sm"
                        justIcon
                        component={Link}
                        to={{
                          pathname: "/request-list",
                          state: {
                            requests: contract.requests,
                            contractStatus: contract.badgeContent,
                            contractId: contract._id
                          }
                        }}
                      >
                        <NotificationsNoneOutlinedIcon />
                      </RegularButton>
                    </Grid>
                  ) : (
                    ""
                  )}
                </Grid>
              </CardBody>
            </Card>
          </Grid>
        );
      })}
    </>
  ) : (
    "loading"
  );
};

ContractTile.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired
};
