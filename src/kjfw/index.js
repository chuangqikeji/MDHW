import './css/main.css';

import './img/kjfw_pg1.png';
import './img/kjfw_pg2.png';

// 解决click事件的移动端延迟
import fastclick from 'fastclick';
fastclick.attach(document.body);

// 显示菜单
import showMenu from 'showMenu';
showMenu();

// page最小高度为窗口高度
document.querySelector('.page').style.minHeight = `${window.innerHeight}px`;

// 各页面JS
const pathname = window.location.pathname;
const pathArr = pathname.split('/');
import assess from './js/assess.js';
import index from './js/index.js';
import company from './js/company.js';

if (pathname.indexOf('assess') !== -1) {
  assess();
} else if (pathname.indexOf('index') !== -1 || pathArr.length < 4 || (pathArr.length === 4 && pathArr[3] === '')) {
  index();
} else if (pathname.indexOf('company') !== -1) {
  company();
}
