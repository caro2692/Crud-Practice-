const express = require('express');

const router = express.Router();

const queries = require('../db/queries.js');

function isValidID(req, res, next){
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

function validItem(item){
  const hasName = typeof item.display_name == 'string' && item.display_name.trim() != '';
  const hasPrice = !isNaN(item.price);
  const hasInStock = !isNaN(item.in_stock_count);
  const hasCost  = !isNaN(item.cost);
  return hasName && hasPrice && hasInStock && hasCost;
}

router.get('/', (req,res)=>{
  queries.getAll().then(inventory=>{
    res.json(inventory);
  });
});

router.get('/:id', isValidID, (req, res, next)=>{
  queries.getOne(req.params.id).then(item => {
    if(item){
      res.json(item);
    } else{
        next();
    }

  });
});

router.post('/', (req, res, next)=>{
  if(validItem(req.body)){
    queries.create(req.body).then(item => {
      res.json(item[0]);
    });
  } else{
    next(new Error('Invalid item'));
  }
});

router.put('/:id', isValidID, (req, res, next)=>{
  if(validItem(req.body)){
    queries.update(req.params.id, req.body).then(item=>{
      res.json(item[0]);
    });
  } else {
        next(new Error('Invalid item'));
  }
});

router.delete('/:id', isValidID, (req, res)=>{
  //delete an entry
  queries.delete(req.params.id).then(()=>{
    res.json({
      deleted:true
    });
  });
});
module.exports = router;
