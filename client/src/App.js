import React from 'react';
import io from 'socket.io-client';

class App extends React.Component {
  state = {
    // tasks: [{id: 1, name: 'aa'}, {id: 2, name: 'bb'}],
    tasks: [],
  }

  componentDidMount(){
    // this.socket.connect('localhost:8000');
    this.socket = io.connect('localhost:8000');
  };

  removeTask(id) {
    this.setState({ tasks: this.state.tasks.splice(id, 1) });
    this.socket.emit('removeTask', id);
  };

  render() {
    const { tasks } = this.state;

    

    return (
      <div className="App">
        <header>
          <h1>ToDoList.app</h1>
        </header>

        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>

          <ul className="tasks-section__list" id="tasks-list">
            {tasks.map(task => (
              <li key={task.id} class="task">
                {task.name} 
                <button class="btn btn--red" onClick={() => this.removeTask(task.id)}>
                  Remove
                </button>
              </li>
            ))}

            {/* <li class="task">Shopping <button class="btn btn--red">Remove</button></li>
            <li class="task">Go out with a dog <button class="btn btn--red">Remove</button></li> */}
          </ul>

          <form id="add-task-form">
            <input className="text-input" autocomplete="off" type="text" placeholder="Type your description" id="task-name" />
            <button className="btn" type="submit">Add</button>
          </form>

        </section>
      </div>
    );
  };

};

export default App;