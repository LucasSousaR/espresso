/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import "jquery"
import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
//import "channels"
import Chartkick from "chartkick"
import Chart from "chart.js"
import 'datatables.net';
import 'datatables.net-bs4';
import 'popper.js'
import "bootstrap/dist/js/bootstrap.bundle"
import "jquery.easing/jquery.easing"
import '@fortawesome/fontawesome-free/js/all'
//import datatable from 'imports-loader?define=>false!datatables.net'
//import datatableBS4 from 'imports-loader?define=>false!datatables.net-bs4'
import './shared/sb-admin-2'

Rails.start()
Turbolinks.start()
ActiveStorage.start()
Chartkick.use(Chart)

//datatable(window, $)
//datatableBS4(window, $)

// Examples
import './shared/demo/datatables-demo'
import './shared/demo/chart-area-demo'
import './shared/demo/chart-bar-demo'
import './shared/demo/chart-pie-demo'


// Support component names relative to this directory:
var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);

