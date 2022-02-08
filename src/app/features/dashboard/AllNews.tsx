import React from "react";

import News from "../../models/News";
import NewsList from "./NewsList";

const AllNews: React.FC<{
  allNews: News[];
  addToFavourite: (favouriteNews: News) => void;
  editNews: boolean;
  deleteNews: (id: string) => void;
  editedNews: (editedNews: News) => void;
}> = (props) => {
  const addToFavouriteNews = (favouriteNews: News) => {
    props.addToFavourite(favouriteNews);
  };

  const deleteNews = (id: string) => {
    props.deleteNews(id);
  };

  const editNews = (editedNews: News) => {
      
    props.editedNews(editedNews);
  };

  return (
    <div>
      {props.allNews.map((news) => (
        <NewsList
          key={news.id}
          id={news.id}
          author={news.author}
          description={news.description}
          publishedAt={news.publishedAt}
          title={news.title}
          urlToImage={news.urlToImage}
          editNews={props.editNews}
          addToFavouriteNews={addToFavouriteNews}
          deleteNews={deleteNews}
          editedNews={editNews}
        />
      ))}
    </div>
  );
};

export default AllNews;
