import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/app-route/app-location.js';
import '@polymer/paper-card/paper-card.js';

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
#profile{
  width:100%;
}
</style>

<div id="buttons">
<paper-button><a href="[[rootPath]]add-slot">Add Slot</a></paper-button>
<paper-button><a href="[[rootPath]]login">Logout</a></paper-button>
</div>

<div>



<paper-card heading=""  alt="" id="profile">
  <div class="card-content">
  <img src="profileDoctor.imageUrl" alt="Doctor face" height="42" width="42">
    <p>Doctor ID:{{profileDoctor.doctorId}}</p>
    <p>Doctor Name:{{profileDoctor.doctorName}}</p>
    <p>Experience: {{profileDoctor.experience}}</p>
    <p>Rating: {{profileDoctor.rating}}</p>
    <p> Mobile Number: {{profileDoctor.phoneNumber}}</p>
 
  </div>
  
</paper-card>


</div>


<h2>Booked Slot </h2>
<template is="dom-repeat" items={{getSlot}}>
<paper-card heading=""  alt="">
  <div class="card-content">
    <p>Hospital Name:{{item.hospitalName}}</p>
    <p>Appointment Date :{{item.date}}</p>
    <p>Patient ID: {{item.patientId}}</p>
    <p>Patient Name: {{item.patientName}}</p>
    <p> Email: {{item.email}}</p>
    <p>Mobile Number: {{item.mobile}}</p>
    <p> Slot Time: {{item.slotTime}}</p> 
  </div>
  <div class="card-actions">
    <paper-button>Share</paper-button>
    <paper-button>Explore!</paper-button>
  </div>
</paper-card>
</template>








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
      },
       action: {
        type: String,
        value: 'List'
      },
      data: Array,

      getSlot: {
        type: Array,
        value: []
      },

      profileDoctor:{
        type:Array
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    // let userId = sessionStorage.getItem('userId');
    // this.userName = sessionStorage.getItem('userName');
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
  // _handleTransfer(){

  // }
  _handleResponse(event) {
   
    console.log(this.getSlot)
  } 
  _handleResponse(event) {
    switch (this.action) {
        case 'Data':
            this.profileDoctor = event.detail.response;
            console.log(this.doctors)
        case 'List':
          this.getSlot = event.detail.response;
          this._makeAjax(`${this.baseURI}/housepital/doctors/{doctorId}`, 'get', null)
          this.action='Data'
            break;
    }
}

    // ready(){
    //   super.ready();
    //   let name =sessionStorage.getItem('userName');
    //   if(name === null) {
    //     this.set('route.path', './login-page')
    //   }
    // }

}

window.customElements.define('dashboard-page', Dashboard);