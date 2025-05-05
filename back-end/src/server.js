import express from 'express';
import {MongoClient} from "mongodb";
import path from 'path';

import {cartItems as cartItemsRaw, products as productsRaw} from "./temp-data";

let products = productsRaw;
let cartItems = cartItemsRaw;


async function start() {

    const url = process.env.MONGO_URI;
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db('fsv-db');

    const app = express();

    app.use(express.json());


    app.use('/images', express.static(path.join(__dirname, '../assets')));

    console.log(path.join(__dirname, '../assets'));


// app.get('/hello', (req, res) => {
//     res.send('Hello!');
// })

    app.get('/api/products', async (req, res) => {
        // res.json(products);


        const products = await db.collection('products').find({}).toArray();
        res.send(products);
    });

    async function populateCartIds(ids) {


        // return ids.map(id => products.find(product => product.id === id));
        return Promise.all(ids.map(id => db.collection('products').findOne({id})));
    }

    app.get('/api/users/:userId/cart', async (req, res) => {


        const user = await db.collection('users').findOne({id: req.params.userId});

        const populatedCart = await populateCartIds(user?.cartItems || []);

        // console.log(populatedCart);
        res.json(populatedCart);

    });


    app.get('/api/products/:productId', async (req, res) => {


        const productId = req.params.productId;
        // const product = products.find(product => product.id === productId);
        const product = await db.collection('products').findOne({id: productId});
        // console.log(product);
        res.json(product);

    });


    app.post('/api/users/:userId/cart', async (req, res) => {

        console.log("here i am");
        const userId = req.params.userId;
        const productId = req.body.id;

        const existingUser = await db.collection('users').findOne({id: userId});

        if (!existingUser) {
            await db.collection('users').insertOne({id: userId, cartItems: []})
        }

        await db.collection('users').updateOne({id: userId}, {
            $addToSet: {cartItems: productId}
            // $push:{cartItems:productId}
        });


        // const product = products.find(product => product.id === productId);
        // cartItems.push(productId);

        // const populatedCart = populateCartIds(cartItems);


        // console.log(populatedCart);
        const user = await db.collection('users').findOne({id: req.params.userId});

        const populatedCart = await populateCartIds(user?.cartItems || []);

        res.json(populatedCart);


    });

    // app.post('/api/users/:userId/cart', async (req, res) => {
    //     const userId = req.params.id;
    //     const productId = req.body.id;
    //     console.log("here i am");
    //
    //     await db.collection('users').updateOne({id: userId}, {
    //         $addToSet: {cartItems: productId}
    //         // $push:{cartItems:productId}
    //     })
    //
    //
    //     // const product = products.find(product => product.id === productId);
    //     // cartItems.push(productId);
    //
    //     // const populatedCart = populateCartIds(cartItems);
    //
    //
    //     // console.log(populatedCart);
    //     const user = await db.collection('users').findOne({id: req.params.userId});
    //
    //     const populatedCart = await populateCartIds(user?.cartItems || [);
    //
    //     res.json(populatedCart);
    //
    //
    // });

    app.delete('/api/users/:userId/cart/:productId', async (req, res) => {
        const userId = req.params.userId;
        const productId = req.params.productId;

        await db.collection('users').updateOne({id: userId}, {
            $pull: {cartItems: productId}
        })

        //     cartItems = cartItems.filter(id => id !== productId);
        //     const populatedCart = populateCartIds(cartItems);
        //     res.json(populatedCart);
        const user = await db.collection('users').findOne({id: req.params.userId});

        const populatedCart = await populateCartIds(user?.cartItems || []);

        res.json(populatedCart);

    })

    app.listen(8000, () => {
        console.log('Server is listening at port 8000');
    })
}

start();