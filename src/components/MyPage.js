import React from 'react';
import './MyPage.css';



class MyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pending: [
                {id: 1, value: 'Hoc'},
                {id: 2, value: 'Ngu'},
                {id: 3, value: 'The thao'},
            ]    ,    //   List co san
            added: {id: '', value: ''}  ,  // gia tri them
            index: 3,
            doing: [],
            draggedToDoingItem: {},
            draggedToPendingItem: {},

        };
        this.addItem = this.addItem.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        
    }
    
    onChangeValue(e) {
        // let oldIndex = this.state.index;
        // let newIndex = oldIndex + 1;
        this.setState({added: {id: '', value: e.target.value} });
    }

    addItem() {
        let oldIndex = this.state.index;      
        let newIndex = oldIndex + 1;
       // console.log("old: " + oldIndex);
     //   console.log("new: " + newIndex);
        let value = this.state.added.value;
        this.setState({added: {id: newIndex, value: value}});
        this.setState(state => {
            let index = newIndex;
            const pending = state.pending.concat(state.added);
            return {
                pending,   
                index,     
            };
       });         
    }

    removeItem = id => {
       // console.log(id);
        this.setState(state => {
            const pending = state.pending.filter(item => (item.id !== id));
            return {
                pending,
            };
        });
    }

    onDragPendingToDoing = (event, item) => {
        event.preventDefault();
        this.setState({
            draggedToDoingItem: item
        });
    }

    onDragDoingToPending = (event, item) => {
        event.preventDefault();
        this.setState({
            draggedToPendingItem: item
        });
    }

    onDragOver = (event) => {
        event.preventDefault();
    }

    onDropPendingToDoing = (event) => {
        let doing = this.state.doing;
        let draggedToDoingItem = this.state.draggedToDoingItem;
        let pending = this.state.pending;
        this.setState({
            doing: [...doing, draggedToDoingItem],
            pending: pending.filter(item => item.id !== draggedToDoingItem.id),
            draggedToDoingItem: {},
        });
    }

    onDropDoingToPending = (event) => {
        let pending = this.state.pending;
        let doing = this.state.doing;
        let draggedToPendingItem = this.state.draggedToPendingItem;
        this.setState({
            pending: [...pending, draggedToPendingItem],
            doing: doing.filter(item => item.id !== draggedToPendingItem.id),
            draggedToPendingItem: {},
        });
    }

    render() {
        return (
            <div class="MyPage">
                <div class="todoContainer"
                    onDrop={event => this.onDropDoingToPending(event)}
                    onDragOver={event => this.onDragOver(event)}
                >
                    Pending
                    <ul class="list-group" id="pendingList">
                        {this.state.pending.map(item => (
                            <li 
                                key={item.id}
                                class="list-group-item" 
                                draggable
                                onDrag={(event) => this.onDragPendingToDoing(event, item)}    
                            >
                                {item.value} 
                                {/* {item.id} */}
                                <button  onClick={() => this.removeItem(item.id)}><i class="fa fa-remove" title={'Remove'}></i></button>
                            </li>
                        ))}                    
                    </ul>
                    
                    <textarea 
                        id="inputItems"
                        placeholder="..." 
                        onChange={this.onChangeValue}>
                    </textarea> 

                    <button  id="addToDo" onClick={this.addItem}>Add</button>
                </div>
  
                <div class="doingContainer"
                    onDrop={event => this.onDropPendingToDoing(event)}
                    onDragOver={event => this.onDragOver(event)}
                >
                    Doing
                    <ul class="list-group" id="doingList"         
                    >
                        {this.state.doing.map(item => (
                            <li 
                                key={item.id} 
                                class="list-group-item"
                                draggable
                                onDrag={(event) => this.onDragDoingToPending(event, item)}
                            >
                                {item.value}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


        );
    }
}

export default MyPage;