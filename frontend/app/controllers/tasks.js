import Controller from '@ember/controller';

export default Controller.extend({
    actions:{
        addTask :function(data){
            return this.send('add' , data);
        },
        editTask(data){
            return this.send('edit' , data);
        },
        deleteTask: function(id){
            return this.send('delete' , id);
        }
    }
});
