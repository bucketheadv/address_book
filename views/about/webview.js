import React from 'react';

import {
  WebView,
  ScrollView,
  Text,
  View
} from 'react-native';

var webview = React.createClass({
  render: function() {
    return (
      <View style={{flex:1}}>
        <WebView source={{uri: this.props.url}} />
      </View>
    );
  }
});

module.exports = webview;
