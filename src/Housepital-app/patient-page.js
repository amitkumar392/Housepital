import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/app-route/app-location.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/polymer/lib/elements/dom-repeat';
import '@polymer/paper-dialog/paper-dialog.js';
/**
* @customElement
* @polymer
*/
class PatientPage extends PolymerElement {
  static get template() {
    return html`
<style>
  :host {
    display: block;
    min-height:100vh;
  }
  .colored {
    border: 2px solid;
    border-color: #4caf50;
    background-color: #f1f8e9;
    color: #4caf50;
  }
  paper-input{
    width:400px;
    position:relative;
    left:250px;
    top:-60px;
  }
  paper-button{
    float:right;
  }
paper-card{
  height:500px;
  width:500px;
  margin:30px;
}
span{
  float:right;
}

#slot{
  height:100px;
  width:500px;
  
}
paper-dropdown-menu{
  margin:bottom
}
#form2{
  height:500px;
  width:500px;
}
  header{
    background-color:white;
  }
</style>
<app-location route={{route}}></app-location>
<iron-form id="form">
<header>
<paper-dropdown-menu label="search bases on location" id="location" on-value-changed="_handleChange" >
<paper-listbox slot="dropdown-content" class="dropdown-content" selected="0">
<template is="dom-repeat" items={{locations}}>
<paper-item>{{item.locationName}}</paper-item>
</template>
</paper-listbox>
</paper-dropdown-menu>
<paper-input id="nameValue" label="search bases on name, location and speciality" on-blur="_handleChange1"></paper-input>
<template is="dom-repeat" items={{doctors}}>
<paper-card heading="" 
  image={{item.imageUrl}}
  alt="Go Nature">
  <h2>{{item.doctorName}}<span>Ratings:{{item.rating}} <iron-icon icon="star"></iron-icon></span></h2>
  Fees: Rs{{item.consultationFee}}<br>
  Specialization: {{item.specialization}}
  <div class="card-actions">
  <paper-button raised on-click="_handleModel">Check Slot</paper-button>
  </div>
</paper-card id="form2">
</template>
<paper-dialog id="actions" class="colored">
  <h2>Available Slots</h2>
  <div>   
  <template is="dom-repeat" items={{slots}}>
<paper-card heading="" alt="Emmental" id="slot">
<div class="card-content">
{{item.date}}
{{item.slotTime}}
{{item.hospitalId}}
{{item.hospitalName}}
{{item.doctorSlotId}}
 </div>
<div class="card-actions">
  <paper-button raised on-click="_handleSlot">Book This Slot</paper-button>
</div>
</paper-card>
</template>
  </div>
  <div class="buttons">
  </div>
</paper-dialog>
</header>
</iron-form>
<iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" 
content-type="application/json" on-error="_handleError"></iron-ajax>
`;
  }
  static get properties() {
    return {
      locations: {
        type: Array,
        value: []
      }, action: {
        type: String,
        value: 'List'

      }, doctors: {
        type: Array,
        value: []
      }, name1: {
        type: String,
        value: ''
      }, slots: {
        type: Array,
        value: []
      },
      slot:Number
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this._makeAjax(`${baseUrl1}/housepital/locations`, 'get', null);
  }
  // handling error if encounter error from backend server
  _handleError() {

  }
  _handleChange1() {
    this.name1 = this.$.nameValue.value;
    console.log(this.$.location.value)
        this._makeAjax(`${baseUrl1}/housepital/locations/1/doctors?name=${this.name1}`, 'get', null);
        this.action = 'Data'
   
    
  }

  _handleChange() {

    
        this._makeAjax(`${baseUrl1}/housepital/locations/1/doctors?name=${this.name1}`, 'get', null);
        this.action = 'Data'
    
   
  }
  _handleBook() {

  }
  _handleSlot(event) {
    this.slot = event.model.item.doctorSlotId;
    sessionStorage.setItem('slot',this.slot)
    this.set('route.path','./form-page')
  }
  connectedCallback() {
    super.connectedCallback();
    this._makeAjax(`${baseUrl1}/housepital/locations`, 'get', null);
  }
  _handleModel(event) {
    let id = event.model.item.doctorId;
    this._makeAjax(`${baseUrl1}/housepital/doctors/${id}/availabilities`, 'get', null);
    this.action = 'Slots'
  }
  // getting response from server and storing user name and id in session storage
  _handleResponse(event) {
    switch (this.action) {
      case 'Data':
        this.doctors = event.detail.response;
        console.log(this.doctors)
      case 'List':
        this.locations = event.detail.response;
        break;
      case 'Slots':
        this.slots = event.detail.response;
        this.$.actions.open();
        break;
    }
  }
  // calling main ajax call method 
  _makeAjax(url, method, postObj) {
    let ajax = this.$.ajax;
    ajax.method = method;
    ajax.url = url;
    ajax.body = postObj ? JSON.stringify(postObj) : undefined;
    ajax.generateRequest();
  }



}

window.customElements.define('patient-page', PatientPage);