import client from '../api/client';
import { observable } from 'mobx';
import Model from './model';

class SubscribersModel extends Model {

  exit() {
    this.isSubscribe().then(res => {
      if(res) {
        this.removeAllSubscribe();
        if(this.imgSrc != false) {
          this.removeImage(this.imgSrc);
        }
        localStorage.removeItem('userdata');
        this.isGuest = false;
        this.file = null;
        this.thumb = null;
      }
    });
  }

  subscribe(email, inTheme) {
    const promise = client.subscribe(this.event_id, this.user_id, email, this.imgSrc, this.name, inTheme);
    promise.then(()=>{
      this.isUser = this.getUser();
      this.sendmail(email);
    })
    return promise;
  }

  isSubscribe() {
    return client.isSubscribe(this.event_id, this.user_id);
  }

  getSubscribers() {
    return client.getSubscribers(this.event_id);
  }

  removeSubscriber() {
    const promise = client.removeSubscriber(this.event_id, this.user_id);
    promise.then(()=>{
      this.isUser = this.getUser();
    })
    return promise;
  }

  removeAllSubscribe() {
    return client.removeAllSubscribe(this.user_id);
  }

}

export default SubscribersModel;
