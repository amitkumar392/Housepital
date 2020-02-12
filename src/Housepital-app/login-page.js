import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/app-route/app-location.js';
/**
* @customElement
* @polymer
*/
class UserLogin extends PolymerElement {
    static get template() {
        return html`
<style>
  :host {
    display: block;
    font-family: Comic Sans, Comic Sans MS, cursive;
  }

  #form {
    margin:70px 0px 0px 400px;
    border: 1px solid black;
    background-color:white;
    width: 500px;
    border-radius:20px;
  
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
    <h2> Login Page </h2>
    <paper-input label="Phone Number" allowed-pattern=[0-9] type="text" value={{phone}} name="phone"  maxlength="10" required error-message="enter phone number" ></paper-input>
    <paper-input label="Password" type="password" value={{password}} name="password" required error-message="enter user name" ></paper-input>
    <paper-button raised id="login" on-click="signIn">Login</paper-button>
  </form>
</iron-form>
<paper-toast text="Please Enter All Details"  class="fit-bottom" id="blankForm"></paper-toast>
<paper-toast text="Wrong Credentials"  class="fit-bottom" id="wrongCredentials"></paper-toast>
<iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" 
content-type="application/json" on-error="_handleError"></iron-ajax>
`;
    }
    static get properties() {
        return {
            users: Array,
            details: {
                type: Object
            }
        };
    }
    // fetching the  user data from josn file 
    signIn() {

        if (this.$.form.validate()) {
            let phone = this.phone;
            let password = this.password;
            this.details = { mobile: phone, password: password }
            this._makeAjax(`http://10.117.189.177:9090/forexpay/users`, 'post', this.details);
        } else {
           
        }
    }

    // handling error if encounter error from backend server
    _handleError() {
        
    }

    // getting response from server and storing user name and id in session storage
    _handleResponse(event) {
        this.users = event.detail.response
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

window.customElements.define('login-page', UserLogin);