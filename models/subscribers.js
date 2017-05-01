import client from '../client/client';
import { observable } from 'mobx';
import Model from './model';

class SubscribersModel extends Model {

  unsubscribe() {
    localStorage.removeItem('img');
    if(this.imgSrc != false) {
      this.removeImage(this.imgSrc);
    }
    this.isSubscribe().then(res => {
      if(res) {
        this.removeAllSubscribe();
      }
      localStorage.removeItem('userdata');
      this.isEnter = false;
    });
  }

  subscribe(email, inTheme) {
    return client.subscribe(this.event_id, this.user_id, email, this.imgSrc, this.name, inTheme);
  }

  isSubscribe() {
    return client.isSubscribe(this.event_id, this.user_id);
  }

  getSubscribers() {
    return client.getSubscribers(this.event_id);
  }

  removeSubscriber() {
    return client.removeSubscriber(this.event_id, this.user_id);
  }

  removeAllSubscribe() {
    return client.removeAllSubscribe(this.user_id);
  }

}

export default SubscribersModel;
