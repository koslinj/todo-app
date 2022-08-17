import { Component } from "react";
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: [],
      count: 0,
      showing: "all",
      darkmode: false
    }
  }
  changeState(text) {
    this.setState({
      newItem: text
    })
  }
  addItem() {
    const list = [...this.state.list];
    let item = {
      id: 1 + Math.random(),
      name: this.state.newItem.slice(),
      completed: false
    };
    list.push(item);
    const listCount = list.filter(item => !item.completed);
    this.setState({
      list,
      newItem: "",
      count: listCount.length
    })
  }
  deleteItem(id) {
    const newList = [...this.state.list].filter(item => item.id !== id);
    const listCount = newList.filter(item => !item.completed);
    this.setState({
      list: newList,
      newItem: "",
      count: listCount.length
    })
  }
  setChecked(id) {
    const newList = [...this.state.list]
    newList.forEach(item => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
    });
    const listCount = newList.filter(item => !item.completed);
    this.setState({
      list: newList,
      count: listCount.length
    })
  }
  clearCompleted() {
    const newList = [...this.state.list].filter(item => !item.completed);
    document.querySelectorAll('.completed').forEach(item => {
      item.parentElement.parentElement.style = "opacity: 0;"
    })
    setTimeout(() => this.setState({
      list: newList,
    }), 600)

  }
  // clearCompleted() {
  //   const newList = [...this.state.list].filter(item => !item.completed);
  //   this.setState({
  //     list: newList,
  //     newItem: "",
  //     count: newList.length
  //   })
  // }
  display(show) {
    if (show === "all") return (
      this.state.list.map(item => {
        return (
          <li className="todo" key={item.id}>
            <div className="left" onClick={() => this.setChecked(item.id)}>
              <div className="checkbox" style={{ background: item.completed ? `linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))` : `transparent` }}>
                <svg style={{ display: item.completed ? `block` : `none` }} xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6" /></svg>
              </div>
              <div className={`text ${item.completed ? 'completed' : ''}`}>{item.name}</div>
            </div>
            <button id="removeButton" onClick={(e) => {
              e.currentTarget.parentElement.style = "opacity: 0;"
              setTimeout(() => this.deleteItem(item.id), 600)
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" /></svg>
            </button>
          </li>
        )
      })
    )
    else if (show === "active") return (
      this.state.list.filter(item => item.completed === false).map(item => {
        return (
          <li className="todo" key={item.id}>
            <div className="left" onClick={() => this.setChecked(item.id)}>
              <div className="checkbox" style={{ background: item.completed ? `linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))` : `transparent` }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6" /></svg>
              </div>
              <div className={`text ${item.completed ? 'completed' : ''}`}>{item.name}</div>
            </div>
            <button id="removeButton" onClick={(e) => {
              e.currentTarget.parentElement.style = "opacity: 0;"
              setTimeout(() => this.deleteItem(item.id), 600)
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" /></svg>
            </button>
          </li>
        )
      })
    )
    else if (show === "completed") return (
      this.state.list.filter(item => item.completed === true).map(item => {
        return (
          <li className="todo" key={item.id}>
            <div className="left" onClick={() => this.setChecked(item.id)}>
              <div className="checkbox" style={{ background: item.completed ? `linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))` : `transparent` }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6" /></svg>
              </div>
              <div className={`text ${item.completed ? 'completed' : ''}`}>{item.name}</div>
            </div>
            <button id="removeButton" onClick={(e) => {
              e.currentTarget.parentElement.style = "opacity: 0;"
              setTimeout(() => this.deleteItem(item.id), 300)
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" /></svg>
            </button>
          </li>
        )
      })
    )
  }
  render() {
    return (
      <div className={`container ${this.state.darkmode ? "dark" : "light"}`}>
        <div className="top">
          <div className="titlelogo">
            <p>TODO</p>
            {this.state.darkmode ? (
              <svg onClick={() => this.setState({darkmode: false})} xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z" /></svg>
            ) : (
              <svg onClick={() => this.setState({darkmode: true})} xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>
            )}
          </div>
          <input value={this.state.newItem} onChange={e => this.changeState(e.target.value)} onKeyDown={e => {
            if (e.key === 'Enter' && this.state.newItem !== "") {
              this.addItem();
            }
          }} placeholder="Create a new todo..."></input>
        </div>
        <div className="todos">
          <ul>
            {this.display(this.state.showing)}
            <li className="info1">
              <div className="leftcol">{this.state.count} items left</div>
              <div className="centercol">
                <div className="blue" style={{ color: this.state.showing === "all" ? 'rgb(65, 65, 255)' : 'hsl(0, 0%, 80%)' }} onClick={() => this.setState({
                  showing: "all"
                })}>All   </div>
                <div className="blue" style={{ color: this.state.showing === "active" ? 'rgb(65, 65, 255)' : 'hsl(0, 0%, 80%)' }} onClick={() => this.setState({
                  showing: "active"
                })}>Active   </div>
                <div className="blue" style={{ color: this.state.showing === "completed" ? 'rgb(65, 65, 255)' : 'hsl(0, 0%, 80%)' }} onClick={() => this.setState({
                  showing: "completed"
                })}>Completed</div>
              </div>
              <div className="rightcol blue" onClick={(e) => {
                this.clearCompleted();
                const elem = e.currentTarget;
                elem.style = "scale: 1.1;color: rgb(65, 65, 255);";
                setTimeout(() => elem.style = "scale: 1.0;color: hsl(0, 0%, 80%);", 400)
              }}>Clear Completed</div>
            </li>
            <li className="info2">
              <div className="row1">
                <div className="leftcol">{this.state.count} items left</div>
                <div className="rightcol blue" onClick={(e) => {
                  this.clearCompleted();
                  const elem = e.currentTarget;
                  elem.style = "scale: 1.1;color: rgb(65, 65, 255);";
                  setTimeout(() => elem.style = "scale: 1.0;color: hsl(0, 0%, 80%);", 400)
                }}>Clear Completed</div>
              </div>
              <div className="row2">
                <div className="blue" style={{ color: this.state.showing === "all" ? 'rgb(65, 65, 255)' : 'hsl(0, 0%, 80%)' }} onClick={() => this.setState({
                  showing: "all"
                })}>All   </div>
                <div className="blue" style={{ color: this.state.showing === "active" ? 'rgb(65, 65, 255)' : 'hsl(0, 0%, 80%)' }} onClick={() => this.setState({
                  showing: "active"
                })}>Active   </div>
                <div className="blue" style={{ color: this.state.showing === "completed" ? 'rgb(65, 65, 255)' : 'hsl(0, 0%, 80%)' }} onClick={() => this.setState({
                  showing: "completed"
                })}>Completed</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
export default App;
