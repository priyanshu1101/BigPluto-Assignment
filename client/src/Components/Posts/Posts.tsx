import React, { useEffect } from 'react';
import { useQuery } from 'urql';
import { Grid, CircularProgress, Box } from '@mui/material';
import Post from './Post/Post';
import { PostEntity } from '../../Entities/Post';
import FetchPostForUsers from '../../graphql_withoutcodegen/Queries/FetchPostsForUsers';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import rootReducer from '../../Reducers';

const Posts : React.FC<{setPost : React.Dispatch<React.SetStateAction<string | undefined>>}> = ({setPost}) => {
    const [{ data, fetching, error},reexecuteQuery] = useQuery<{fetchPostForUser:PostEntity[]}>({
        query: FetchPostForUsers
    });
    const posts = useSelector((state: ReturnType<typeof rootReducer>) => state.postReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        if(!fetching && data && data.fetchPostForUser){
            dispatch({type : 'FETCH_ALL', payload : data.fetchPostForUser});
        }
    }, [dispatch,fetching,reexecuteQuery]);
    

    useEffect(() => {
        reexecuteQuery({requestPolicy: 'network-only'});
    }, [reexecuteQuery]);

    return (
        <Grid container spacing={2} justifyContent="center">
            {fetching ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress color="secondary" />
                </Box>
            ) : (
                posts && (
                    posts.map((post: PostEntity, index: number) => (
                        <Grid key={index} item xs={12} sm={6} md={4}>
                            <Post key={index} post={post} setPost={setPost}/>
                        </Grid>
                    ))
                )
            )}
        </Grid>
    );
}
export default Posts;