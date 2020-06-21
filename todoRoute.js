let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const { options } = require('mongoose');
let mongoDB = 'mongodb://localhost:27017/my_database';

mongoose.connect(mongoDB, { useNewUrlParser: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Schema = mongoose.Schema;
const SomeModelSchema = new Schema({
  _id : mongoose.Schema.Types.ObjectId,
  value : String
});
const Todo = mongoose.model('Todoo',SomeModelSchema)

router.get('/list', (req, res, next)=>{
    Todo.find()
    .exec()
    .then(result=>{
        console.log(result)
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
});

router.post('/add', (req, res, next)=>{
    const data = new  Todo({
        _id : new  mongoose.Types.ObjectId(),
        value : req.body.user.value
    });
    data.save()
    .then(result=>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
});

router.delete('/delete', (req, res, next)=>{   
    let id  =  req.body.user.id;
    Todo.remove({_id:id})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result)
    })
    .catch(err=>{
        console.log(err);
        res.status(400).json({
            error:err
        })
    })
});

router.put('/edit', function(req, res){
    let oldid  =  req.body.user.old;
    let newvalue = req.body.user.new;
    Todo.updateOne({_id : oldid}, {$set : {value : newvalue} })
    .exec()
    .then(result=>{
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
});

module.exports = router;