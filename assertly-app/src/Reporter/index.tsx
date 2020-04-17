
import { connect } from 'react-redux';
import {getTestSetEntries} from '../redux/actions/events';
import Reporter from './Reporter';

type RootState = {
  loading: boolean,
  events: any
};

const mapStateToProps = (state: RootState) => ({
  events: state.events.events,
});

const dispatchProps = {
  getTestSetEntries: getTestSetEntries,
};

export default connect(
  mapStateToProps,
  dispatchProps
)(Reporter)
