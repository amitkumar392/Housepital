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
class Dashboard extends PolymerElement {
    static get template() {
        return html`
<style>
  :host {
    display: block; 

  }
  paper-button{
    float:right;
    background-color:black;
    color:white;
  }
  #buttons{

  }
a{
  text-decoration:none;
  color:white;
}
</style>
<div id="buttons">
<paper-button><a href="[[rootPath]]add-slot">Add Slot</a></paper-button>
<paper-button><a href="[[rootPath]]login">Logout</a></paper-button>
</div>
<iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" 
content-type="application/json" on-error="_handleError"></iron-ajax>
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
      this._makeAjax(`${this.baseURI}/housepital/doctors/{doctorId}/appointments`, 'get', null)
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

window.customElements.define('dashboard-page', Dashboard);