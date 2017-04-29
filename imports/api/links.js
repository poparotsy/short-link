import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';


export const Links = new Mongo.Collection('links');

if(Meteor.isServer) {
    Meteor.publish('links', function () {
          return Links.find({userId: this.userId});
    });
}

Meteor.methods({

  'links.insert'(url) {
    if (!this.userId) {
      throw new Meteor.Error('operation not permitted');
    }

    new SimpleSchema({
      url: {
          type: String,
          label: 'Your link',
          regEx: SimpleSchema.RegEx.Url
        }
      }).validate({ url });

    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visable: true,
      visitedCount: 0,
      lastVisitedAt: null
    });
  },
  //-------------------------------------
  'link.setVisability'(_id, visable) {
    if (!this.userId) {
      throw new Meteor.Error('operation not permitted');
    }
    new SimpleSchema({
      _id: {
        type: String,
        min : 1
      },
      visable: {
        type: Boolean
      }
    }).validate({_id, visable});

    Links.update({
      _id: _id,
      userId: this.userId
    },
    {
      $set: {visable: visable}
    });
  },
  //---------------------------------------
  'links.trackVisit'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min : 1
      }
    }).validate({ _id });

    Links.update({_id: _id}, {
      $set: {
        lastVisitedAt: new Date().getTime()
      },
      $inc: {
        visitedCount: 1
      }
    });
  }
  //---------------------------------------
});
