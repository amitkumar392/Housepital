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
  #form{
    background-color:white;
    border:2px solid red;
    border-radius:10px;
    margin:70px auto;
    width:60%;
  }

</style>
<iron-form id="form">
  <form>
    <h2> Add Slot</h2>
    <paper-input label="Date" id="date" type="date" value={{date}} ></paper-input>

    <paper-input label="Hospital Name" id="hospitalName" type="text" value={{hospitalName}} ></paper-input>
    
    <paper-input label="Location" id="location" type="text" value={{location}} ></paper-input>
    <paper-input label="From Time" id="fromTime" type="time" value={{fromTime}} ></paper-input>
    <paper-input label="To Time" id="slotTime" type="time" value={{time}} ></paper-input>

    <paper-button raised id="login" on-click="signIn">Book</paper-button>
  </form>
</iron-form>


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