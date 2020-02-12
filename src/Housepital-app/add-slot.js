import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/app-route/app-location.js';
import '@polymer/paper-toast/paper-toast.js';

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
      font-family: Comic Sans, Comic Sans MS, cursive;
    }
  
    paper-button {
      float: right;
      background-color: black;
      color: white;
    }
  
    span {
      margin: 10px;
    }
  
    paper-card {
      width: 1000px;
    }
  #form{
    background-color:white;
    margin-top:50px;
  }
    #data {
      margin: 100px;
    }

    a {
      text-decoration: none;
      color: white;
    }
</style>

<paper-button><a href="[[rootPath]]dashboard-page">Dashboard</a></paper-button>
<paper-button on-click="_handleLogout"><a href="[[rootPath]]login">Logout</a></paper-button>
<iron-form id="form">
  <form>
    <h2> Add Slot</h2>
    <paper-input label="Date" id="date" type="date" ></paper-input>
    <paper-input label="From Time" id="fromTime" type="time" value={{fromTime}} ></paper-input>
    <paper-input label="To Time" id="time" type="time" ></paper-input>
    <paper-button raised id="login" on-click="_handlebook">Book</paper-button>
  </form>
</iron-form>
<iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" 
content-type="application/json" on-error="_handleError"></iron-ajax>
<paper-toast text="Slot Added" id="slot"></paper-toast>

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
  _handleLogout() {
    sessionStorage.clear();
  }
  connectedCallback() {
    super.connectedCallback();
   
  }

  _handlebook() {
    let obj = {
      hospitalId: parseInt('1'),
      doctorId: parseInt(sessionStorage.getItem('doctorId')),
      date: parseInt(this.$.date.value),
      fromTime: parseInt(this.fromTime),
      slotToTime: parseInt(this.$.time.value)
    }

    this._makeAjax(`http://10.117.189.177:9090/forexpay/users/${sessionStorage.getItem('doctorId')}/transactions`, 'post', obj)
  }
  // calling main ajax call method 
  _makeAjax(url, method, postObj) {
    let ajax = this.$.ajax;
    ajax.method = method;
    ajax.url = url;
    ajax.body = postObj ? JSON.stringify(postObj) : undefined;
    ajax.generateRequest();
  }

  _handleResponse(event) {
    switch (this.action) {
      case 'List':
        this.data = event.detail.response;
        this.$.slot.open()
        this.set('route.path', './dashboard-page')
        break;
    }
  }


}

window.customElements.define('add-slot', AddSlot);