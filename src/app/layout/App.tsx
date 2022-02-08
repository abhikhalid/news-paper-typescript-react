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

const App = () => {
  const [articles, setArticles] = useState<News[]>([]);

  const [cart, setCart] = useState<News[]>([]);

  const [isGetNewsClicked, setGetNewsClicked] = useState<boolean>(false);
  const [isCopyNewsClicked, setCopyNewsClicked] = useState<boolean>(false);

  const [deleteSuccess, setDeleteSuccess] = useState(false);

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
  };

  const editedNews = (editedNews: News) => {
    let newNews = articles.filter((article) => article.id !== editedNews.id);

    setArticles([editedNews, ...newNews]);

    newNews = cart.filter((article) => article.id !== editedNews.id);

    setCart([editedNews, ...newNews]);
  };

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
        <Stack sx={{ width: "100%" }} spacing={2} className="success">
          <Alert severity="success">Deleted Successfully!</Alert>
        </Stack>
      )}

      {setTimeout(() => {
        setDeleteSuccess(false);
      }, 6000)}
    </div>
  );
};

export default App;
