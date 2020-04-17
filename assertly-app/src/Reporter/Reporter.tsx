import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import './reporter.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import MouseIcon from '@material-ui/icons/MouseSharp';
import HttpIcon from '@material-ui/icons/Http';
import Divider from '@material-ui/core/Divider';
import {upperCaseFirstLetter} from '../utils/string';
import {EventTypes} from '../Types/events';

type Props = {
  events: any;
  getTestSetEntries: Function;
};


class Reporter extends Component<Props> {
  componentDidMount() {    
    window.addEventListener("message", this.getTestSetEntries); 
    this.getTestSetEntries();
  }

  getTestSetEntries = () => {
    this.props.getTestSetEntries();
  };

  prettifyTag(tag: string) {
    switch(tag.toLowerCase()) {
      case 'a':
        return 'Link';
      default: 
        return upperCaseFirstLetter(tag);  
    }
  }

  generateSecondaryText(payload: any) : String {
    
    // const component =     
    return `${payload.tagType ? `${upperCaseFirstLetter(payload.tagType)} ` : ''}${this.prettifyTag(payload.tagName)}${payload.textContent ? ' "'+payload.textContent+'"' : ''}`
  }

  getIconFromAction(action : EventTypes) : any {
    switch(action) {
      case 'click':
      case 'select':
        return <MouseIcon color="primary" />;
      case 'change':
      default:  
        return <KeyboardIcon color="primary" />;
    }
  }

  render() {
    const { events } = this.props;

    const firstEventWithUrl = events.length > 0 && events.find((evt: any) => evt.url);
    const initialUrl = firstEventWithUrl && firstEventWithUrl.url;

    return (
          <div className="events-list">
          <List dense>
            {
              events.length > 0 &&
              <>
                <ListItem className="event-item">
                  <ListItemIcon>
                      <HttpIcon color="primary"/>
                  </ListItemIcon>
                  <ListItemText primary="Initial URL" secondary={initialUrl}  />
                </ListItem>
                <Divider/>
              {
                events.filter((evt: any) => evt.event_payload).map((event: any, key: number) => (
                <span key={key}>
                  {
                    key != 0 && event.url !== events[key - 1].url &&
                    <>
                      <ListItem className="event-item">
                        <ListItemIcon>
                            <HttpIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="URL Change" secondary={event.url}  />
                      </ListItem>
                      <Divider/>
                    </>
                  }
                  <ListItem key={key} className="event-item">
                    <ListItemIcon>
                        {this.getIconFromAction(event.event_payload.action)}
                    </ListItemIcon>
                    <ListItemText primary={upperCaseFirstLetter(event.event_payload.action)} secondary={this.generateSecondaryText(event.event_payload)} />
                  </ListItem>
                  <Divider/>
                </span>
                ))}
              </>
              }
          </List>
          </div>
    );
  }
}

export default Reporter;
