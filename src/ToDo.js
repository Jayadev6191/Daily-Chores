import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { Paper,
         Checkbox} from 'material-ui';
import map from 'lodash/map';

/* 
 import IconButton from 'material-ui/IconButton';
 import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
 import ContentCheck from 'material-ui/svg-icons/navigation/check';
 import ContentClear from 'material-ui/svg-icons/content/clear'; 
*/

const listStyle = {
  padding: '20px 20px',
  margin:'15px 0px'
};

const doneListStyle = {
  padding: '20px 20px',
  margin:'15px 0px',
  textDecoration: 'line-through'
};

const listItemStyle = {
  margin: '15px 0px'
};

const checkboxStyles = {
  marginTop:'20px'
};

class ToDo extends React.Component {
  markAsDone = (i, status, event) => {
    console.log(i);
    console.log(status);
    this.props.updateDone(i,status);
    // console.log(event);
    // const finished_item = this.state.finished_list;
    // database.ref('/finished_items').push(this.state.todo_list[i]);
    // finished_item.push(this.state.todo_list[i])
    // this.setState({finished_list: finished_item})
  }
  render = () => {
    const {list} = this.props;

    return (
      <Paper>
        <List className="list" style={listStyle}>
        {
          map(list, (item, key) => {
            return (
              <Paper key={key}>
              <ListItem
                style={item.done ? doneListStyle: listItemStyle}
                leftCheckbox={
                  <Checkbox style={checkboxStyles}
                            checked={item.done ? true : false}
                            onClick={this.markAsDone.bind(this, key, item.done)}/>
                }
                primaryText={
                  <span>{item.title}</span>
                }
                secondaryText={
                  <p>
                    {item.short_desc}
                  </p>
                }
                secondaryTextLines={2}
              />
              </Paper>
            )
          })
        }
        </List>
      </Paper>
    )
  }
}


export default ToDo;