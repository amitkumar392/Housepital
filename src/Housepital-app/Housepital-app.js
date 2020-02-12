import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-route/app-route.js';   
import '@polymer/app-route/app-location.js';  
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-tabs/paper-tabs.js';   
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-tabs/paper-tabs-icons.js';
import '@polymer/paper-button/paper-button.js';
import './login-page.js';
import './dashboard-page.js';

/**
 * @customElement
 * @polymer
 */
setRootPath(MyAppGlobals.rootPath)
class HousepitalApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>


      <app-location route={{route}}></app-location>
      <app-route data="{{routeData}}" route="{{route}}" pattern="[[rootPath]]:page"></app-route>
             
        <iron-pages selected={{page}} attr-for-selected="name" role="main">
          <dashboard-page name="dashboard-page"></dashboard-page>
          <login-page name="login-page"></login-page>
    
        </iron-pages>
    `;
  }
  static get properties() {
    return {
    
      page: {
        type: String,
        observer: '_changePage'
      },
      routeData: {
        type: Object
      }
    };
  }
  // complex observer
  static get observers() {
    return ['_pageChanged(routeData.page)']
  }

  // method of complex observer
  _pageChanged(page) {
    this.page = page || 'login-page';
  }

  // method of simple observer
  _changePage(page) {

    switch (page) {
      case ('dashboard-page'):
        {
          import('./dashboard-page.js');
          break;
        }

      case ('login-page'):
        {
          import('./login-page.js');
          break;
        }
    

    }

  }

}

window.customElements.define('housepital-app', HousepitalApp);
