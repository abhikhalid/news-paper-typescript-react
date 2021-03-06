import React, { useEffect, useState } from "react";

import "./EditNews.css";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import News from "../../models/News";

import { ChangeEvent } from "react";

const EditNews: React.FC<{
  id: string;
  author: string;
  description: string;
  publishedAt: string;
  title: string;
  urlToImage: string;
  editedNews: (editedNews: News) => void;
}> = (props) => {
  const [open, setOpen] = React.useState(true);

  const [authorName, setAuthorName] = useState(props.author);
  const [descriptions, setDescriptions] = useState(props.description);
  const [publishedAtt, setPublishedAtt] = useState(props.publishedAt);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveNewlyEdited = () => {
    handleClose();

    const editedNews = {
      id: props.id,
      author: authorName,
      description: descriptions,
      publishedAt: publishedAtt,
      title: props.title,
      urlToImage: props.urlToImage,
    };

    props.editedNews(editedNews);
  };

  const setAuhor = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthorName(event.target.value);
  };

  const setDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setDescriptions(event.target.value);
  };

  const setPublished = (event: ChangeEvent<HTMLInputElement>) => {
    setPublishedAtt(event.target.value);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit News</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={authorName}
            label="Author Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={setAuhor}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            value={descriptions}
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={setDescription}
          />
          <TextField
            autoFocus
            margin="dense"
            id="publishedAt"
            value={publishedAtt}
            label="Published At"
            type="text"
            fullWidth
            variant="standard"
            onChange={setPublished}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveNewlyEdited}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditNews;
