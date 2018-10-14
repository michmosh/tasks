import Component from '@ember/component';

export default Component.extend({
    init(){
        this.set('task', {name : "",status : "due"});
        this.set('errorObject' , {show : false , msg: ''});
        this._super(...arguments);
    },
    actions:{
        submit:function(){
            if(this.validateInput()){
                this.get('addTask')(this.task);
                this.set('task', {name : ""});
                this.set('errorObject' , {show : false , msg: ''});
                this.set('modal' , false);
            }else{
                this.set('modal' , true);
            }
        },
        openModal : function(){
            this.set('modal' , true);
        }
        
    },
    validateInput:function(){
        if(this.get('task').name == ""){
            this.set('errorObject' , {show : true , msg: 'Task must have a name'});
            return false;
        }else{
            return true;
        }
    }
});
