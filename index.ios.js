/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
  Image,
  TextInput,
  StatusBarIOS,
  ScrollView,
  TouchableHighlight,
  ActivityIndicator,
  AlertIOS,
  AsyncStorage
} from 'react-native';

var AdSupportIOS = require('AdSupportIOS');
var Home = require('./views/home');
var About = require('./views/about');
var Manager = require('./views/manager');
var Message = require('./views/message');
var Util = require("./views/util");
var Service = require('./views/service');
var CookieManager = require('./views/utils/cookie_manager');

var AddressBook = React.createClass({
  statics: {
    title: '主页',
    description: '选项卡'
  },

  getInitialState: function() {
    return {
      email: 'test1@123.com',
      password: '123123123',
      selectedTab: 'home',
      showIndex: {
        height: 0,
        opacity: 0
      },
      showLogin: {
        flex: 1,
        opacity: 1
      },
      isLoadingShow: false
    };
  },

  componentDidMount: function() {
    var that = this;
    AsyncStorage.getItem('token', function(err, token) {
      if (!err && token) {
        var path = Service.v1.loginByToken;
        Util.post(path, {
          token: token
        }, function(data){
          if(data.status) {
            that._showHome();
          }
        });
      } else {
        that._showLogin();
      }
    });
    var path = Service.v1.messages;
    Util.get(path, function(data){
      that.setState({
        data: data
      });
    });
  },

  _selectTab: function(tabName) {
    this.setState({
      selectedTab: tabName
    });
  },

  _addNavigator: function(component, title) {
    var data = "";
    if(title === '公告') {
      data = this.state.data;
    }

    return (<NavigatorIOS
      style={{flex:1}}
      barTintColor='#007AFF'
      titleTextColor='#fff'
      tintColor='#fff'
      translucent={false}
      initialRoute={{
        component: component,
        title: title,
        passProps: {
          data: data
        }
      }}
    />);
  },

  _getEmail: function(val){
    var email = val;
    this.setState({
      email: email
    });
  },

  _getPassword: function(val) {
    var password = val;
    this.setState({
      password: password
    });
  },

  _login: function() {
    var email = this.state.email || '';
    var password = this.state.password || '';
    var path = Service.v1.login;
    var that = this;
    that.setState({
      showLogin: {
        height: 0,
        width: 0,
        flex: 0
      },
      isLoadingShow: true
    });
    AdSupportIOS.getAdvertisingTrackingEnabled(function(){
      AdSupportIOS.getAdvertisingId(function(deviceId) {
        Util.post(path, {
          user: {
            email: email,
            password: password,
          },
          deviceId: deviceId
        }, function(status, data) {
          if(status === 200 || status === 201) {
            var user = data.data;
            CookieManager.writeCookie(function(cookie) {
              AsyncStorage.multiSet([
                //['username', user.username],
                //['token', user.token],
                ['_cookie', JSON.stringify(cookie)],
                ['userid', "" + user.id],
                ['email', user.email]
                //['tel', user.tel],
                //['partment', user.partment],
                //['tag', user.tag]
              ], function(err){
                if(!err) {
                  that._showHome();
                }
              });
            });
          } else {
            var error;
            if (typeof(data.error) != 'string') {
              error = data.error.join(",");
            } else {
              error = data.error;
            }
            AlertIOS.alert('登录', error);
            that._showLogin();
            //that._showHome();
          }
        }, function(err) {
          that._showLogin();
          alert(err);
        });
      }, function() {
        AlertIOS.alert('设置', '无法获取设备唯一标识');
      });
    }, function(){
      AlertIOS.alert('设置', '无法获取设备唯一标识，请关闭设置->隐私->广告->限制广告跟踪');
    });
  },

  _showHome: function() {
    this.setState({
      showLogin: {
        height: 0,
        width: 0,
        flex: 0
      },
      showIndex: {
        flex: 1,
        opacity: 1
      },
      isLoadingShow: false
    });
  },

  _showLogin: function() {
    this.setState({
      showLogin: {
        flex: 1,
        opacity: 1
      },
      showIndex: {
        height: 0,
        width: 0,
        flex: 0
      },
      isLoadingShow: false
    });
  },

  render: function() {
    return (
      <View style={{flex:1}}>
        {this.state.isLoadingShow ?
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size="small" color="#268DFF"></ActivityIndicator>
          </View> : null
        }
        {!this.state.isLoadingShow ?
          <View style={this.state.showIndex}>
            <TabBarIOS barTintColor="#FFF">
              <TabBarIOS.Item
                icon={require('image!phone_s')}
                title='首页'
                selected={this.state.selectedTab === 'home'}
                onPress={this._selectTab.bind(this, 'home')}
                >
                {this._addNavigator(Home, '主页')}
              </TabBarIOS.Item>

              <TabBarIOS.Item
                icon={require('image!gonggao')}
                title='公告'
                selected={this.state.selectedTab === 'message'}
                onPress={this._selectTab.bind(this, 'message')}
                >
                {this._addNavigator(Message, '公告')}
              </TabBarIOS.Item>

              <TabBarIOS.Item
                icon={require('image!manager')}
                title='管理'
                selected={this.state.selectedTab === 'manager'}
                onPress={this._selectTab.bind(this, 'manager')}
                >
                {this._addNavigator(Manager, '管理')}
              </TabBarIOS.Item>

              <TabBarIOS.Item
                icon={require('image!about')}
                title='关于'
                selected={this.state.selectedTab === 'about'}
                onPress={this._selectTab.bind(this, 'about')}
                >
                {this._addNavigator(About, '关于')}
              </TabBarIOS.Item>
            </TabBarIOS>
          </View> : null
        }
        <ScrollView style={[this.state.showLogin]} contentContainerStyle={styles.loginView}>
          <View style={styles.container}>
            <View>
              <Image style={styles.logo} source={require('image!logo')}></Image>
            </View>

            <View style={styles.inputRow}>
              <Text>邮箱</Text><TextInput style={styles.input}
                placeholder="请输入邮箱" onChangeText={this._getEmail} value={this.state.email} />
            </View>

            <View style={styles.inputRow}>
              <Text>密码</Text><TextInput style={styles.input}
                placeholder="请输入密码" password={true} onChangeText={this._getPassword} value={this.state.password} />
            </View>

            <View>
              <TouchableHighlight underlayColor='#fff' style={styles.btn}
                onPress={this._login}>
                <Text style={{color: '#fff'}}>登录</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  loginView: {
    justifyContent: 'center',
    flex: 1
    //marginTop: 100
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: Image.resizeMode.contain
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  input: {
    marginLeft: 10,
    width: 220,
    borderWidth: Util.pixel,
    height: 35,
    paddingLeft: 8,
    borderRadius: 5,
    borderColor: '#ccc'
  },
  btn: {
    marginTop: 10,
    width: 80,
    height: 35,
    backgroundColor: '#3BC1FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  }
});

AppRegistry.registerComponent('address_book', () => AddressBook);
