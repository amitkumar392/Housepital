import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/app-route/app-location.js';
import '@polymer/polymer/lib/elements/dom-repeat';
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
    font-family: Comic Sans, Comic Sans MS, cursive;
  }

  paper-button {
    background-color: black;
    color: white;
  }

  span {
    margin: 10px;
  }

  table,
  th,
  td {
    border-collapse: collapse;
  }

  th,
  td {
    text-align: left;
    padding: 15px;
    color: rgb(255, 255, 255);
  }

  #tab1 {
    width: 100%;

  }

  #tab1 th {
    background-color: rgb(102, 102, 102);
    color: white;
  }

  #tab1 tr:nth-child(even) {
    background-color: rgb(134, 134, 134);
  }

  #content {
    position: relative;
    background-color: white;
  }

  #tab1 tr:nth-child(odd) {
    background-color: rgb(134, 134, 134);
  }

  #data {
    margin: 10px 0px 0px 0px;
  
  }

  h1 {
    color: black;
  }
h2{
  text-align: center;
}
  #addSlot {
    position: absolute;
    right:0px;
  }

  a {
    text-decoration: none;
    color: white;
  }
</style>
<div id="content">
  <paper-button id="addSlot"><a href="[[rootPath]]add-slot">Add Slot</a></paper-button>
  <h1>Welcome, {{name11}}</h1>
  <h2>Your Appointments</h2>
  <div id="data">
    <table id="tab1">
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Hospital Name</th>
        <th>Date</th>
        <th>Time</th>
        <th>Mobile</th>
      </tr>
      <template is="dom-repeat" items={{data}}>
        <tr>
          <td>{{item.patientName}}</td>
          <td>{{item.email}}</td>
          <td>{{item.hospitalName}}</td>
          <td>{{item.date}}</td>
          <td>{{item.slotTime}}</td>
          <td>{{item.mobile}}</td>
        </tr>
      </template>
    </table>
  </div>
</div>
<iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" content-type="application/json"
  on-error="_handleError"></iron-ajax>
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
name11:{
type:String,
value:sessionStorage.getItem('doctorName')
},
data: Array,
};
}

connectedCallback() {
super.connectedCallback();
let doctorId = sessionStorage.getItem('doctorId')
this._makeAjax(`http://10.117.189.106:9090/housepital/doctors/${doctorId}/appointments`, 'get', null)
}
// calling main ajax call method
_makeAjax(url, method, postObj) {
let ajax = this.$.ajax;
ajax.method = method;
ajax.url = url;
ajax.body = postObj ? JSON.stringify(postObj) : undefined;
ajax.generateRequest();
}
_handleTransfer() {
this.set('route.path', './fund-transfer')
}
_handleResponse(event) {
switch (this.action) {
case 'List':
this.data = event.detail.response;
break;
}
}
ready() {
super.ready();
let name = sessionStorage.getItem('userName');
if (name === null) {
this.set('route.path', './login-page')
}
}

}

window.customElements.define('dashboard-page', Dashboard);