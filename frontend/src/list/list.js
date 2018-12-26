import React ,{Component} from 'react';
import styles from './style.css';
import Dropdown from '../dropdown/dropdown';
class List extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.openAddTaskLi = this.openAddTaskLi.bind(this);
        this.addNew = this.addNew.bind(this);
        
        this.state = {
            data : props.data ,
            addTaskOpen : false,
            newTaskObject : {name:'',status:''}
        }
    }

    componentDidUpdate(nextProps , prevState){
        return this.state.data === nextProps.data ? null :  this.setState({data:nextProps.data})
    }
    
    handleChange(changedValue,task , index){
        let data = this.state.data;
        data[index].name = changedValue.name 
        this.setState({data : [...data]});
    }

    openAddTaskLi(){
        this.setState({addTaskOpen:true})
    }

    addNew(){
        this.props.addTask(this.state.newTaskObject);
        this.setState({newTaskObject : {name:'',status:''} ,addTaskOpen:false });
    }
    
    render(){
        return (
            <div className={styles.list}>
            <button onClick={this.openAddTaskLi} className={styles.addButton}>Add Task <i className="fa fa-plus"></i></button>
            <ul className={styles.listWrapper}>
                <li className={styles.title}>
                  {
                      this.props.titles.map((title , index)=>{
                          return (
                              <div key={index}>{title}</div>
                          )
                      })
                  }
              </li>
              {
                this.state.addTaskOpen ? 
                    <li className={styles.data}>
                        <div>
                            <input 
                                value={this.state.newTaskObject.name} 
                                className={styles.input} 
                                onChange={(event)=>{
                                    this.setState({newTaskObject :{name:event.target.value , status:'due'}})
                                }} 
                            />
                            </div>
                              <div>
                                DUE
                              </div>
                              <div>{new Date().toLocaleString("es-MX")}</div>
                              <div> 
                                  <button onClick={this.addNew} className={styles.addButton}>
                                    SAVE 
                                    <i className="fa fa-check-circle"></i>
                                  </button> 
                            </div>
                    </li>
                :
               ''
              }
              {
                  this.state.data.map((task , index)=>{
                      return (
                          <li key={task.id} className={styles.data}>
                              <div style={{position:'relative'}}>
                                  <input value={task.name} className={styles.input} onBlur={(event)=>this.props.handleChange({name:event.target.value},task , index)} onChange={(event)=>this.handleChange({name:event.target.value},task , index)} />
                                  {/* <i 
                                    className="fa fa-check-circle" 
                                    style={{position:'absolute' , 
                                            top: '10px',
                                            right:'0' , 
                                            color:'limegreen'}}
                                            onClick={()=>this.props.handleChange({name:this.state.data[index].name},task , index)}
                                    >
                                    </i> */}
                            </div>
                              <div>
                              {/* {task.status} */}
                              <Dropdown
                                  config={{
                                      name:'status' , 
                                      width:'4rem' , 
                                      placeholder:'STATUS' , 
                                      displayKeys:{
                                          name:"string"
                                      },
                                      data:[
                                          {name:'DONE'},
                                          {name:'DUE'}
                                      ],
                                      selected:{name:task.status}
                                  }}
        
                                  selectedDropDown={(changedValue)=>this.props.handleChange({status:changedValue === null ? changedValue : changedValue.name},task , index)}
                                  isCancelSelected={true}/>
                              </div>
                              <div>{task.created_at}</div>
                              <i onClick={()=>this.props.deleteTask(task , index)}className="fa fa-trash"></i>
                          </li>
                      )
                  })
              }
              </ul>
            </div>
          );
    }
    
}

export default List;
