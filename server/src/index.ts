import 'reflect-metadata';
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from 'typeorm';
import { RegisterResolver } from './modules/Users/register/RegisterUser';
import { LoginResolver } from './modules/Users/login/LoginUser';
import * as session from 'express-session';
import * as dotenv from 'dotenv';
import MongoStore = require('connect-mongo');
import { createPostResolver } from './modules/Posts/CreatePost/CreatePost';
import { deletePostResolver } from './modules/Posts/DeletePost/DeletePost';
import { fetchPostForAdminResolver } from './modules/Posts/FetchPost/FetchPostForAdmin';
import { fetchPostForUserResolver } from './modules/Posts/FetchPost/FetchPostForUser';
import { updatePostResolver } from './modules/Posts/UpdatePost/UpdatePost';
import * as cors from 'cors';
import cookieParser = require('cookie-parser');
import { FetchPostByIDResolver } from './modules/Posts/FetchPost/FetchPostById';

declare module 'express-session' {
    export interface SessionData {
        userId: string;
    }
}

const main = async () => {
    await createConnection(); // Add connection options if necessary
    dotenv.config();

    const schema = await buildSchema({
        resolvers: [RegisterResolver, LoginResolver, createPostResolver, deletePostResolver, fetchPostForAdminResolver, fetchPostForUserResolver, updatePostResolver,FetchPostByIDResolver]
    });
    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res })
    });

    const app = Express();


    app.use(
        session({
            store: MongoStore.create({ // purpose of store is to store the session data in the database (We can use cookie also but it keeps the session in the database even if the server restarts)
                mongoUrl: "mongodb://localhost:27017/typegraphql-test"
            }),
            name: 'userId',
            secret: process.env.SECRET!,
            resave: false,
            saveUninitialized: false,
            cookie: {  // Cookie is used to store the session id in the browser
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
                path: '/',
            },
        })
    );


    const corsOptions = {
        credentials: true, // It is set to true to allow the server to accept cookies from the client
        origin: ['https://studio.apollographql.com', "http://localhost:4000/graphql","http://localhost:3000"],

    }

    app.use(cors(corsOptions));

    app.use(cookieParser());


    await apolloServer.start();
    apolloServer.applyMiddleware({
        app, cors: {
            origin: ['https://studio.apollographql.com', "http://localhost:4000/graphql", "http://localhost:3000"],
            credentails: true
        }
    });
    app.listen(4000, () => {
        console.log("Server started on http://localhost:4000/graphql");
    });
};
main();
