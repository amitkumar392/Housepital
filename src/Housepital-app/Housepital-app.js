/**
* this is the main routing page of this application.
*/

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/maps-icons.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);


/**
* main class that provides the core API for Polymer and main
* features including template,routing and property change observation.
*/

class HousepitalApp extends PolymerElement {
  static get template() {
    return html`
<style>
  :host {
    --app-primary-color: #ff7a22;
    --app-secondary-color: black;
    font-family: Comic Sans, Comic Sans MS, cursive;
    display: block;
  }

  app-drawer-layout:not([narrow]) [drawer-toggle] {
    display: none;
  }

  app-header {
    color: #fff;
    background-color: var(--app-primary-color);
  }

  app-header paper-icon-button {
    --paper-icon-button-ink-color: white;
  }

  h3 {
    font-family: Comic Sans, Comic Sans MS, cursive;
  }

  .drawer-list {
    margin: 0 20px;

  }

  .drawer-list a {
    display: block;
    padding: 0 16px;
    text-decoration: none;
    color: var(--app-secondary-color);
    line-height: 40px;
  }

  .drawer-list a.iron-selected {
    color: black;
    font-weight: bold;
  }
</style>

<app-location route="{{route}}">
</app-location>

<app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
</app-route>

<app-drawer-layout fullbleed="" narrow="{{narrow}}">
  <!-- Drawer content -->
  
  <!-- Main content -->
  <app-header-layout has-scrolling-region="">
    <app-header slot="header" condenses="" reveals="" effects="waterfall">
      <app-toolbar>
        <div main-title="">
          <h3><iron-icon icon="maps:local-hospital"></iron-icon>Housepital
          </h3>
        </div>
      </app-toolbar>
    </app-header>
    <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
      <login-page name="login"></login-page>
      <dashboard-page name="dashboard-page"></dashboard-page>
      </iron-pages>
  </app-header-layout>
</app-drawer-layout>
`;
  }
  //properties declaration and observer declaration
  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object,

    };
  }

  // observing the page change
  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  /**
  * Show the corresponding page according to the route.
  * If no page was found in the route data, page will be an empty string.
  * Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
  */
  _routePageChanged(page) {
    this.page = page || 'login';
  }

  /**
  * Import the page component on demand.
  * Note: `polymer build` doesn't like string concatenation in the import
  * statement, so break it up.
  */
  _pageChanged(page) {

    switch (page) {
      case 'login':
        import('./login-page.js');
        break;
        case 'dashboard-page':
          import('./dashboard-page.js');
          break;
     
    }
  }

}

window.customElements.define('housepital-app', HousepitalApp);