import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { Paper, Checkbox} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/clear';
import Styles from '../assets/css/styles';
import { colors } from 'material-ui/styles';
import map from 'lodash/map';

const listItemStyle = {
  margin: '15px 0px'
};

const checkboxStyles = {
  marginTop:'20px',
  fill: colors.teal500,
};

class NoData extends React.Component {
  render() {
    return (
      <div>
        <h3>No Chores available</h3>
        <h5>Click (+) to add your new chore</h5>
      </div>
    )
  }
}

class ToDo extends React.Component {
  update = (i, status) => {
    this.props.updateItem(i,status);
  }
  deleteItem = (item) => {
    this.props.deleteItem(item);
  }
  render = () => {
    const {list} = this.props;

    return (
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
                            iconStyle={{fill: colors.teal500}}
                            onClick={this.update.bind(this, key, item.done)}/>
                }
                primaryText={
                  <p style={Styles.primaryText}>
                    {item.title}
                  </p>
                }
                secondaryText={
                  <p style={Styles.secondaryText}>
                    {item.short_desc}
                  </p>
                }
                rightIcon={
                  <ContentAdd style={checkboxStyles} onClick={() => this.deleteItem(key)}/>
                }
                secondaryTextLines={2}
              />
              </Paper>
            )
          })
        }
        {list === null ? <NoData/> : ""}
        </List>
    )
  }
}


export default ToDo;