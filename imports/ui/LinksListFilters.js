import React from 'react';
import {Session} from 'meteor/session';
import {Tracker} from 'meteor/tracker';


export default class LinksListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      showVisable: true
    })
  }

  componentDidMount(){
    this.visableTracker = Tracker.autorun(() => {
      this.setState ({
        showVisable: Session.get('showVisable')
      });
    });
  }
  componentWillUnmount(){
    this.visableTracker.stop();
  }


      render() {
        return (
          <div>
            <label className="checkbox">
              <input className="checkbox--box" type="checkbox" checked={!this.state.showVisable}
                onChange={(e) => {
                  Session.set('showVisable', !e.target.checked);
                }}/>
              show hidden links
            </label>
          </div>
        );
      }
    }
