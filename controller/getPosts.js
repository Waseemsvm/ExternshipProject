const router = require('express').Router();
const Post = require('../models/Post')

router.get('/', async (req, res) => {

    var pageNo = parseInt(req.query.pageno)
  var size = parseInt(req.query.pagesize)
  var query = {}
  if(pageNo < 0 || pageNo === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size
  // Find some documents
     await Post.count({}, async function(err,totalCount) {
             if(err) {
               response = {"error" : true,"message" : "Error fetching data"}
             }
          const posts = await Post.find({},{},query,function(err,data) {
              // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                var totalPages = Math.ceil(totalCount / size)
                response = {"error" : false,"message" : data,"pages": totalPages};
            }
            res.json(response);
         });

         res.send(posts)

       })

    res.send({message: "received the request"})
})

module.exports = router;