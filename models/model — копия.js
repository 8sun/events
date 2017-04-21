//import * as dbs from '../db/index';

//let db = dbs.data;

import client from '../client/client';

import { observable } from 'mobx';

class Model {
  @observable isEnter = this.getContent();
  @observable l = {};

  constructor() {
    this.name = '';
    this.language = 0;
  }

  enter(name, language) {
    const userdata = {name: name, language: language};
    
    localStorage.setItem('userdata', JSON.stringify(userdata));
    
    this.name = name;
    this.language = +language;
    this.isEnter = true;
  }

  getContent() {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    if (userdata) {
      this.name = userdata.name;
      this.language = Number(userdata.language);
      return true;
    } else {
      return false;
    }
  }

  db(phrase) {
    return client.getPhrase(this.language)
    .then(result => {
      this.l = JSON.parse(result.getData);
    });
  }

  unsubscribe() {
    localStorage.removeItem('userdata');
    this.isEnter = false;
  }

  img() {
    const img = JSON.parse(localStorage.getItem('img'));
    return img;
  }


//   @observable inputValue = '';
//   @observable textareaValue = '';

//   Print(e) {
  //    this.textareaValue = this.inputValue;
  //    this.test = true;
  //  }


  // changeInput(e) {
    //  this.inputValue = e.target.value;
    // }

  }

  export default Model;
