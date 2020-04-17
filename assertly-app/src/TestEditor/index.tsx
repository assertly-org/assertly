import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Reporter from '../Reporter';
import Runner from '../Runner';

import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import ReplayIcon from '@material-ui/icons/Replay';
import Fab from '@material-ui/core/Fab';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import BackIcon from '@material-ui/icons/ArrowBack'
import AssertIcon from '@material-ui/icons/AssignmentTurnedIn';
import StopAssertIcon from '@material-ui/icons/HighlightOff';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import './styles.css';

 //export default () => {return (<Runner/>)}



export default () => {
  const [asserting, setAsserting] = useState<Boolean>(false);
  const [currentUrl, setCurrentUrl] = useState<String>('');
  const {events} = useSelector((state: any) => ({events: state.events.events}));
  

  const toggleAssert = (on: Boolean) => {
    setAsserting(on);
    (window as any).frames.runner.postMessage(JSON.stringify({assert: on}), '*');
  };

  useEffect(() => {
    const lastEventWithUrl = events && events.length > 0 && events.reverse().find((evt: any) => evt.url);
    const url = lastEventWithUrl && lastEventWithUrl.url;
    
    if (url !== currentUrl)
      setCurrentUrl(url);
  });  

  return (
    <Grid container spacing={2}>
      <Grid container item xs={12} style={{padding: '15px 15px'}}>
        <Grid item xs={4}>  
          <Grid container alignItems="center">
            <Link to='/testsets'>
              <BackIcon color="primary" />
            </Link>
            <Divider orientation="vertical" />
            <Button  size="small" color="default">
              <ReplayIcon color="primary"/> Replay
            </Button>
            <Divider orientation="vertical" />
            <Button onClick={() => toggleAssert(!asserting)}  size="small" color="default">
              {asserting ? <StopAssertIcon color="primary"/> : <AssertIcon color="primary"/>} Assert
            </Button>
          </Grid>         
        </Grid>  
        <Grid item xs={8}>
            <input className="url-bar" value={String(currentUrl)} disabled/>
        </Grid>        
      </Grid> 
      <Grid item xs={4}>   
        <h3>Events</h3>     
        <Reporter />
      </Grid>
      <Grid item xs={8}>
       <h3>Runner</h3>         
        <Runner />
      </Grid>
    </Grid>
  );
}
