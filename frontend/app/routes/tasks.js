import Route from '@ember/routing/route';

export default Route.extend({
    model: function(params) {
        return this.store.findAll('task',params)
    } ,  
    actions :{ 
        add : function(params){
            let task = this.store.createRecord('task' , {
                jsonData:JSON.stringify({name:params.name , status : params.status})
            });
            task.save();   
        },
        delete : function(id){
            this.store.findRecord('task', id, { backgroundReload: false }).then(function(task) {
                task.destroyRecord();
              });
        } ,
        edit:function(params){
            this.store.findRecord('task', params.id, { backgroundReload: false }).then(function(task) {
                task.setProperties({jsonData:JSON.stringify({name:params.name , status:params.status}) });
                task.save();
              });
        }
    }
    
});
