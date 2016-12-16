/**
 * Created by 80474 on 2016/12/15.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Swiper from './swiper.js';
ReactDOM.render(
    <Swiper parentBox="box" moveBox="ul">
        <li><img src="lunbo/1.jpg" /></li>
        <li><img src="lunbo/2.jpg" /></li>
        <li><img src="lunbo/3.jpg" /></li>
        <li><img src="lunbo/4.jpg" /></li>
        <li><img src="lunbo/5.jpg" /></li>
    </Swiper>,
  document.getElementById("app")
)