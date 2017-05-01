//import * as dbs from '../db/index';

//let db = dbs.data;

import client from '../client/client';

import { observable } from 'mobx';

class Model {
  @observable isEnter = this.getContent();
  @observable t = {};
  @observable file = '';
  @observable imagePreviewUrl = '';
  @observable imgSrc = '';
  @observable snippet = '';
  @observable text = '';
  @observable title = '';
  @observable error = null;

  constructor() {
    this.user_id = null;
    this.name = '';
    this.language = 0;
    this.event_id = null;
  }

  enter(name, language) {
    const user_id = this.randomInteger(1, 999) + "_" + Date.now();
    const userdata = {user_id: user_id, name: name, language: language};
    
    localStorage.setItem('userdata', JSON.stringify(userdata));

    this.user_id = user_id;
    this.name = name;
    this.language = +language;
    this.isEnter = true;

    this.makeImage();
  }

  getContent() {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    if (userdata) {
      this.user_id = userdata.user_id;
      this.name = userdata.name;
      this.language = Number(userdata.language);
      return true;
    } else {
      return false;
    }
  }

  getTranslate () {
    return client.getTranslate(this.language)
    .then(result => {
      this.imgSrc = JSON.parse(localStorage.getItem('img'));
      this.t = JSON.parse(result.getTranslate);
    });
  }

  getContentEvent(id) {
    return client.getContentEvent(id)
    .then(result => {
      this.snippet = result.getContentEvent.snippet;
      this.text = result.getContentEvent.text;
      this.title = result.getContentEvent.title;
    }, resolve => this.error = resolve);
  }


  makeImage() {
    let imgr = this.uploadImage(this.file);
    imgr.then( (r) => {
      //console.log(r);
      if (r === "false") {
        r = false;
      }
      this.imgSrc = r;
      localStorage.setItem('img', JSON.stringify(r));
    } );
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
    return client.writeComment(this.event_id, this.user_id, this.imgSrc, this.name, comment_text);
  }

  readComments() {
    return client.readComments(this.event_id);
  }

  deleteComment(_id) {
    return client.deleteComment(_id);
  }
}

export default Model;
