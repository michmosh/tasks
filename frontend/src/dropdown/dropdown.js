import React from 'react';
import './dropdown.css';

export default class Dropdown extends React.Component{
   
    constructor(props){
        super(props);
        this.selectElement = this.selectElement.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.cancel = this.cancel.bind(this);
        this.state = {
            data : [],
            dropDownOpen : false,
            selected : props.config.selected
        }
    }

    componentWillMount(){
        this.setState({data : this.props.config.data});
    }

    selectElement(event ,el , toggle = false){
        event.stopPropagation(); // prevent click through 
        this.setState({selected :el});
        this.props.selectedDropDown(el); 
        if(toggle )this.toggleDropDown();
    }

    cancel(event){
        this.setState({selected : false});
        event.stopPropagation(); // prevent click through 
        this.selectElement(null ,false )
    }
    toggleDropDown(){
        this.setState({dropDownOpen : !this.state.dropDownOpen})
    }

    render(){
        return (
            <div className="dropdown-wrapper" style={{width: this.props.config.width ? this.props.config.width : '20rem' , position:'relative' }}  >
                <div style={{display:this.state.dropDownOpen ? "none" :"block" , width:'100%'}} className="dropdown-title">
                    {this.state.selected ? 
                        <div className="dropdown-item dropdown flex" onClick={this.toggleDropDown} >
                            <span className="dropdown-item-title">{this.state.selected.name}</span>   
                           {
                               this.props.isCancelSelected ? 
                                <i onClick={(event)=>{this.selectElement(event,null, false)}} className="fa fa-close"></i> :
                                ''
                           } 
                        </div> 
                        : 
                        <div className="dropdown-item dropdown flex" onClick={this.toggleDropDown}>
                            <span className="dropdown-item-title">{this.props.config.placeholder}</span>   
                        </div> 
                    }
                </div>
                <ul style={{display:this.state.dropDownOpen ? "block" :"none" }}>
                    {this.state.data.map(( el, index )=>{
                        return(
                            <li className="dropdown-item dropdown" key={index} onClick={(event)=>{this.selectElement(event,el, true)}} value={index}>
                                <div className="flex">
                                    { Object.keys(el).map((key,index)=>{
                                        if(key in this.props.config.displayKeys){
                                            if(this.props.config.displayKeys[key] === "string") return <span key={index} className="dropdown-item-title">{el[key]}</span>
                                            if(this.props.config.displayKeys[key] === "number") return <span key={index} className="dropdown-item-title">{el[key]}</span>
                                            if(this.props.config.displayKeys[key] === "image") return <img key={index} className="dropdown-image" src={el[key]} alt={this.props.config.name}/>
                                        }  
                                        return '';
                                    })}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

// example usage 
/* <Dropdown 
    config={{
        name:'lng' , 
        isServerData : false,
        resKey : null,
        width:'3rem' , 
        placeholder:'' , 
        displayKeys:{
            name:"string",
            flag:"image"
        },
        data:[...this.props.config.languages],
        selected:this.props.config.languages[0]
    }}
    selectedDropDown={this.selectedLng}
    isCancelSelected={false}/>

{this.state.country ? this.state.country.name : ''} */