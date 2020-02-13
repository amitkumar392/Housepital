import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/app-route/app-location.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
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
      background-color: black;
      color: white;
    }
  
    span {
      margin: 10px;
    }
  form{
    margin:20px 100px 100px 100px;
  }
  #book{
    margin-bottom: 30px;;
  }
    #data {
      margin: 100px;
    }
#dashboard{
  position: absolute;
    right:0px;

}
#content {
    position: relative;
    background-color: white;
  }
    a {
      text-decoration: none;
      color: white;
    }
</style>
<div id="content">
<iron-form id="form">
<paper-button id="dashboard"><a href="[[rootPath]]dashboard-page">Dashboard</a></paper-button>
  <form>
    <h2> Add Slot</h2>
    <paper-dropdown-menu label="Location" id="location" >
      <paper-listbox slot="dropdown-content" class="dropdown-content" selected="0">
      <template is="dom-repeat" items={{location}}>
      <paper-item>{{item.locationName}}</paper-item>
      </template>
      </paper-listbox>
      </paper-dropdown-menu>
    <paper-input label="Date" id="date" type="date" ></paper-input>
    <paper-input label="From Time" id="fromTime" type="time" value={{fromTime}} ></paper-input>
    <paper-input label="To Time" id="time" type="time" ></paper-input>
    <paper-button raised id="book" on-click="_handlebook">Book</paper-button>
  </form>
</iron-form>
</div>
<iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" 
content-type="application/json" on-error="_handleError"></iron-ajax>
<paper-toast text="Slot Added" id="slot"></paper-toast>

`;
  }
  static get properties() {
    return {
      location: {
        type: Array,
        value: []
      }, id: {
        type: String,
        value: null
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
    this._makeAjax(`${baseUrl1}/housepital/locations`, 'get', null);
    this.action = 'Location';
  }

  _handlebook() {
    let hospital = this.$.location.value;
    for (let i = 0; i < this.location.length; i++) {
      if (hospital == this.location[i].locationName) {
        this.id = this.location[i].locationId;
      }
    }

    let obj = {
      hospitalId: parseInt(this.id),
      doctorId: parseInt(sessionStorage.getItem('doctorId')),
      date: parseInt(this.$.date.value),
      fromTime: parseInt(this.fromTime),
      slotToTime: parseInt(this.$.time.value)
    }
    console.log(obj)
    this._makeAjax(`http://10.117.189.106:9090/forexpay/users/${sessionStorage.getItem('doctorId')}/transactions`, 'post', obj)
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
       this.$.form.reset();
        break;
      case 'Location':
        this.location = event.detail.response;
        break;
    }
  }


}

window.customElements.define('add-slot', AddSlot);