import Component from '@ember/component';
import  { computed } from '@ember/object';
const TASK_STATUS = {
    TASK_DUE : "due" , 
    TASK_COMPLETED : "done"
}
export default Component.extend({
    init(){
        this._super(...arguments);
    },
    didUpdateAttrs() {
        this._super(...arguments);   
    },
    didReceiveAttrs() {
        this._super(...arguments);
    },
    didRender() {
        this._super(...arguments);
        
    },
    completed:computed('tasks.@each.status',function(){
        return this.tasks.filter(e=>{
            return e.status === TASK_STATUS.TASK_COMPLETED
        }).length
       
    }) ,
    due : computed('tasks.@each.status',function(){
        return this.tasks.filter(e=>{
            return e.status === TASK_STATUS.TASK_DUE
        }).length
    })  , 
    total:computed('tasks.@each' , function(){
        return this.tasks.length;
    }),
    actions: {
        addTask(task){
            return this.get('addTask')(task);
        },
        delete(id){
            return this.get('deleteTask')(id);
        },
       edit(task, event){
           switch(event.name){
                case "checkbox":{
                    let status = event.checked === true ? TASK_STATUS.TASK_COMPLETED : TASK_STATUS.TASK_DUE;
                    task.set('status' ,status);
                    return this.get('editTask')(task);
                }
                case "edit":{
                    let name = event.value; 
                    if(task.get('name') !== name){
                        task.set('name' , name);
                        return this.get('editTask')(task);
                    }
                    break;
                }
                default :
                    return false;
                
           }
        }
    
    }
    


});
