import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { Paper,
         Checkbox, FloatingActionButton} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Styles from '../assets/styles/styles.js';
import map from 'lodash/map';

/* 
 import IconButton from 'material-ui/IconButton';
 import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
 import ContentCheck from 'material-ui/svg-icons/navigation/check';
 import ContentClear from 'material-ui/svg-icons/content/clear'; 
*/

console.log(Styles);

const listItemStyle = {
  margin: '15px 0px'
};

const checkboxStyles = {
  marginTop:'20px'
};

const addButtonStyle= {
  position:'absolute',
  marginTop:'30px',
  right:'40px',
  fontSize:'10px'
};

const addIcon = (
  <IconButton iconClassName="muidocs-icon-custom-github" />
);


class ToDo extends React.Component {
  update = (i, status) => {
    this.props.updateItem(i,status);
  }
  render = () => {
    const {list} = this.props;

    return (
      <Paper>
        <List className="list" style={Styles.listStyle}>
        {
          map(list, (item, key) => {
            return (
              <Paper key={key}>
              <ListItem
                style={item.done ? Styles.doneListStyle: listItemStyle}
                leftCheckbox={
                  <Checkbox style={checkboxStyles}
                            checked={item.done ? true : false}
                            onClick={this.update.bind(this, key, item.done)}/>
                }
                primaryText={
                  <span className="primary-text">{item.title}</span>
                }
                secondaryText={
                  <p>
                    {item.short_desc}
                  </p>
                }
                rightIcon={
                  addIcon
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