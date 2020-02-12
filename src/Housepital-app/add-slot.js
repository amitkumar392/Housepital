import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/app-route/app-location.js';

/**
* @customElement
* @polymer
*/
class AddSlot extends PolymerElement {
    static get template() {
        return html`
<style>
  :host {
    display: block; 

  }

</style>
<iron-form id="form">
  <form>
    <h2> Add Slot</h2>
    <paper-input label="Phone Number" id="phone" allowed-pattern=[0-9] type="text" value={{phone}} name="phone"  maxlength="10" required error-message="enter phone number" ></paper-input>
    <paper-input label="Password" id="pass" type="password" value={{password}} name="password" required error-message="enter user name" ></paper-input>
    <paper-button raised id="login" on-click="signIn">Login</paper-button>
  </form>
</iron-form>
hospitalId:Integer,
doctorId:Long,
date:LocalDate,
fromTime: String,
slotToTime:String

`;
    }
    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'Forex Transfer'
            },
            userName: {
              type: String,
              value: sessionStorage.getItem('userName')
            }, action: {
              type: String, 
              value: 'List'
            },
            data: Array,
        };
    }
    connectedCallback() {
      super.connectedCallback();
    let userId = sessionStorage.getItem('userId');
    this.userName = sessionStorage.getItem('userName');
      this._makeAjax(`http://10.117.189.177:9090/forexpay/users/${userId}/transactions`, 'get', null)
    }
     // calling main ajax call method 
  _makeAjax(url, method, postObj) {
    let ajax = this.$.ajax;
    ajax.method = method;
    ajax.url = url;
    ajax.body = postObj ? JSON.stringify(postObj) : undefined;
    ajax.generateRequest();
  }
  _handleTransfer(){
    this.set('route.path', './fund-transfer')
  }
  _handleResponse(event) {
    switch (this.action) {
      case 'List':
        this.data = event.detail.response;
        console.log(this.data)
        break;
    }
  }
    ready(){
      super.ready();
      let name =sessionStorage.getItem('userName');
      if(name === null) {
        this.set('route.path', './login-page')
      }
    }

}

window.customElements.define('add-slot', AddSlot);