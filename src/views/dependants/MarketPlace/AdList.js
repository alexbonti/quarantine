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
import Button from '@material-ui/core/Button';

import { LoginContext } from "contexts";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import FOOD from "assets/img/foods.svg";
import MEDICINES from "assets/img/medicine.svg";
import ESSENTIALS from "assets/img/essentials.svg";
import ACCOMMODATION from "assets/img/accomodation.svg";
import OTHER from "assets/img/other.svg";
import { LayoutConfig } from "configurations";

const padding = 15;

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
    name: "FOOD",
    image: FOOD
  },
  {
    name: "ESSENTIALS",
    image: ESSENTIALS
  },
  {
    name: "MEDICINES",
    image: MEDICINES
  },
  {
    name: "ACCOMMODATION",
    image: ACCOMMODATION
  },
  {
    name: "OTHER",
    image: OTHER
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
  console.log("AdList -> categories", categories)
  const [selectedCategory, setSelectedCategory] = useState();
  const [ads, setAds] = useState();
  const [search, setSearch] = useState();
  const [value, setValue] = useState(0);
  const { loginStatus } = useContext(LoginContext);
  const [profile, setProfile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const triggerAPI = async () => {
      const dataRespCategories = await API.getCategories();
      if (dataRespCategories) {
        console.log("triggerAPI -> dataRespCategories", dataRespCategories)
        const filteredData = dataRespCategories.filter((category) => category.name !== "ESSENTIALS")
        console.log("triggerAPI -> filteredData", filteredData)
        setCategories(filteredData)
      }
    }
    API.getAds(
      {
        type: "NEED",
        category: "",
        numberOfRecords: 100,
        currentPageNumber: 1
      },
      setAds
    );

    triggerAPI()
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
    const [category, setCategory] = useState("");
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

    const imageCategory =
      category !== undefined
        ? categoriesData.filter(categoryData => categoryData.name === category)
        : "";
    const imageSrc =
      imageCategory[0] !== undefined ? imageCategory[0].image : "";

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
            <Grid container  xs={12}>
              <Grid item xs={2}>
                <Image
                  style={{ width: "50px", height: "50px", borderRadius: 5 }}
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
              <Grid container xs={10} style={{backgroundColor:''}}>
                <Grid
                  item
                  xs={6}
                  justify="space-between"
                  alignItems="baseline"
                  
                >
                  <Typography component="p" variant="h5" style={{fontSize:20}}>
                      {title}
                    </Typography>
                </Grid>
                
                    
                 
                  <Grid item xs={6} align="right" style={{backgroundColor:''}}>
                    <Typography variant="subtitle1" style={{fontSize:18,lineHeight:'18px' }}>
                    
                      <span style={{ color: "#00acc1"}}>{suburb}</span>
                    </Typography>
                  </Grid>
                
              </Grid>
            </Grid>
          </CardBody>
        </Card>
      </Link>
    );
  };

  const content = (
    <>
      <Container

        style={{ alignItems: "center", overflow: "hidden", padding: 0 }}
      >
        <Grid item xs={12} style={{ height: 300, backgroundColor: LayoutConfig.theme.colors.color5, paddingLeft: padding, paddingRight: padding, paddingTop: 30, paddingBottom: 30 }}>
          <Grid item style={{ height: 80 }}>
            {
              !loginStatus ? (
                <Grid container xs={12} align='center'>
                     <Grid item xs={6} align='center'>
                     <Link to="/login"><Button size='large'  variant="contained"  style={{backgroundColor:LayoutConfig.theme.colors.color4,width:170,height:50,fontSize:19, color:'white'}}>Login</Button></Link>
                    </Grid>
                    <Grid item xs={6} align='center'>
                    <Link to="/register"><Button size='large'  variant="contained"  style={{backgroundColor:LayoutConfig.theme.colors.color4,width:170,height:50,fontSize:19, color:'white'}}>Register</Button></Link>
                    </Grid>
                  </Grid>
              ) : (
                  <Grid container xs={12}>
                    <Grid item xs={6} align='center'>
                    <Link to={{ pathname: "newNeed" }}><Button size='large'  variant="contained"  style={{backgroundColor:LayoutConfig.theme.colors.color4,width:170,height:50,fontSize:19, color:'white'}}>Need Help</Button></Link>
                    </Grid>
                    <Grid item xs={6} align='center'>
                    <Link to={{ pathname: "newOffer" }}><Button size='large'  variant="contained"  style={{backgroundColor:LayoutConfig.theme.colors.color4,width:170,height:50,fontSize:19, color:'white'}}>Offer Help</Button></Link>
                    </Grid>

                  </Grid>
                )}

          </Grid>
          <Grid item xs={12} style={{paddingLeft:padding,paddingRight:padding,height:100}}>
          <Grid item xs={12}>
          <Typography variant="h5" align="left" style={{color:'white', fontSize:28,fontWeight:'bold'}}>
                Filters
          </Typography>
          <Typography variant="h5" align="left" style={{color:'white', fontSize:20}}>
                Click the icons to filter items 
          </Typography>
          </Grid>
                
        <Grid
          container
          //direction="row"
          //spacing={1}
          xs={12}
          //justify="space-between"
          alignItems="baseline"
          style={{ marginTop: 30 }}
        >
          {categories === undefined ? (
            <LoadingScreen />
          ) : categories.length > 0 ? (
            categories.map((item, index) => {
              switch (index) {
                case 0:
                  item.image = FOOD;
                  item.uiName = "Food";
                  break;
                case 1:
                  item.image = MEDICINES;
                  item.uiName = "Meds";
                  break;
                case 2:
                  item.image = ACCOMMODATION;
                  item.uiName = "stays";
                  break;
                case 3:
                  item.image = OTHER;
                  item.uiName = "Other";
                  break;

              }
              return (
                <Grid
                  item
                  xs={3}
               
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
                  <Grid
                    item
                    xs={12}
                    style={{
                      borderRadius: "5px",
                      border: `${
                        selectedCategory && selectedCategory.name === item.name
                          ? "2px solid "+LayoutConfig.theme.colors.color6
                          : ""
                        }`
                    }}
                  >
                    <center>
                      {item.image && item.image !== "" ? (
                        <img
                          style={{
                            
                            height: "60px",
                            padding: "1px"
                          }}
                          src={
                            item.image && item.image !== "" ? item.image : ""
                          }
                          alt="imagepost"
                        />
                      ) : null}
                    </center>
                  </Grid>
                  <Grid align="center">
                    <Typography
                      variant="h6"
                      style={{
                        fontSize:20,
                        color: `${
                          selectedCategory &&
                            selectedCategory.name === item.name
                            ? "#35a1b6"
                            : ""
                          }`
                      }}
                    >
                      {titleCase(item.uiName)}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })
          ) : (
                <Typography>No categories found.</Typography>
              )}
        </Grid>


          </Grid>




        </Grid>


     
       
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
              TabIndicatorProps={{ style: { background: LayoutConfig.theme.colors.tertiary} }}
              textColor="inherit"
              onChange={handleTabChange}
              centered
            >
              <Tab label="Needs" style={{ color: LayoutConfig.theme.colors.color5, fontSize: "26px" }} />
              <Tab label="Offers" style={{ color: LayoutConfig.theme.colors.color5, fontSize: "26px" }} />
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
            <Grid item xs={12} style={{paddingLeft:padding,paddingRight:padding,align:'center'}}>
              <Typography variant="body1" style={{ lineHeight: "30px", fontSize:30 }}>
                  No listings found.
                </Typography>
              </Grid>
                
              )}
        </Grid>
      </Container>
    </>
  );

  return content;
};
