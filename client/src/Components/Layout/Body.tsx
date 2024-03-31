import React from 'react';
import { Grid } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Header from './Header';

export default function Body() {
    const [post, setPost] = React.useState<string>();
    return (
        <>
        <Header/>
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <Posts setPost={setPost}/>
            </Grid>
            <Grid item xs={12} md={4}>
                <Form post={post} setPost={setPost}/>
            </Grid>
        </Grid>
        </>
    );
}
