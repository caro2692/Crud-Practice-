const knex = require('./knex');

module.exports = {
  getAll() {
    return knex('inventory');
  },
  getOne(id){
    return knex('inventory').where('id', id).first();
  },
  create(item){
    return knex('inventory').insert(item, '*');
  },
  update(id, item){
    return knex('inventory').where('id',id).update(item, '*');
  },
  delete(id){
    return knex('inventory').where('id',id).del();
  }
};
