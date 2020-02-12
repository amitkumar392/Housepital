import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/app-route/app-location.js';
import '@polymer/paper-toast/paper-toast.js';

/**
* @customElement
* @polymer
*/
class FormPage extends PolymerElement {
    static get template() {
        return html`
<style>
  :host {
    display: block;
    font-family: Comic Sans, Comic Sans MS, cursive;
  }

  
  #form{
    border: 1px solid red;
    border-radius:20px;
    background-color:white;
    width:40%;
  padding:20px;
    margin: 70px auto;  
  }
  h2{
    text-align: center;
    
  }
  paper-button {
    text-align: center;
    margin-top: 40px;
    background-color:black;
    color:white;
    margin-bottom: 40px;
    margin-left: 180px;
  }  
</style>
<app-location route={{route}}></app-location>
<iron-form id="form">
<form>
<h2>Your Details</h2>
<paper-input label="Name" id="name" type="text" ></paper-input>
<paper-input label="Email" id="email" type="email" ></paper-input>
<paper-input label="Phone" id="phone" type="phone"></paper-input>
<paper-button raised id="book" on-click="_handleBook">Book</paper-button>
</form>
</iron-form>
<iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" 
content-type="application/json" on-error="_handleError"></iron-ajax>
<paper-toast text="Booked" id="slot"></paper-toast>

`;
    }
    static get properties() {
        return {
            users: Object,
            details: {
                type: Object
            },
            baseUrl:String
        };
    }
   
    // handling error if encounter error from backend server
    _handleError() {
        
    }
    _handleBook(){
        let obj={
            doctorSlotId:parseInt(sessionStorage.getItem('slot')),
            patientName:this.$.name.value,
            emailId:this.$.email.value,
            mobile:parseInt(this.$.phone.value),
        }
        console.log(obj)
        this._makeAjax(`${baseUrl1}/housepital/patients`, 'post',obj);
    }
    // getting response from server and storing user name and id in session storage
    _handleResponse(event) {
        this.users = event.detail.response;
        this.$.slot.open();
      this.setProperties('route.path','./patient-page')
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

window.customElements.define('form-page', FormPage);