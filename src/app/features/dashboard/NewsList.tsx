import React, { useState } from "react";

import "./NewsList.css";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import News from "../../models/News";
import { preProcessFile } from "typescript";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import EditNews from "../details/EditNews";



const NewsList: React.FC<{
  id: string;
  author: string;
  description: string;
  publishedAt: string;
  title: string;
  urlToImage: string;
  editNews: boolean;
  addToFavouriteNews: (favouriteNews: News) => void;
  deleteNews: (id: string) => void;
  editedNews: (editedNews: News)=> void
}> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [editNews, setEditNews] = useState(false);



  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addToFavouriteNews = () => {
    const favNews = {
      id: props.id,
      author: props.author,
      description: props.description,
      publishedAt: props.publishedAt,
      title: props.title,
      urlToImage: props.urlToImage,
    };

    props.addToFavouriteNews(favNews);
  };

  const deleteNews = (id: string) => {
    handleClose();
    
    props.deleteNews(id);
  };

  const editedNews = (editedNews:News) =>{

      props.editedNews(editedNews);
  }

  return (
    <div className="cardContainer">
      <Card sx={{ maxWidth: 500 }} className="card">
        <CardMedia
          component="img"
          alt={props.title}
          height="140"
          image={props.urlToImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <p>Author : {props.author}</p>
          <p style={{ fontStyle: "italic | bold" }}>
            Publised at : {props.publishedAt}
          </p>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>

        {props.editNews && (
          <CardActions>
            <Button size="small" onClick={() => setEditNews(!editNews)}>
              Edit
            </Button>

            <Button size="small" onClick={handleClickOpen}>
              Delete
            </Button>
          </CardActions>
        )}

        {/*///////////////////////////// */}

        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"ALERT!!!"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure to delete this news from favourite?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => deleteNews(props.id)}>
              Yes
            </Button>
            <Button onClick={handleClose} autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>

        {/* ///////////////////////// */}

        {!props.editNews && (
          <CardActions>
            <Button size="small" onClick={addToFavouriteNews}>
              Add to Favourite
            </Button>
          </CardActions>
        )}

        {editNews && (
          <EditNews
            id={props.id}
            author={props.author}
            description={props.description}
            publishedAt={props.publishedAt}
            title={props.title}
            urlToImage={props.urlToImage}
            editedNews={editedNews}
          />
        )}
      </Card>

    </div>
  );
};

export default NewsList;
