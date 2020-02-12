import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';




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
</style>
<header>

<paper-input label="search bases on name, location and speciality"></paper-input>
<paper-button>Search</paper-button>
<paper-dropdown-menu label="search bases on location">
<paper-listbox slot="dropdown-content" class="dropdown-content">
<template is="dom-repeat" items={{}}>
<paper-item></paper-item>
</template>
</paper-listbox>
</paper-dropdown-menu>
</header>
<iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" 
content-type="application/json" on-error="_handleError"></iron-ajax>
`;
    }
    static get properties() {
        return {
            users:{
              type:Array,
              value:[]
            }
        };
    }
    connectedCallback(){
        super.connectedCallback();
        this._makeAjax(`${baseUrl}/housepital/locations`, 'get', null);
    }
     // handling error if encounter error from backend server
     _handleError() {
        
    }
    // getting response from server and storing user name and id in session storage
    _handleResponse(event) {
        this.users = event.detail.response
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