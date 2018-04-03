import React, { Component } from 'react';
import { List } from 'material-ui/List';
import Loader from './Loader';

class Feed extends Component {
  render() {
    const { loading, feedList, FeedItem } = this.props;

    if (!feedList) {
      if (loading) {
        return <Loader type="bars" color="#333" />;
      }
      return null;
    }

    return (
      <List>
        {Object.keys(feedList).map((key) => {
          const value = feedList[key];
          return (
            <FeedItem key={key} {...value} />
          );
        })}
      </List>
    );
  }
}

export default Feed;
