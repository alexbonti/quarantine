import React, { useEffect, useState } from "react";
import { Grid, Typography, Card, CardContent, Container, Icon, TextField, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import {  Image } from "components";
import { API } from "helpers/index";
import { LoadingScreen } from "components/index";

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

  useEffect(() => {
    if (search === '' || search === ' ')
      API.getAds({ category: '', numberOfRecords: 100, currentPageNumber: 1 }, setAds);
  }, [search]);

  useEffect(() => {
    API.getAds({ category: '', numberOfRecords: 100, currentPageNumber: 1 }, setAds);
    API.getCategories(setCategories);
  }, []);

  useEffect(() => {
    if (selectedCategory !== undefined)
      API.getAds({ category: selectedCategory !== '' ? selectedCategory.name.toUpperCase() : '', numberOfRecords: 100, currentPageNumber: 1 }, setAds);
  }, [selectedCategory]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const searchByKeyword = () => {
    setSelectedCategory();
    API.searchByKeyword({ title: search, numberOfRecords: 100, currentPageNumber: 1 }, setAds);
  }

  console.log("RENDER");

  const AdCard = (props) => {
    const [image, setImage] = useState('');
    const [title, setTitle] = useState();
    const [suburb, setSuburb] = useState();
    useEffect(() => {
      if (props.image !== undefined && props.image !== null)
        setImage(props.image);
      if (props.title !== undefined && props.title !== null)
        setTitle(props.title);
      if (props.suburb !== undefined && props.suburb !== null)
        setSuburb(props.suburb);
    }, [props]);

    return (<Card style={{ height: '100%', width: '100%' }}>
      <CardContent>
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
            <Typography variant='subtitle1'>{<Icon fontSize='small'>room</Icon>}{suburb}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>)
  };

  const CategoryCard = (props) => {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
      if (props.name)
        setName(props.name);
      if (props.image)
        setImage(props.image);
      if (props.selected !== undefined && props.name !== undefined && props.selected.name.toLowerCase() === props.name.toLowerCase())
        setIsSelected(true);
    }, [props]);

    return (
      <div><center>
        <Image
          style={{ width: '6vh', height: '6vh', borderRadius: 5 }}
          src={image && image !== '' ? image : 'https://penserra.com/wp-content/uploads/2018/03/dummy-post-square-1-300x300.jpg'}
          alt="imagepost"
        />
        <Typography variant='subtitle1' style={{ color: `${isSelected ? 'red' : ''}` }}>{name}</Typography>
      </center></div>
    );
  };

  const content = (
    <Container maxWidth='sm' style={{ marginTop: '5%', marginBottom: '5%', alignItems: 'center' }}>
      <Grid item xs={11} md={7} lg={7}>
        <Typography variant="h5">Marketplace</Typography>
      </Grid>
      <Grid container direction='row' spacing={1} justify='space-between' style={{ marginTop: '2%' }}>
        {categories === undefined ? <LoadingScreen /> : categories.length > 0 ? categories.map((item, index) => {
          return (
            <Grid item xs={2} key={index} onClick={() => {
              if (selectedCategory !== undefined && selectedCategory.name === item.name)
                setSelectedCategory('');
              else setSelectedCategory(item);
              // API.getAds({ category: item.name.toUpperCase(), numberOfRecords: 100, currentPageNumber: 1 }, setAds);
              }}>
              <CategoryCard name={titleCase(item.name)} image={item.image} selected={selectedCategory} />
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
      <Grid container direction='column' spacing={1} style={{ marginTop: '3%' }}>
        {ads === undefined ? <LoadingScreen /> : ads.length > 0 ? ads.map((item, index) => {
          return (
            <Grid item xs={12} key={index}>
              <AdCard title={item.title} image={item.images.length > 0 ? item.images[0] : null} suburb={item.postedBy.suburb} />
            </Grid>
          );
        }) : <Typography>No listings found.</Typography>}
      </Grid>
    </Container>
  );

  return content;
}