import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';

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
`;
    }
    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'The Patient Page'
            }
        };
    }


    connectedCallback(){
        super.connectedCallback();
        this._makeAjax(`http://10.117.189.37:9090//housepital/doctors`, 'post', this.details);
    }

     // handling error if encounter error from backend server
     _handleError() {
        
    }

    // getting response from server and storing user name and id in session storage
    _handleResponse(event) {
        this.users = event.detail.response
       sessionStorage.setItem('doctorName',this.users.doctorName);
       sessionStorage.setItem('doctorId',this.users.doctorId);
       this.set('route.path','./dashboard-page')
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