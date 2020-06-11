/* eslint-env browser */
import * as d3 from '../../libraries/d3.min.js';
import { data } from './data-example.js';
import ComponentDisplay from './componentDisplay';
import { getValue } from './search';
import { createTree } from './createTree';
import { addInterationsListeners } from './interactions'

// Store 66% of the users screen width for creating the tree
const panelWidth = Math.floor(screen.width * 0.66);

// ########################################## CREATE PORT CONNECTION WITH BACKGROUND.JS
const createPort = () => {
  const port = chrome.runtime.connect({ name: 'test' });
  port.postMessage({
    name: 'connect',
    tabID: chrome.devtools.inspectedWindow.tabId,
  });

  port.onMessage.addListener((message) => {
    // if (!message.data) return;

    console.log('message received by panel ', message);
    createTree(message);
    addInterationsListeners()
  });
};
createPort();




// ################################# POPULATING THE PANEL
// name - String
// state - object
// stateCategory
// props - array?
// hooks if functional

const theInfoPanel = document.getElementById('info-panel');
const CompDisplay = new ComponentDisplay(theInfoPanel);

function populatePanel(dataObj) {
  CompDisplay.update(dataObj);
}


let idFind = document.getElementById("searchInput")
idFind.addEventListener('keyup', () => {
  console.log('hi there');
  let value = document.getElementById("searchInput").value;
  getValue(value)
})

