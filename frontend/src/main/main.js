import React, { Component } from 'react';
import styles from './style.css';
import axios from 'axios';
import List from '../list/list';
import CounterCard from '../counter-card/caunter-card';

class Main extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.addTask = this.addTask.bind(this);
        this.apiUrl = '../public/api/tasks';
        this.state = {
            data : [] ,
            compleated:0,
            due:0 ,
            showMessage : false,
            message:{type:'' , text : ''}
        }
    }
    componentDidMount(){
       this.getData();
    }

    setTasksCounters(){
        let compleated = 0 , 
            due = 0
        this.state.data.map(task=>{
            if(task.status === null) return ++due;
            if(task.status.toLowerCase() === "done") return ++compleated ; 
            if(task.status.toLowerCase() === "due") return ++due ; 
        })
        this.setState({compleated:compleated , due : due});
    }

    getData(){
        axios.get( this.apiUrl)
            .then(res=>{
                this.setState({data : res.data.tasks});
                this.setTasksCounters()
            })
    }

    updateTask(value ,task, index){
        axios.put(`${this.apiUrl}/${task.id}` , value)
        .then(res=>{
            let data = this.state.data;
            data[index] = res.data.task
            this.setState({data : [...data]});
            this.setTasksCounters();
            this.promptMessage('success' , 'Task updated');
        })
    }

    deleteTask(task,index){
       axios.delete(`${this.apiUrl}/${task.id}`)
            .then(res=>{
                let data = this.state.data
                data.splice(index ,1)
                this.setState({data : data});
                this.setTasksCounters();
                this.promptMessage('success' , 'Task deleted');
            })
    }

    addTask(task){
        axios.post(`${this.apiUrl}` ,task)
            .then(res=>{
                let data = this.state.data;
                data.push(res.data.task)
                this.setState({data : [...data]})
                this.setTasksCounters();
                this.promptMessage('success' , 'Task added');
            })
    }

    handleChange(value ,task , index){
        this.updateTask(value , task, index)
    }
    promptMessage(type , message){
        this.setState({
            showMessage : true,
            message:{type:type , text : message}
        })
        setTimeout(()=>{
            this.setState({
                showMessage : false,
                message:{type:'' , text : ''}
            })
        },1500)
        
    }
  render() {
    return (
      <div className="main">
      <div className={styles.list}>
        <div className={styles.cardWrapper}>
            <CounterCard data={this.state.compleated} name="compleated" width="10rem"/>
            <CounterCard data={this.state.due} name="due" width="10rem"/>
            <CounterCard data={this.state.data.length} name="total" width="10rem"/>
        </div>
        <List 
            data={this.state.data} titles={['Name' , 'Status' , 'Date' , 'delete']} 
            handleChange={(value ,task , index)=>this.handleChange(value ,task , index)}
            deleteTask={(task , index)=>this.deleteTask(task,index)}
            addTask={(task )=>this.addTask(task)}
        />
      </div>
        {
            <div 
                className={styles.message} 
                style={{
                    backgroundColor:this.state.message.type === 'error' ? 'red' : 'green' , 
                    visibility:this.state.showMessage ? 'visible':'hidden',
                    opacity:this.state.showMessage ? '0.9':'0'}}>
                <p style={{fontSize:'2em' , color:'white'}}> {this.state.message.text}</p>
            </div>
        }
      </div>
    );
  }
}

export default Main;
