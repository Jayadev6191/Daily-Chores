import React from 'react';
import { render } from 'react-dom';
import { AppBar, FloatingActionButton, Paper, FlatButton, TextField} from 'material-ui';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ToDo from './components/ToDo';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { colors } from 'material-ui/styles';
import {database} from './config';
require('./assets/styles/index.scss');

console.log(colors);
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
    var choreRef = database.ref('/list').child(key);
    choreRef.update({done:!status});
  }
  componentDidMount = () => {
    database.ref('/list').on('value', (snap)=>{
      this.setState({ todo_list: snap.val()});
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

    const addIcon = (
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
              iconElementRight={addIcon}
              style={{
                backgroundColor:colors.teal500
              }}
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
            <ToDo className="todo" list={todo_list} updateItem={(key,status)=>{this.updateChore(key,status)}} />
          </Paper>
        </MuiThemeProvider>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'));
