import React, { useEffect, useState } from "react";

import "./App.css";

import News from "../models/News";

import axios from "axios";

import AllNews from "../features/dashboard/AllNews";

import Button from "@mui/material/Button";

import GetAppIcon from "@mui/icons-material/GetApp";
import Stack from "@mui/material/Stack";

import FavoriteIcon from "@mui/icons-material/Favorite";

import Alert from "@mui/material/Alert";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import ApiManager from "../utilities/apiManager";

const App = () => {
  const [articles, setArticles] = useState<News[]>([]);

  const [cart, setCart] = useState<News[]>([]);

  const [isGetNewsClicked, setGetNewsClicked] = useState<boolean>(false);
  const [isCopyNewsClicked, setCopyNewsClicked] = useState<boolean>(false);

  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);
  const [editSuccess, setEditSuccess] = useState<boolean>(false);

  useEffect(() => {
    const url =
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=b972218951264bc78d6a4b217d61843d";

    axios(url).then((data) => {
      // console.log(data.data.articles);

      let newsList: News[] = data.data.articles;

      const allNews = newsList.map((news: News) => {
        // console.log(news.author);
        const newNews = new News(
          news.author,
          news.title,
          news.description,
          news.urlToImage,
          news.publishedAt
        );
        // console.log(newNews);
        return newNews;
      });

      setArticles(allNews);
    });

    ApiManager.NewsService.GetNews().then(response => {
      // we should always check is status value ok/success/true
      if (response.status == 'ok') {
        
        const allNews = response.articles.map((news: News) => {
          
          const newNews = new News(
            news.author,
            news.title,
            news.description,
            news.urlToImage,
            news.publishedAt
          );
         
          return newNews;
        });
        setArticles(allNews);
      }

    });

  }, []);

  const addToFavourite = (favouriteNews: News) => {
    // console.log(favouriteNews);

    setCart([...cart, favouriteNews]);

    // console.log(cart);
  };

  const setCopyNews = () => {
    setGetNewsClicked(false);
    setCopyNewsClicked(!isCopyNewsClicked);
  };

  const setGetNews = () => {
    setCopyNewsClicked(false);
    setGetNewsClicked(!isGetNewsClicked);
  };

  const deleteNews = (id: string) => {
    // console.log(id);

    const newNews = articles.filter((article) => article.id !== id);

    setArticles(newNews);

    const newCart = cart.filter((article) => article.id !== id);

    setCart(newCart);

    setDeleteSuccess(true);

    setOpen(true);
  };

  const editedNews = (editedNews: News) => {
    let newNews = articles.filter((article) => article.id !== editedNews.id);

    setArticles([editedNews, ...newNews]);

    newNews = cart.filter((article) => article.id !== editedNews.id);

    setCart([editedNews, ...newNews]);

    setEditSuccess(true);
    setOpen(true);
  };

  // Success Toast starts

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  //Success Toast ends

  return (
    <div className="App">
      <div className="buttonContainer">
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<GetAppIcon />}
            onClick={setGetNews}
          >
            Get News
          </Button>
          <Button
            variant="contained"
            endIcon={<FavoriteIcon />}
            onClick={setCopyNews}
          >
            Show Favourite News
          </Button>
        </Stack>
      </div>

      {isGetNewsClicked && (
        <AllNews
          allNews={articles}
          addToFavourite={addToFavourite}
          editNews={false}
          deleteNews={deleteNews}
          editedNews={editedNews}
        />
      )}

      {isCopyNewsClicked && (
        <AllNews
          allNews={cart}
          addToFavourite={addToFavourite}
          editNews={true}
          deleteNews={deleteNews}
          editedNews={editedNews}
        />
      )}

      {deleteSuccess && (
        // <Stack sx={{ width: "100%" }} spacing={2} className="success">
        //   <Alert severity="success">Deleted Successfully!</Alert>
        // </Stack>

        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Deleted Successfully!
            </Alert>
          </Snackbar>
        </Stack>
      )}

      {editSuccess && (
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              News Edited Successfully!
            </Alert>
          </Snackbar>
        </Stack>
      )}

      {setTimeout(() => {
        setDeleteSuccess(false);
        setOpen(false);
      }, 6000)}

      {setTimeout(() => {
        setEditSuccess(false);
        setOpen(false);
      }, 10000)}
    </div>
  );
};

export default App;
