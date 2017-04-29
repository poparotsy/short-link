import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-config';

Meteor.startup(() => {
  WebApp.connectHandlers.use((request, response, next) => {
    // 1 => slice/start at the second character
    const _id = request.url.slice(1);
    const link = Links.findOne({ _id : _id });

      if (link) {
        response.statusCode = 302;
        response.setHeader('Location', link.url);
        response.end();
        Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }

  });
});
