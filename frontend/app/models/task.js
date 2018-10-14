import DS from 'ember-data';

export default DS.Model.extend({
    jsonData:DS.attr('string'),
    name :DS.attr('string'),
    status :DS.attr('string'),
    created_at : DS.attr('string') ,
    updated_at:DS.attr('string')
});
