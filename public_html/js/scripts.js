"use strict";const anchors=document.querySelectorAll(".js__go");if(anchors.length)for(let e of anchors)e.addEventListener("click",(function(t){t.preventDefault();const n=e.getAttribute("href").substr(1);document.getElementById(n).scrollIntoView({behavior:"smooth",block:"start"})}));let myData="1986-10-04";function declOfNum(e,t){return e+" "+t[e%100>4&&e%100<20?2:[2,0,1,1,1,2][e%10<5?e%10:5]]}function birthDateToAge(e){let t=new Date;e=new Date(e);let n=t.getFullYear()-e.getFullYear();return t.setFullYear(1970)<e.setFullYear(1970)?n-1:n}let myAge=declOfNum(birthDateToAge(myData),["год","года","лет"]);const js__myAge=document.querySelector(".js__my-age");js__myAge&&(js__myAge.innerHTML=myAge),window.onload=function(){if(document.querySelector(".menu-toggle").onclick=function(){document.querySelector("body").classList.toggle("menu-opened")},document.querySelector(".menu-float__box").addEventListener("click",(function(){document.querySelector("body").classList.toggle("menu-opened")})),anchors.length&&window.screen.width<576){let e=document.querySelectorAll(".js__go-menu");[].forEach.call(e,(function(e){e.addEventListener("click",(function(){document.querySelector("body").classList.remove("menu-opened")}))}))}window.addEventListener("scroll",(function(){pageYOffset>=700?document.querySelector("body").classList.add("menu-fly"):document.querySelector("body").classList.remove("menu-fly")})),document.querySelector(".js__get-year").innerHTML=String((new Date).getFullYear())};