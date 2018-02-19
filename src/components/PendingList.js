import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { Checkbox} from 'material-ui';
import map from 'lodash/map';



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
                <h1>Pending List</h1>
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
