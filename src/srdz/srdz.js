import './css/main.css';

// 解决click事件的移动端延迟
import fastclick from 'fastclick';
fastclick.attach(document.body);

import fwdetail from './js/fwdetail.js';
import search from './js/search.js';
// import { listfil, listfil2, listService, listSet } from './js/list-service.js';

if (window.location.pathname.indexOf('fwdetail') !== -1) {
  fwdetail();
} else if (window.location.pathname.indexOf('search') !== -1) {
  search();
} else if (window.location.pathname.indexOf('list-service') !== -1) {
  // listfil();
  // listfil2();
  // listService();
  // listSet();
}
