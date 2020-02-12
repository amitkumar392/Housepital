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



<paper-button raised on-click="_handleModel">Check Slot</paper-button>


<paper-dialog id="actions" class="colored">
  <h2>Dialog Title</h2>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <div class="buttons">
    <paper-button>More Info...</paper-button>
    <paper-button dialog-dismiss>Decline</paper-button>
    <paper-button dialog-confirm autofocus>Accept</paper-button>
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

    static get properties() {
        return {
            locations:{
              type:Array,
              value:[]
            }
        };
    }
    connectedCallback(){
        super.connectedCallback();
        this._makeAjax(`${baseUrl1}/housepital/locations`, 'get', null);
    }
    _handleModel(){
        this.$.actions.open();
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