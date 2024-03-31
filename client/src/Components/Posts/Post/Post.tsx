import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Chip, Button, CardActions } from '@material-ui/core';
import { PostEntity } from '../../../Entities/Post';
import { useMutation } from 'urql';
import DeletePost from '../../../graphql_withoutcodegen/mutations/DeletePost';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300, // Adjust width as needed
    margin: theme.spacing(2), // Add margin for spacing
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: 16, // Reduce font size for title
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  message: {
    fontSize: 14, // Reduce font size for message
    marginBottom: theme.spacing(1),
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  actions: {
    justifyContent: 'flex-end', // Align actions to the right
  },
}));

const Post: React.FC<{ key: number; post: PostEntity; setPost:React.Dispatch<React.SetStateAction<string | undefined>> }> = ({ key, post,setPost }) => {

  const dispatch = useDispatch();
  const classes = useStyles();
  const [deleteResult, executeDelete] = useMutation(DeletePost);

  const handleDelete = ()=>{
    executeDelete({postId: post.id}).then((response) => {
      if(response.error){
        toast.error("Error Deleting Post");
      }
      else if(response.data){
        toast.success("Post Deleted Successfully");
        dispatch({type : 'DELETE', payload : post.id});
      }
    
    });
  }

  const handleUpdate = ()=>{
    setPost(post.id);
  }

  return (
    <Card className={classes.root} key={key}>
      <CardContent>
        <Typography variant="h6" className={classes.title} color="textPrimary">
          {post.title}
        </Typography>
        <Typography variant="body2" className={classes.message} color="textSecondary">
          {post.message}
        </Typography>
        <div>
          {post.tags.split(',').map((tag, index) => (
            <Chip key={index} label={tag} className={classes.chip} />
          ))}
        </div>
        <Typography variant="caption" color="textSecondary">
          Posted: {new Date(post.createdAt).toDateString()}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button size="small" variant="contained" color="primary" onClick={handleUpdate}>
          Update
        </Button>
        <Button size="small" variant="contained" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
