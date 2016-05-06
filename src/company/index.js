import './css/main.css';

import './img/company_about.png';
import './img/company_slider.png';
import './img/company_case.png';
import './img/company_news.png';
import './img/company_contact.png';
import './img/company_kjdb.png';
import './img/company_zbzc.png';
import './img/company_cyzx.png';
import './img/company_zlcy.png';

// 解决click事件的移动端延迟
import fastclick from 'fastclick';
fastclick.attach(document.body);

// page最小高度为窗口高度
document.querySelector('.page').style.minHeight = `${window.innerHeight}px`;

const pathname = window.location.pathname;
import index from './js/index.js';
import contact from './js/contact.js';

if (pathname.indexOf('index') !== -1) {
  index();
} else if (pathname.indexOf('contact') !== -1) {
  contact();
}
