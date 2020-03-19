import React, { useEffect, useState, useContext } from "react";
import { Grid, Typography, Container, Icon, TextField, IconButton, Tab, Tabs, Fab } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { Link } from "react-router-dom";
import { Image, Card, CardBody } from "components";
import { API } from "helpers/index";
import { LoadingScreen } from "components/index";
import { LoginContext } from "contexts"

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

// let categoriesData = [
//   {
//     name: "Food", image: "https://s3.au-syd.cloud-object-storage.appdomain.cloud/ipan-v2-bucket/image/profilePicture/thumb/Thumb_Profile_6HkhFuAGMeti.jpg"
//   },
//   {
//     name: "Essentials", image: "https://s3.au-syd.cloud-object-storage.appdomain.cloud/ipan-v2-bucket/image/profilePicture/thumb/Thumb_Profile_PWq3f7t2LNwc.jpg"
//   },
//   {
//     name: "Medicines", image: "https://s3.au-syd.cloud-object-storage.appdomain.cloud/ipan-v2-bucket/image/profilePicture/thumb/Thumb_Profile_xLQ07cnRHgae.jpg"
//   },
//   {
//     name: "Furniture", image: "https://s3.au-syd.cloud-object-storage.appdomain.cloud/ipan-v2-bucket/image/profilePicture/thumb/Thumb_Profile_occWmjh69Mqj.jpg"
//   },
//   {
//     name: "Other", image: "https://s3.au-syd.cloud-object-storage.appdomain.cloud/ipan-v2-bucket/image/profilePicture/thumb/Thumb_Profile_PWq3f7t2LNwc.jpg"
//   }
// ];

const titleCase = (str) => {
  var sentence = str.toLowerCase().split(" ");
  for (var i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  sentence = sentence.join(" ");
  return sentence;
}

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
    API.getAds({ type: "NEED", category: '', numberOfRecords: 100, currentPageNumber: 1 }, setAds);
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      const response = await API.getProfile();
      if (response) setProfile(response);
    }
    if (loginStatus) {
      getProfile();
    }
  }, [loginStatus]);

  useEffect(() => {
    if (search === undefined || search === '' || search === ' ') {
      setAds();
      API.getAds({
        type: value === 0 ? "NEED" : "OFFER",
        category: selectedCategory && selectedCategory !== '' ? selectedCategory.name.toUpperCase() : '',
        numberOfRecords: 100,
        currentPageNumber: 1
      }, setAds)
    }
  }, [selectedCategory, value, search]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const searchByKeyword = () => {
    setSelectedCategory();
    API.searchByKeyword({ title: search, numberOfRecords: 100, currentPageNumber: 1 }, setAds);
  }

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const AdCard = (props) => {
    const [image, setImage] = useState('');
    const [title, setTitle] = useState();
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
        if (props.item.postedBy !== undefined && props.item.postedBy !== null && props.item.postedBy.suburb !== undefined && props.item.postedBy.suburb !== null)
          setSuburb(props.item.postedBy.suburb);
        if (props.item.postType !== undefined && props.item.postType !== null)
          setType(props.item.postType);
      }
    }, [props]);

    return (
      <Link to={{
        pathname: '/adv', state: ad ? {
          item: { category: ad.category, description: ad.description, status: ad.status, title: title, createdAt: ad.createdAt, _id: ad._id, postedBy: ad.postedBy._id },
          profileId: profile ? profile._id : undefined
        } : {}
      }}>
        <Card
          style={{ height: '100%', width: '100%', background: '#4c586a', backgroundColor: '#4c586a' }}
        >
          <CardBody>
            <Grid container direction='row' spacing={3}>
              <Grid item xs={4}>
                <Image
                  style={{ width: '10vh', height: '10vh', borderRadius: 5 }}
                  src={image ? image.thumbnail && image.thumbnail !== '' ? image.thumbnail : image.original && image.original !== '' ?
                    image.original : 'https://penserra.com/wp-content/uploads/2018/03/dummy-post-square-1-300x300.jpg' :
                    'https://penserra.com/wp-content/uploads/2018/03/dummy-post-square-1-300x300.jpg'}
                  alt="imagepost"
                />
              </Grid>
              <Grid item xs={7}>
                <Typography component='p' variant='h5'>{title}</Typography>
                <Typography variant='subtitle1'>({type === "NEED" ? "Needed" : "Offered"})</Typography>
                <Typography variant='subtitle1'>{<Icon fontSize='small'>room</Icon>}{suburb}</Typography>
              </Grid>
            </Grid>
          </CardBody>
        </Card></Link>)
  };

  const content = (
    <Container maxWidth='sm' style={{ marginTop: '4%', alignItems: 'center', overflow: 'hidden' }}>
      <Grid item xs={5}>
        <Typography inline variant="h5" align='left'>Marketplace
          </Typography>
      </Grid>
      <Grid container direction='row' spacing={1} justify='space-between' style={{ marginTop: '2%' }}>
        {categories === undefined ? <LoadingScreen /> : categories.length > 0 ? categories.map((item, index) => {
          return (
            <Grid item key={index}
              onClick={() => {
                setSearch('');
                if (selectedCategory !== undefined && selectedCategory.name === item.name) {
                  setSelectedCategory('');
                } else {
                  setSelectedCategory(item);
                }
              }}>
              <div><center>
                {item.image && item.image !== '' ? <Image
                  style={{ width: '6vh', height: '6vh', borderRadius: 5 }}
                  src={item.image && item.image !== '' ? item.image : ''}
                  alt="imagepost"
                /> : null}
                <Typography variant='subtitle1' style={{ color: `${selectedCategory && selectedCategory.name === item.name ? 'red' : ''}` }}>{titleCase(item.name)}</Typography>
              </center></div>
            </Grid>
          );
        }) : <Typography>No categories found.</Typography>}
      </Grid>
      <Grid container direction='row' spacing={1} style={{ marginTop: '2%' }}>
        <Grid item xs={10}>
          <TextField id='standard-text' variant='outlined' label='Search' value={search} fullWidth
            onChange={handleChange}
            onKeyDown={e => { if (e.key === 'Enter') searchByKeyword(); }} />
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={() => searchByKeyword()}>
            <Icon>search</Icon>
          </IconButton>
        </Grid>
      </Grid>
      {search === undefined || search === '' || search === ' ' ? <Grid>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleTabChange}
          centered
        >
          <Tab label="Needs" />
          <Tab label="Offers" />
        </Tabs>
      </Grid> : null}
      <Grid container direction='row' spacing={1} style={{ marginTop: '3%', maxHeight: '61vh', overflow: 'auto' }}>
        {ads === undefined ? <LoadingScreen /> : ads.length > 0 ? ads.map((item, index) => {
          return (
            <Grid item xs={12} key={index}>
              <AdCard image={item.images.length > 0 ? item.images[0] : null} item={item} />
            </Grid>
          );
        }) : <Typography>No listings found.</Typography>}
      </Grid>
      <Fab color="primary" aria-label="add" style={{ position: 'absolute', right: 6, bottom: 62 }}
        component={Link} to={{ pathname: 'newPost' }}>
        <AddIcon />
      </Fab>
    </Container>
  );

  return content;
}