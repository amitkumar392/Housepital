import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';



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
  #form{
    border: 1px solid red;
    border-radius:20px;
    background-color:white;
    width:40%;
    margin: 70px auto;  
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
<paper-input label="search bases on name, location and speciality"></paper-input>
<paper-dropdown-menu label="search bases on location">
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
     // handling error if encounter error from backend server
     _handleError() {
        
    }
    // getting response from server and storing user name and id in session storage
    _handleResponse(event) {
        this.locations = event.detail.response
      console.log(this.users)
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