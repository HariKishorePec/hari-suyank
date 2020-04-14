
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db');
const Author = require('./model/author');
const Post = require('./model/posts');
const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.get('/',(req, res)=>{
    res.send('go to <a href="/api/getAllPosts"> /api/getAllPosts</a> <br>'+
             '<a href="/api/addNewPost">/api/addNewPost </a> to add a new document');
});

app.get('/insert', (req, res)=>{

    var pat = new Author({
        name: "My author 2",
        age:31,
        books:[{"title":"book 2", "pages": 40}]
    });

    pat.save().then(()=>{
        console.log('data inserted');
    });
    res.send('Data   91 Document) inserted successfully');
} );

app.get('/find/:name', (req, res)=>{

    Author.findOne({"name":req.params.name}).then((err, result)=>{
        if(err){
            res.header("Content-Type",'application/json');
            res.send(JSON.stringify(err, null, 4));
        }else{
            res.header("Content-Type",'application/json');
            res.send(JSON.stringify(result, null, 4));
        }
    });

} );

app.get('/get', async (req,res)=>{
    let authors = await Author.find();

    let results = {
        success: true,
        count:  authors.length,
        data : authors
    };
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(results, null, 4));
});

app.get('/api/getAllPosts', async (req,res)=>{
    let posts = await Post.find();

    let results = {
        success: true,
        count:  posts.length,
        data : posts
    };
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(results, null, 4));
});

app.get('/api/addNewPost', (req, res)=>{

    var post1 = new Post({
        _id: new mongoose.Types.ObjectId(),
        title: "How to Stake",
        desc: "A step by step guide explaining how to stake tokens on the Polkadot Network",
        steps: [
            {
                _id: new mongoose.Types.ObjectId(),
                "title": "Create a stash account",
                "desc": "Stash account holds funds bonded for staking, but delegates some functions to a Controller. To create a stash account, head over to the Accounts section of the Polkadot UI. Click on the “Add account” button. This will open up a form with 5 fields. We’ll ignore the fields under the advanced creation options for the purpose of this tutorial. The first field asks for a “Name”. Enter whatever name you want the account to have. The second field contains an auto-generated “mnemonic seed”. Write this phrase down and keep it safe. Don’t share this with anyone as this will give them access to the funds in your account. Next, you need to choose a strong password. We highly recommend using a password generator to generate a strong password. Needless to say, keep this information safe and secret as well. Now, click on the “Save” button. This will open up a dialog which will ask you to save the backup file for your account in a secure location along with your password as this will allow you to restore your account. Go ahead and click the “Create and backup account” button. This will open a download dialog on your browser. Choose a secure location to store this file and click “Save File”. Your stash account is created and a backup file has been stored your your selected location."
            },
            {
                _id: new mongoose.Types.ObjectId(),
                "title": "Create a controller account",
                "desc": "Controller account acts on behalf of the Stash account, signalling decisions about nominating and validating. It sets preferences like payout account and commission. It only needs enough funds to pay transaction fees. The steps to create a controller account are identical to creating a stash account. The only difference is in the usage. For now, just repeat the steps that were used to create the stash account."
            },

            {
                _id: new mongoose.Types.ObjectId(),
                "title": "Nominate a validator",
                "desc": "Go to the “Staking Overview” tab. You’ll see the list or current validators on the left side. On the right side, you’ll see a list of validators that have signalled their intention to actively participate in the next era. Pick one (or more) of these validators to nominate and copy their address by clicking on the icon. Return to the “Account Actions” screen and you will see your bonded account. Click the “Nominate” button and fill in the blank field with the address of the validator you have chosen. Sign and submit the transaction, and you are now nominating!"
            }
        ]
    });

    post1.save().then(()=>{
        console.log('Post1 inserted into posts collection');
        res.send('data inserted success');
    });
    
} );

app.listen(PORT, ()=>{
    console.dir('Server started at port-- '+PORT);
});
