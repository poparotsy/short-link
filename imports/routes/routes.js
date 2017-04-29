import {Meteor} from 'meteor/meteor';
import React    from 'react';
import {Router, Route, browserHistory} from 'react-router';

import Login    from '../ui/Login';
import Signup   from '../ui/Signup';
import Links    from '../ui/Links';
import NotFound from '../ui/NotFound';

// window.browserHistory = browserHistory;



const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages   = ['/links'];
const onEnterPublicPage = () => {
  if(Meteor.userId()) {
    browserHistory.replace('/links');
  }
};
const onEnterPrivatePage = () => {
  if(!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage   = authenticatedPages.includes(pathname);

  if (isAuthenticated && isUnauthenticatedPage) {
    browserHistory.replace('/links');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};

export const routes = (
  <Router history={browserHistory}>

      <Route exact path="/" component={Login}  onEnter={onEnterPublicPage}/>
      <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
      <Route path="/links"  component={Links}  onEnter={onEnterPrivatePage}/>
      <Route path="*"       component={NotFound} />
    </Router>
);
