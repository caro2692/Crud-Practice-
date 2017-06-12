
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('inventory', function(table){
    table.increments('id').primary();
    table.string('display_name').notNullable();
    table.float('price').notNullable();
    table.float('cost');
    table.integer('in_stock_count').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('inventory');
};
