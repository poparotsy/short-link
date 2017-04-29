import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Tracker} from 'meteor/tracker';
import {Links} from '../api/links';
import LinksListItem from './LinksListItem';
import FlipMove from 'react-flip-move';

export default class LinksList extends React.Component{

  constructor(props) {
    super(props);
      this.state = {
        links: []
      };
  }
  // lifesycle methods
  componentDidMount() {
    console.log('componentDidMount LinksList');
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find({
        visable: Session.get('showVisable')
      }).fetch();
      // this.setState({links: links});
      this.setState({links}); // ES6 syntax
      // console.log(this.state.links);
    });

  };
  componentWillUnmount() {
    console.log('componentWillUnmount LinksList');
    this.linksTracker.stop();
  };

  renderLinksListItems(){

    if (this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item--status-message">No active links found, try uncheck hide links above</p>
        </div>
      );
    }


    return this.state.links.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>
      // return <li key={link._id}>{link.url}</li>
    });
  };

  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
        {this.renderLinksListItems()}
      </FlipMove>
      </div>
    );
  };
};