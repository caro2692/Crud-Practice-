const request = require('supertest');
const app = require('../app.js');
const expect = require('chai').expect;
const knex = require('../db/knex');
const fixtures = require('./fixtures');

describe('crud inventory', () => {
  before((done) => {
    //run migrations
    knex.migrate.latest()
    //run seeds
    .then(()=>{
      return knex.seed.run();
    }).then(() => done());
  });
  it('Lists all Records', (done) => {
    request(app)
      .get('/api/v1/inventory')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response)=>{
        expect(response.body).to.be.a('array');
        expect(response.body).to.deep.equal(fixtures.inventory);
        done();
      });
  });
  it('Show one record by id', (done) => {
    request(app)
      .get('/api/v1/inventory/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response)=>{
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(fixtures.inventory[0]);
        done();
      });
  });
  it('Creates a record', (done)=>{
    request(app)
      .post('/api/v1/inventory')
      .send(fixtures.item)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response)=>{
        console.log('only here');
        expect(response.body).to.be.a('object');
        console.log('here');
        fixtures.item.id = response.body.id;
        console.log('past here');
        expect(response.body).to.deep.equal(fixtures.item);
        done();
      });
    });
    it('Updates a record', (done)=>{
      fixtures.item.in_stock_count = 22;
      request(app)
        .put('/api/v1/inventory/11')
        .send(fixtures.item)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=>{
          expect(response.body).to.be.a('object');
          expect(response.body).to.deep.equal(fixtures.item);
          done();
        });
      });
      it('Deletes a record', (done)=>{
        fixtures.item.in_stock_count = 22;
        request(app)
          .delete('/api/v1/inventory/11')
          .send(fixtures.item)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response)=>{
            expect(response.body).to.be.a('object');
            expect(response.body).to.deep.equal({
              deleted:true
            });
            done();
          });
        });
});
