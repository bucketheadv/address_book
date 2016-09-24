import React from 'react';
var Address = require('./address');
var Service = require('../service');
var Util = require('../util');

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

var ItemBlock = React.createClass({
  render: function() {
    var size = {
      width: parseInt(this.props.width),
      height: parseInt(this.props.width),
      backgroundColor: this.props.color
    };
    return (
      <TouchableHighlight underlayColor='#fff' onPress={this._loadPage}>
        <View style={[styles.itemBlock, size]}>
          <View>
            <Text style={styles.font18}>{this.props.title}</Text>
          </View>
          <View>
            <Text style={styles.font10}>{this.props.partment}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  _loadPage: function(e) {
    var nav = this.props.nav;
    var key = Util.key;
    var partment = this.props.partment;
    var path = Service.v1.users;

    Util.get(path + "?key=" + key + "&partment=" + partment,function(data) {
      nav.push({
        title: this.props.tag,
        component: Address,
        passProps: {
          data: data
        }
      }, function(err) {
        alert(err);
      });
    }.bind(this));
  }
});

var styles = StyleSheet.create({
  itemBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 10
  },
  font18: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500'
  },
  font10: {
    color: '#fff',
    fontSize: 10
  }
});

module.exports = ItemBlock;
