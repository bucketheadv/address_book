import React from 'react';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  AlertIOS,
  AsyncStorage
} from 'react-native';

var Service = require('../service');
var Util = require('../util');
var ModifyPassword = React.createClass({
  getInitialState: function() {
    return {
      password: '',
      new_password: ''
    };
  },
  render: function() {
    return (
      <ScrollView>
        <View style={{height:35,marginTop:30}}>
          <TextInput style={styles.input} password={true} placeholder='原始密码' onChangeText={this._getOldPassword} />
        </View>

        <View style={{height:35,marginTop:5}}>
          <TextInput style={styles.input} password={true} placeholder='新密码' onChangeText={this._getNewPassword} />
        </View>

        <View>
          <TouchableOpacity onPress={this._resetPassword}>
            <View style={styles.btn}>
              <Text style={{color:'#fff'}}>修改密码</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  },

  _getOldPassword: function(val) {
    this.setState({
      password: val
    });
  },

  _getNewPassword: function(val) {
    this.setState({
      new_password: val
    });
  },

  _resetPassword: function() {
    var path = Service.v1.user;
    var that = this;
    AsyncStorage.getItem('userid', function(err, data) {
      if(!err) {
        Util.put(path, {
          user: {
            new_password: that.state.new_password,
            password: that.state.password
          }
        }, function(status, data) {
          if(status == 200) {
            AlertIOS.alert('成功', "密码修改成功");
          } else {
            AlertIOS.alert('失败', data.error[0]);
          }
        });
      } else {
        AlertIOS.alert('失败', data.data);
      }
    });
  }
});

var styles = StyleSheet.create({
  input: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    height: 35,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingLeft: 5,
    fontSize: 13
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#1DB8FF',
    height: 38,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 4
  }
});

module.exports = ModifyPassword;
