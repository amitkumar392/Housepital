import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';

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
</style>
<header>
<h1> [[prop1]]</h1>
</header>


<paper-input label="search bases on name, location and speciality"></paper-input>
<paper-button>Search</paper-button>

<paper-dropdown-menu label="search bases on location">
<paper-listbox slot="dropdown-content" class="dropdown-content">

<template is="dom-repeat" items={{}}>
<paper-item></paper-item>

</template>

</paper-listbox>
</paper-dropdown-menu>


<template is="dom-repeat" items={{}}>
<paper-card heading=""
  image="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  alt="Go Nature">
  <h2>{{item.vendorName}}<span>Ratings: {{item.rating}} <iron-icon icon="star"></iron-icon></span></h2>
  
  <div class="card-actions">
    <paper-button raised on-click="_handleBuy">go to hell</paper-button>
  </div>
</paper-card>
</template>

<paper-input label="search bases on name, location and speciality"></paper-input>
<paper-button>Search</paper-button>
<paper-dropdown-menu label="search bases on location">
<paper-listbox slot="dropdown-content" class="dropdown-content" selected="0">
<template is="dom-repeat" items={{locations}}>
<paper-item>{{item.locationName}}</paper-item>
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