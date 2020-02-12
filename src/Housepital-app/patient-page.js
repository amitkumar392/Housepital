import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';

import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';

import '@polymer/paper-card/paper-card.js';
import '@polymer/polymer/lib/elements/dom-repeat';




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
  paper-input{
    width:400px;
  }
  paper-button{
    float:right;
  }
</style>
<iron-form id="form">
<header>
</header>

<template is="dom-repeat" items={{doctors}}>
<paper-card heading=""
  image={{item.imageUrl}}
  alt="Go Nature">
  <h2>{{item.doctorName}}<span>Ratings:{{item.rating}} <iron-icon icon="star"></iron-icon></span></h2>
  {{item.consultationFees}}
  {{item.specialization}}
  <div class="card-actions">
    <paper-button raised on-click="_handleSlots">See Slots</paper-button>
  </div>
</paper-card>
</template>
<paper-input label="search bases on name, location and speciality"></paper-input>
<paper-dropdown-menu label="search bases on location" id="location" on-blur="_handleChange">
<paper-listbox slot="dropdown-content" class="dropdown-content" selected="0">
<template is="dom-repeat" items={{locations}}>
<paper-item>{{item.locationName}}</paper-item>
</template>
</paper-listbox>
</paper-dropdown-menu>
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
        value: null
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this._makeAjax(`${baseUrl1}/housepital/locations`, 'get', null);
  }
  // handling error if encounter error from backend server
  _handleError() {

  }
  _handleSlots(){
    
  }
  _handleChange() {
  
    for (let i = 0; i < this.locations.length; i++) {
      if (this.locations[i].locationName == this.$.location.value) {
        this._makeAjax(`${baseUrl1}/housepital/locations/${this.locations[i].locationId}/doctors?name=${this.name1}`, 'get', null);
      this.action='Data'
      }
    }
    // console.log("jhgf")
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