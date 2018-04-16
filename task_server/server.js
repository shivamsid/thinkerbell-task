var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');
var Titles     = require('./models/titles');
var cors = require('cors');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8081; 
var mongoose   = require('mongoose');
mongoose.connect('mongodb://test:test@ds241869.mlab.com:41869/thinkerbelllabs'); 


var router = express.Router();              


router.use(function(req, res, next) {
    
    console.log('Something is happening.');
    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    next(); 
});


router.get('/', function(req, res) {
    res.json({ message: 'what a server what a wow' });   
});

router.route('/titles')

    
    .post(function(req, res) {
    	
        var titles = new Titles(); 
        const req_data = JSON.parse(JSON.stringify(req.body));  
           
        titles.title = req_data.title;
        titles.names = req_data.names  

        titles.save(function(err) {
            if (err){
            	if(err.code === 11000){
            		res.json({ message: 'Title already exists ! Change name or edit exesting title on "Work on Existing Titles" page' })
            	}
	        	else{
	        		res.send(err);
	        	}
            }    
            else{
            	res.json({ message: 'Title created!' });
            }
            
        });

    })

    .get(function(req, res) {
        Titles.find(function(err, titles) {
            if (err){

                res.send(err);
            }
           
            
            const titleArray = titles.map(title => title.title);
            
            res.json(titleArray);
        });
    });

router.route('/titles/:title')

    .get(function(req, res) {
        Titles.find({title:req.params.title}, function(err, title) {
            if (err)
                res.send(err);

            res.json(title[0].names);
        });
    })

     .put(function(req, res) {

        Titles.update({title:req.params.title}, {
            names : req.body
        },function(err, affected, resp) {
  			 
  			 res.json({ message: 'names updated' })
		})
    })

    .delete(function(req, res) {
        Titles.remove({
            title: req.params.title
        }, function(err, title) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);