import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    normalize : function(model, hash, prop) {
        let task;
        if(prop === "tasks" || prop === "task"){
            task = {
                id:hash.id,
                name: JSON.parse(hash.jsonData).name , 
                status : JSON.parse(hash.jsonData).status,
                created_at : hash.created_at , 
                updated_at : hash.updated_at
            };
        }
        else{
            task = { id : hash.id}
        }
       
       return this._super(model, task, prop);
    }
});
