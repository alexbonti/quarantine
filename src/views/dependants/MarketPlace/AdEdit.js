import React, { useState } from "react";
import {
  Grid,
  Typography,
  Container,
  TextField,
  // IconButton,
  Button,
  FormControl,
  MenuItem,
  Select
  // Paper, MobileStepper, Icon
} from "@material-ui/core";
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Redirect, withRouter } from "react-router-dom";
import // Image,
// notify
"components";
import { API } from "helpers/index";
import { CustomInput, RegularButton } from "components/index";
// import DeleteIcon from '@material-ui/icons/Delete';
// import Dropzone from 'react-dropzone';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

// const useStyles = makeStyles(theme => ({
//   root: {
//     maxWidth: 400,
//     flexGrow: 1,
//   },
//   header: {
//     display: 'flex',
//     alignItems: 'center',
//     height: 50,
//     paddingLeft: theme.spacing(4),
//     backgroundColor: theme.palette.background.default,
//   },
//   img: {
//     height: 255,
//     maxWidth: 400,
//     overflow: 'hidden',
//     display: 'block',
//     width: '100%',
//   },
// }));

const AdEdit = props => {
console.log("props", props)

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [redirect, setRedirect] = useState(false);



  const handleChange = (event, variant) => {
    if (variant === "title") setTitle(event.target.value);
    else setDescription(event.target.value);
  };


  if (redirect) return <Redirect to={{ pathname: "/marketplace" }} />;

  const content = (
    <Container
      maxWidth="sm"
      style={{ marginTop: "5%", marginBottom: "5%", alignItems: "center" }}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Edit your Adv </Typography>
        </Grid>
        <Grid item xs={12}>
        <CustomInput
            id="standard-text-description "
            labelText="Title *"
            required
            fullWidth
            inputProps={{
              label: "Title ",
              placeholder: "Title ",
              name: "Title ",
              value: title,
              onChange: e => handleChange(e, "title")
            }}
            formControlProps={{
              fullWidth: true
            }}
          />

        </Grid>

        <Grid item xs={12}>
          <CustomInput
            id="standard-text-description "
            labelText="Description *"
            required
            fullWidth
            inputProps={{
              label: "Description ",
              placeholder: "Description ",
              name: "Description ",
              value: description,
              onChange: e => handleChange(e, "description")
            }}
            formControlProps={{
              fullWidth: true
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row">
            <Grid item xs={5}>
              <Typography>Select Category:</Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControl>
                <Select
                  value={category}
                  onChange={e => {
                    setCategory(e.target.value);
                  }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Category
                  </MenuItem>
                  <MenuItem value={"FOOD"}>Food</MenuItem>
                  <MenuItem value={"ESSENTIALS"}>Essentials</MenuItem>
                  <MenuItem value={"MEDICINES"}>Medicines</MenuItem>
                  <MenuItem value={"FURNITURE"}>Furniture</MenuItem>
                  <MenuItem value={"OTHER"}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row">
            <Grid item xs={5}>
              <Typography>Select Type:</Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControl>
                <Select
                  value={type}
                  onChange={e => {
                    setType(e.target.value);
                  }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Type
                  </MenuItem>
                  <MenuItem value={"NEED"}>Need</MenuItem>
                  <MenuItem value={"OFFER"}>Offer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <RegularButton
            fullWidth
            color="primary"
            onClick={() =>
              API.createListing(
                {
                  title: title,
                  description: description,
                  images: [],
                  category: category,
                  postType: type
                },
                () => {
                  setRedirect(true);
                }
              )
            }
          >
            Post
          </RegularButton>
        </Grid>
      </Grid>
    </Container>
  );
  return content;
};

export default withRouter(AdEdit);
