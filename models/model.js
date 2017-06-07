//import * as dbs from '../db/index';

//let db = dbs.data;

import client from '../api/client';

import { observable, action } from 'mobx';

class Model {
  @observable isGuest = this.getGuest();
  @observable isUser = this.getUser();
  @observable t = {};
  @observable file = null;
  @observable skip = false;
  @observable thumb = null;

  constructor() {
    this.user_id = null;
    this.name = '';
    this.language = 0;
    this.event_id = null;
    this.imgSrc = '';
  }

  @action enter(name, language) {
    const user_id = this.randomInteger(1, 999) + "_" + Date.now();

    this.user_id = user_id;
    this.name = name;
    this.language = +language;
    this.isGuest = true;

    const userdata = {user_id: user_id, name: name, language: language};

    this.makeImage(userdata, userdata => {
      localStorage.setItem('userdata', JSON.stringify(userdata));
    });
  }

  getGuest() {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    if (userdata) {
      this.user_id = userdata.user_id;
      this.name = userdata.name;
      this.language = + userdata.language;
      this.imgSrc = userdata.img;
      return true;
    } else {
      return false;
    }
  }

  getUser() {
    const data = client.isUser(this.user_id);
    return data.then(response => {
      if (response.isUser !== "false") {
        this.isUser = response.isUser;
      } else {
        this.isUser = false;
      }
    });
  }

  getTranslate () {
    return client.getTranslate(this.language)
    .then(result => {
      this.t = JSON.parse(result.getTranslate);
    });
  }

  getContentEvent(id) {
    this.event_id = id;
    return client.getContentEvent(id);
  }


  makeImage(userdata, func) {
    let imgr = this.uploadImage(this.file);
    imgr.then( (r) => {
      if (r === "false") {
        r = false;
      }
      this.imgSrc = r;
      userdata.img = r;
      func(userdata);
    });
  }

  uploadImage(imageFile) {
    return new Promise((resolve, reject) => {
      let imageFormData = new FormData();
      imageFormData.append('imageFile', imageFile);
      var xhr = new XMLHttpRequest();
      xhr.open('post', '/upload', true);
      xhr.onload = function () {
        if (this.status == 200) {
          resolve(this.response);
        } else {
          reject(this.statusText);
        }
      };
      xhr.send(imageFormData);
    });
  }

  removeImage(src) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open('delete', '/rm_av?src=.' + src, true);
      xhr.onload = function () {
        if (this.status == 200) {
          //console.log('FFFF', this.response);
          resolve(this.response);
        } else {
          reject(this.statusText);
        }
      };
      xhr.send();
    });
  }

  randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  getAllEvents() {
     return client.getAllEvents();
  }

  writeComment(comment_text) {
    return client.writeComment(this.event_id, this.user_id, this.imgSrc, this.name, comment_text).then(() => this.sendmail(null, comment_text));
  }

  readComments() {
    return client.readComments(this.event_id);
  }

  deleteComment(_id) {
    return client.deleteComment(_id);
  }

  recovery(email) {

    return fetch('/signIn?email=' + email, {method: 'GET'})
      .then(function(response) {
        return response.json();
       })
      .catch( alert );

    // return new Promise((resolve, reject) => {
    //   var xhr = new XMLHttpRequest();
    //   xhr.open('get', '/sendMail', true);
    //   xhr.onload = function () {
    //     if (this.status == 200) {
    //       resolve(this.response);
    //       console.log(this.response);
    //     } else {
    //       reject(this.statusText);
    //     }
    //   };
    //   xhr.send({email: email});
    // });
  }

  sendmail(email, comment = null) {
    return fetch('/sendMail', {method: 'POST', headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: 'event_id=' + this.event_id + '&name=' + this.name + '&email=' + email + '&comment=' + comment})
      .then(function(response) {
        return response.json();
       })
      .catch( alert );
  }
}

export default Model;
