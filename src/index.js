import React from 'react';
import { render } from 'react-dom';
import { AppBar, FloatingActionButton, Paper, FlatButton, TextField} from 'material-ui';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ToDo from './ToDo';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {database} from './config';
require('./assets/styles/index.scss');

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const addButtonStyle= {
  position:'absolute',
  marginTop:'30px',
  right:'40px',
  fontSize:'10px'
};


class App extends React.Component {
  state = { open: false, canAdd:false, title:"", short_desc:"", todo_list: []};

  addItem = () => {
    this.setState({open: true})
  }
  handleClose = () => {
    this.setState({open: false});
  }
  addChore = () => {
    const { title, short_desc, todo_list } = this.state;
    // Add Chore to Firebase
    database.ref('/list').push({title, short_desc, done: false});
    // Listen to updates on '/list'
    database.ref('/list').on('child_added',list_item => {
      todo_list[list_item.key] = list_item.val()
      this.setState({todo_list},()=>{
        this.setState({open:false});
      });
    });
  }
  updateChore = (key, status) => {
    const { todo_list } = this.state;
    var choreRef = database.ref('/list').child(key);
    choreRef.update({done:!status});
    todo_list[key] = choreRef;
    console.log(todo_list);
    this.setState({todo_list});
  }
  componentDidMount = () => {
    database.ref('/list').once('value').then((list_item)=> {
        this.setState({ todo_list: list_item.val()});
    });
  }
  render() {
    const { todo_list } = this.state;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Add"
        disabled={this.state.title === "" ? true : false}
        primary={true}
        keyboardFocused={true}
        onClick={this.addChore}
      />
    ];

    const icon = (
      <FloatingActionButton tooltip="Ligature" mini={true} secondary={true} style={addButtonStyle} onClick={this.addItem}>
        <ContentAdd />
      </FloatingActionButton >
    );

    return (
      <div className="app" style={styles}>
        <MuiThemeProvider>
          <Paper>
            <AppBar
              title="Daily Chores"
              iconElementRight={icon}
            />
            <Dialog
              title="Add Chore"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}>
              <TextField
                floatingLabelText="Title"
                value={this.state.title}
                errorText="This field is required."
                onChange={(evt)=>{ this.setState({title:evt.target.value})}}
              /><br />
              <TextField
                floatingLabelText="Short Description"
                value={this.state.short_desc}
                onChange={(evt)=>{ this.setState({short_desc:evt.target.value})}}
              />
            </Dialog>
            <ToDo className="todo" list={todo_list} updateDone={(key,status)=>{this.updateChore(key,status)}} />
          </Paper>
        </MuiThemeProvider>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'));
