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
import '@polymer/paper-toast/paper-toast.js';
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
    min-height: 100vh;
  }

  .colored {
    border: 2px solid;
    border-color: #000000;
    background-color: #f1f8e9;
    color: #000000;
  }

  #nameValue {
    width: 400px;
    position: relative;
    left: 250px;
    top: -60px;
  }

  paper-button {
    float: right;
    background-color: black;
    color: white;

  }

  paper-card {
    height: 500px;
    width: 500px;

    --paper-card-header-image: {
      height: 300px;
      object-fit: cover;
    }

    ;
  }

  span {
    float: right;
  }

  #doctors {
    margin: 10px;
  }

  #slot {
    height: 50px;
    width: 550px;
    margin: 5px;
  }

  paper-dropdown-menu {
    margin: bottom
  }

  #slotButton {
    float: right;
    margin-top: 7px;
    z-index: 1;
  }

  #form2 {
    height: 500px;
    width: 500px;
  }

  #searchButton {
    background-color: black;
    color: white;
    position: absolute;
    right: 580px;
    top: 14px;

  }
  #infoPatient{
    width:40%;
  }

  header {
    background-color: white;
    position: relative;

  }
  #actions{
    height:800px;
    width:1200px;
  }
#clear{
  float:right;
}
  #infoPatient {
    display: none;
  }
</style>
<app-location route={{route}}></app-location>
<iron-form id="form">
  <header>
    <paper-dropdown-menu label="search bases on location" id="location">
      <paper-listbox slot="dropdown-content" class="dropdown-content" selected="0">
        <template is="dom-repeat" items={{locations}}>
          <paper-item>{{item.locationName}}</paper-item>
        </template>
      </paper-listbox>
    </paper-dropdown-menu>
    <paper-input id="nameValue" label="search on the basis of name, location and speciality"></paper-input>
    <paper-button raised id="searchButton" on-click="_handleChange1"> Search<iron-icon icon="search"
        on-click="_handleChange1"></iron-icon>
    </paper-button>
</iron-form>
<template is="dom-repeat" items={{doctors}}>
  <paper-card heading="" id="doctors" image={{item.imageUrl}} alt="Go Nature">
    <h2>Dr. {{item.doctorName}}<span>Ratings:{{item.rating}} <iron-icon icon="star"></iron-icon></span></h2>
    <h4>Fees: Rs{{item.consultationFee}}</h4>
    <h4> Specialization: {{item.specialization}}</h4>
    <div class="card-actions">
      <paper-button raised on-click="_handleModel">Check Slot</paper-button>
    </div>
  </paper-card id="form2">
</template>
</header>
<paper-dialog id="actions" class="colored">
<iron-icon id="clear" on-click="_handleClose" icon="clear"></iron-icon>
  <div id="availableSlots">
    <h2>Available Slots</h2>
    <template is="dom-repeat" items={{slots}}>
      <paper-card heading="" alt="Emmental" id="slot">
        <paper-button raised on-click="_handleSlot" id="slotButton">Book This Slot</paper-button>
        <div class="card-content">
          Date : {{item.date}}
          Time : {{item.slotTime}}
          Hospital : {{item.hospitalName}}
        </div>
      </paper-card>
    </template>
  </div>
<iron-form id="infoPatient">
  <form>
  <h2>Enter Your Details</h2>
    <paper-input label="Enter Your Name" id="name" type="text"></paper-input>
    <paper-input label="Enter Your Email" id="email" type="email"></paper-input>
    <paper-input label="Enter Your Phone" id="phone" type="phone"></paper-input>
    <paper-button raised id="book" on-click="_handleBook">Book</paper-button>
  </form>
</iron-form>
</paper-dialog>
<paper-toast text="Slot Booked Succesfully" id="slot"></paper-toast>
<iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" content-type="application/json"
  on-error="_handleError"></iron-ajax>
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
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this._makeAjax(`${baseUrl1}/housepital/locations`, 'get', null);

  }

  _handleBook() {
    let obj = {
      doctorSlotId: parseInt(sessionStorage.getItem('slot')),
      patientName: this.$.name.value,
      emailId: this.$.email.value,
      mobile: parseInt(this.$.phone.value),
    }
    this._makeAjax(`${baseUrl1}/housepital/patients`, 'post', obj);
    this.action = 'slotBooked'
  }
  // handling error if encounter error from backend server
  _handleError() {


  }
  _handleChange1() {
    this.name1 = this.$.nameValue.value;
    this._makeAjax(`${baseUrl1}/housepital/locations/1/doctors?name=${this.name1}`, 'get', null);
    this.action = 'Data'
  }
  _handleClose() {
    this.$.actions.close();
  }
  _handleSlot(event) {
    sessionStorage.setItem('slot', event.model.item.doctorSlotId);
    this.$.availableSlots.style.display = 'none';
    this.$.infoPatient.style.position = 'absolute';
    this.$.infoPatient.style.left = '30%';
    this.$.infoPatient.style.top = '20%';
    this.$.infoPatient.style.display = 'inline-block';
    this.$.actions.style.width = '70%';
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
        this._makeAjax(`${baseUrl1}/housepital/locations`, 'get', null);
        this.action = 'List';
      case 'List':
        this.locations = event.detail.response;
        this._makeAjax(`${baseUrl1}/housepital/locations/1/doctors?name=${this.name1}`, 'get', null);
        this.action = 'Data1'
        break;
      case 'Slots':
        this.slots = event.detail.response;
        this.$.actions.open();
        break;
      case 'Data1':
        this.doctors = event.detail.response;
        break;
      case 'slotBooked':
        this.$.actions.close();
        this.$.slot.open();
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