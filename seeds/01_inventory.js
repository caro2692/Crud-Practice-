
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE inventory RESTART IDENTITY CASCADE;')
    .then(function () {
      // Inserts seed entries
      return knex('inventory').insert([
        {display_name: 'Off the shoulder top',
         price: 23.99,
         cost: 16.00,
         in_stock_count: 11
        },
        {display_name: 'High rise jean shorts',
         price: 44.99,
         cost: 31.00,
         in_stock_count: 24
        },
        {display_name: 'Fit and Flare dress',
         price: 105.99,
         cost: 95.00,
         in_stock_count: 5
        },
        {display_name: 'Sailor shorts',
         price: 29.99,
         cost: 20.00,
         in_stock_count: 7
        },
        {display_name: 'Leather cross-body clutch',
         price: 99.99,
         cost: 61.00,
         in_stock_count: 3
        },
        {display_name: 'White jeans-bootleg',
         price: 120.00,
         cost: 102.00,
         in_stock_count: 9
        },
        {display_name: 'Low rise jean cutoffs',
         price: 54.99,
         cost: 34.00,
         in_stock_count: 8
        },
        {display_name: 'Cotton shift dress',
         price: 19.99,
         cost: 16.00,
         in_stock_count: 14
        },
        {display_name: 'Artist earrings',
         price: 29.99,
         cost: 21.00,
         in_stock_count: 3
        },
        {display_name: 'Hair ties - pack of 7',
         price: 1.99,
         cost: 1.00,
         in_stock_count: 19
        }
      ]);
    });
};
