import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';



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
   background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);    

  }

 
</style>
<header>
<h1> [[prop1]]</h1>
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

   

}

window.customElements.define('patient-page', PatientPage);