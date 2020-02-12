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

 #data{
   margin:10px 0px 0px 0px;
 }
h1{
  color:black;
}
  a {
    text-decoration: none;
    color: white;
  }
</style>
 <h1>Welcome, {{name11}}</h1>
<paper-button><a href="[[rootPath]]add-slot">Add Slot</a></paper-button>
<paper-button on-click="_handleLogout"><a href="[[rootPath]]login">Logout</a></paper-button>

<h1>Your Appointments</h1>
<div id="data">
  <template is="dom-repeat" items={{data}}>
    <paper-card heading="" alt="Emmental" id="slot">
      <div class="card-content">
        <span>Hospital Name : {{item.hospitalName}}</span>
        <span>Date : {{item.date}}<span>
        <span>Time : {{item.slotTime}}<span>
        <span>Name : {{item.patientName}}<span>
        <span>Email : {{item.email}}<span>
        <span>Mobile : {{item.mobile}}<span>
      </div>
    </paper-card><br>
  </template>
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
_handleLogout(){
  sessionStorage.clear();
}
connectedCallback() {
super.connectedCallback();
let doctorId = sessionStorage.getItem('doctorId')
this._makeAjax(`http://10.117.189.177:9090/housepital/doctors/${doctorId}/appointments`, 'get', null)
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