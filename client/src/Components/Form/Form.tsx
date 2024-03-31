import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, makeStyles, Typography } from '@material-ui/core';
import { useMutation, useQuery } from 'urql';
import CreatePost from '../../graphql_withoutcodegen/mutations/CreatePost';
import FetchPostForUsers from '../../graphql_withoutcodegen/Queries/FetchPostsForUsers';
import FetchPostById from '../../graphql_withoutcodegen/Queries/FetchPostById';
import UpdatePost from '../../graphql_withoutcodegen/mutations/UpdatePost';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
    border: '1px solid #ccc',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: 'auto',
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

interface FormValues {
  title: string;
  message: string;
  tags: string;
}

const Form: React.FC<{post:string | undefined,setPost:React.Dispatch<React.SetStateAction<string | undefined>>}> = ({post,setPost}) => {
  const classes = useStyles();
    const [createPostResult, executeCreatePost] = useMutation(CreatePost);
    const [updatePostResult, executeUpdatePost] = useMutation(UpdatePost);
    const [{fetching, data, error }] = useQuery({ query: FetchPostById , variables: {fetchPostById: post} , pause: post===undefined});
    const dispatch = useDispatch();

    useEffect(()=>{        
        if(error){
          toast.error("Error Fetching Post");
          return;
        }
        if(!fetching && data && post!==undefined){
            setFormValues({
                title: data.FetchPostByID.title,
                message: data.FetchPostByID.message,
                tags: data.FetchPostByID.tags,
            });
        }
    },[post,fetching,error]);

  const [formValues, setFormValues] = useState<FormValues>({
    title: '',
    message: '',
    tags: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(post===undefined){
      executeCreatePost({postData: formValues}).then((response) => {
        if(response.error){
          toast.error("Error Creating Post");
        }
        else if(response.data){
          toast.success("Post Created Successfully");
          dispatch({type : 'CREATE', payload : response.data.createPost});
          setFormValues({
                title: '',
                message: '',
                tags: '',
              });
            }
          });
    }
    else{
      executeUpdatePost({updatePostPostId: post,updatedPostData: formValues}).then((response) => {
        if(response.error){
          toast.error("Error Updating Post");
        }
        else if(response.data){
          dispatch({type : 'UPDATE', payload : response.data.updatePost});
          toast.success("Post Updated Successfully");
          setFormValues({
            title: '',
            message: '',
            tags: '',
          });
        }
        setPost(undefined);
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <div className={classes.formContainer}>
        <Typography variant="h5" component="h2" gutterBottom>
          {post!==undefined? "Update":"Insert"} Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            className={classes.textField}
            fullWidth
            variant="outlined"
            label="Title"
            name="title"
            value={formValues.title}
            onChange={handleInputChange}
          />
          <TextField
            className={classes.textField}
            fullWidth
            variant="outlined"
            label="Message"
            name="message"
            multiline
            rows={4}
            value={formValues.message}
            onChange={handleInputChange}
          />
          <TextField
            className={classes.textField}
            fullWidth
            variant="outlined"
            label="Tags"
            name="tags"
            value={formValues.tags}
            onChange={handleInputChange}
          />
          <Button
            className={classes.submitButton}
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Form;
