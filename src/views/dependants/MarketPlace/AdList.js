import React, { useEffect, useState, useContext } from "react";
import {
  Grid,
  Typography,
  Container,
  Icon,
  TextField,
  IconButton,
  Tab,
  Tabs,
  Fab
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import { Image, Card, CardBody } from "components";
import { API } from "helpers/index";
import { LoadingScreen, RegularButton } from "components/index";
import { LoginContext } from "contexts";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import FOOD from 'assets/img/food_logo.svg'
import MEDICINES from 'assets/img/medicine_logo.svg'
import ESSENTIALS from 'assets/img/essentials_logo.svg'
import ACCOMMODATION from 'assets/img/accomodation_logo.svg'
import OTHER from 'assets/img/other_logo.svg'


// let data = [
//   {
//     title: "Bed", suburb: "Burwood",
//     image: {
//       original: 'https://s3.au-syd.cloud-object-storage.appdomain.cloud/ipan-v2-bucket/image/profilePicture/original/Profile_7qkmXzOnjyNJ.PNG',
//       thumbnail: 'https://s3.au-syd.cloud-object-storage.appdomain.cloud/ipan-v2-bucket/image/profilePicture/original/Profile_7qkmXzOnjyNJ.PNG'
//     }
//   },
//   {
//     title: "Buiscuits", suburb: "Clayton",
//     image: {
//       original: 'https://s3.au-syd.cloud-object-storage.appdomain.cloud/ipan-v2-bucket/image/profilePicture/original/Profile_7qkmXzOnjyNJ.PNG',
//       thumbnail: 'https://s3.au-syd.cloud-object-storage.appdomain.cloud/ipan-v2-bucket/image/profilePicture/original/Profile_7qkmXzOnjyNJ.PNG'
//     }
//   },
//   {
//     title: "Toilet Paper", suburb: "Box Hill",
//     image: {
//       original: 'https://s3.au-syd.cloud-object-storage.appdomain.cloud/ipan-v2-bucket/image/profilePicture/original/Profile_7qkmXzOnjyNJ.PNG',
//       thumbnail: 'https://s3.au-syd.cloud-object-storage.appdomain.cloud/ipan-v2-bucket/image/profilePicture/original/Profile_7qkmXzOnjyNJ.PNG'
//     }
//   }
// ];

let categoriesData = [
  {
    name: "FOOD", image: FOOD
  },
  {
    name: "ESSENTIALS", image: ESSENTIALS
  },
  {
    name: "MEDICINES", image: MEDICINES
  },
  {
    name: "ACCOMMODATION", image: ACCOMMODATION
  },
  {
    name: "OTHER", image: OTHER
  }
];

const titleCase = str => {
  var sentence = str.toLowerCase().split(" ");
  for (var i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  sentence = sentence.join(" ");
  return sentence;
};

export const AdList = () => {
  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [ads, setAds] = useState();
  const [search, setSearch] = useState();
  const [value, setValue] = useState(0);
  const { loginStatus } = useContext(LoginContext);
  const [profile, setProfile] = useState();

  useEffect(() => {
    API.getCategories(setCategories);
    API.getAds(
      {
        type: "NEED",
        category: "",
        numberOfRecords: 100,
        currentPageNumber: 1
      },
      setAds
    );
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      const response = await API.getProfile();
      if (response) setProfile(response);
    };
    if (loginStatus) {
      getProfile();
    }
  }, [loginStatus]);

  useEffect(() => {
    if (search === undefined || search === "" || search === " ") {
      setAds();
      API.getAds(
        {
          type: value === 0 ? "NEED" : "OFFER",
          category:
            selectedCategory && selectedCategory !== ""
              ? selectedCategory.name.toUpperCase()
              : "",
          numberOfRecords: 100,
          currentPageNumber: 1
        },
        setAds
      );
    }
  }, [selectedCategory, value, search]);

  const handleChange = event => {
    setSearch(event.target.value);
  };

  const searchByKeyword = () => {
    if (search !== "" && search !== undefined && search !== null) {
      setSelectedCategory();
      API.searchByKeyword(
        { title: search, numberOfRecords: 100, currentPageNumber: 1 },
        setAds
      );
    }
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const AdCard = props => {
    const [image, setImage] = useState("");
    const [title, setTitle] = useState();
    const [category, setCategory] = useState("")
    const [suburb, setSuburb] = useState();
    const [type, setType] = useState();
    const [ad, setAd] = useState();
    useEffect(() => {
      if (props.image !== undefined && props.image !== null)
        setImage(props.image);
      if (props.item !== undefined && props.item !== null) {
        setAd(props.item);
        if (props.item.title !== undefined && props.item.title !== null)
          setTitle(props.item.title);
        if (
          props.item.postedBy !== undefined &&
          props.item.postedBy !== null &&
          props.item.postedBy.suburb !== undefined &&
          props.item.postedBy.suburb !== null
        )
          setSuburb(props.item.postedBy.suburb);
        if (props.item.postType !== undefined && props.item.postType !== null)
          setType(props.item.postType);
          if (props.item.category !== undefined && props.item.category !== null)
          setCategory(props.item.category);
      }
    }, [props]);


    const imageCategory = category !== undefined ? (categoriesData.filter(categoryData=> categoryData.name === category)) : ""
    const imageSrc = imageCategory[0] !== undefined ? imageCategory[0].image : ""

    return (
      <Link
        to={{
          pathname: "/adv",
          state: ad
            ? {
                item: {
                  category: ad.category,
                  description: ad.description,
                  status: ad.status,
                  title: title,
                  createdAt: ad.createdAt,
                  _id: ad._id,
                  postedBy: ad.postedBy._id,
                  type
                },
                history: "locals",
                profileId: profile ? profile._id : undefined
              }
            : {}
        }}
      >
        <Card
          style={{
            height: "80px",
            width: "100%",
            backgroundColor: "white"
          }}
        >
          <CardBody>
            <Grid container direction="row" spacing={3}>
              <Grid item xs={3}>
                <Image
                  style={{ width: '10vh', height: '10vh', borderRadius: 5 }}
                  src={imageSrc}
                  // 'https://penserra.com/wp-content/uploads/2018/03/dummy-post-square-1-300x300.jpg')}
               
                  
                    // image.original : 'https://penserra.com/wp-content/uploads/2018/03/dummy-post-square-1-300x300.jpg' :
                    // 'https://penserra.com/wp-content/uploads/2018/03/dummy-post-square-1-300x300.jpg'}
                  alt="imagepost"
                />
                {/* <LabelImportantIcon
                  color="primary"
                  style={{ fontSize: "55px", color: "white" }}
                /> */}
              </Grid>
              <Grid item container xs={9}>
                <Grid item xs={12} container justify="space-between" alignItems="baseline">
                  <Grid >
                <Typography component="p" variant="h5">
                  {title}
                </Typography>
                  </Grid>
                  <Grid item xs={5} align="right">
                <Typography variant="subtitle1">
                 <span style={{color:'red'}}>Area:</span> <span style={{color:'#00acc1'}}>{suburb}</span>
                </Typography>

                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardBody>
        </Card>
      </Link>
    );
  };

  const content = (
    <Container
      maxWidth="sm"
      style={{ marginTop: "4%", alignItems: "center", overflow: "hidden" }}
    >
      <Grid item container xs={12} justify="space-between" alignItems="center">

        <Grid item xs={12}>
         
          <Typography variant="h5" align="center">
            
          Locals allows you to offer help or ask for it from the rest of the comunity.
            We all need some random act of kindness!
            Register and Login to start helping!
       
          </Typography>
          <hr />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        spacing={1}
        justify="space-between"
        style={{ marginTop: "2%", padding:"2vh 0" }}
      >
        {categories === undefined ? (
          <LoadingScreen />
        ) : categories.length > 0 ? (
          categories.map((item, index) => {
            console.log(index)
            switch(index){
              case 0:
                item.image=FOOD;
                break;
              case 1:
                item.image=ESSENTIALS;
                break;
              case 2:
                item.image=MEDICINES
                break;
              case 3:
                item.image=ACCOMMODATION
                break;
              case 4:
                item.image=OTHER
                break;


            }
            console.log(item.image)
            return (
              <Grid
                item
                key={index}
                onClick={() => {
                  setSearch("");
                  if (
                    selectedCategory !== undefined &&
                    selectedCategory.name === item.name
                  ) {
                    setSelectedCategory("");
                  } else {
                    setSelectedCategory(item);
                  }
                }}
              >
                <div>
                  <center>
                    
                    {
                    item.image && item.image !== "" ? (
                      <Image
                        style={{ width: "8.5vh" }}
                        src={item.image && item.image !== "" ? item.image : ""} height="60px"
                        alt="imagepost"
                      />
                    ) : null}
                    <Typography
                      variant="subtitle1"
                      style={{
                        color: `${
                          selectedCategory &&
                          selectedCategory.name === item.name
                            ? "#35a1b6"
                            : ""
                        }`
                      }}
                    >
                      {titleCase(item.name)}
                    </Typography>
                  </center>
                </div>
              </Grid>
            );
          })
        ) : (
          <Typography>No categories found.</Typography>
        )}
      </Grid>
      {!loginStatus ? null : (
        <Grid item xs={12} align="right">
          <RegularButton
            fullWidth
            color="primary"
            component={Link}
            to={{ pathname: "newPost" }}
          >
            Add a new post{" "}
          </RegularButton>
        </Grid>
      )}
      <Grid container direction="row" spacing={1} style={{ marginTop: "2%" }}>
        {/* <Grid item xs={10}>
          <TextField id='standard-text' variant='outlined' label='Search' value={search} fullWidth
            onChange={handleChange}
            onKeyDown={e => { if (e.key === 'Enter') searchByKeyword(); }} />
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={() => searchByKeyword()}>
            <Icon>search</Icon>
          </IconButton>
        </Grid> */}
      </Grid>
      {search === undefined || search === "" || search === " " ? (
        <Grid>
          <Tabs
            value={value}
            TabIndicatorProps={{ style: { background: "rgb(255, 209, 30)" } }}
            textColor="inherit"
            onChange={handleTabChange}
            centered
          >
            <Tab label="Needs"style={{color: "rgb(0, 172, 193"}} />
            <Tab label="Offers" style={{color: "rgb(0, 172, 193"}} />
          </Tabs>
        </Grid>
      ) : null}
      <Grid container direction="row" spacing={1} style={{ marginTop: "3%" }}>
        {ads === undefined ? (
          <LoadingScreen />
        ) : ads.length > 0 ? (
          ads.map((item, index) => {
            return (
              <Grid item xs={12} key={index}>
                <AdCard
                  image={item.images.length > 0 ? item.images[0] : null}
                  item={item}
                />
              </Grid>
            );
          })
        ) : (
          <Typography variant="body1"  style={{lineHeight: "30px"}}>No listings found.</Typography>
        )}
      </Grid>


    </Container>
  );

  return content;
};
