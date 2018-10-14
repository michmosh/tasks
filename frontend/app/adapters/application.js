import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    namespace:'api',
    host:'http://localhost/moshiko/buyMe/backend/public',
    primaryKey: '_id'
});
