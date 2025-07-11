(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();class a{_events;constructor(){this._events=new Map}on(e,t){this._events.has(e)||this._events.set(e,new Set),this._events.get(e)?.add(t)}off(e,t){this._events.has(e)&&(this._events.get(e).delete(t),this._events.get(e)?.size===0&&this._events.delete(e))}offAll(){this._events=new Map}emit(e,t){this._events.forEach((s,i)=>{i==="*"&&s.forEach(r=>r({eventName:e,data:t})),(i instanceof RegExp&&i.test(e)||i===e)&&s.forEach(r=>r(t))})}}class c{constructor({initialValue:e,initialAnimate:t,initialHide:s},i){this.events=i,this._value=e||0,this._animate=t||!1,this._hide=s||!1}_value;_animate;_hide;set value(e){this._value=e,this.events.emit("value:changed")}set animate(e){this._animate=e,this.events.emit("animate:changed")}set hide(e){this._hide=e,this.events.emit("hide:changed")}get value(){return this._value}get animate(){return this._animate}get hide(){return this._hide}}let l=class{constructor(e,t,s){this.view=e,this.model=t,this.events=s,this.view.initialize(t.value,t.animate,t.hide),this.events.on("value:changed",()=>{this.view.changeProgress(this.model.value)}),this.events.on("animate:changed",()=>{this.view.toggleAnimate(this.model.animate)}),this.events.on("hide:changed",()=>{this.view.toggleHide(this.model.hide)})}},d=class{constructor(e){this.container=e,this._progressLoader=e.querySelector("#progress-loader")}_progressLoader;initialize(e,t,s){this.changeProgress(e),this.toggleAnimate(t),this.toggleHide(s)}changeProgress(e){if(this._progressLoader){const t=this._progressLoader.r.baseVal.value,s=2*Math.PI*t,i=e/100*s;this._progressLoader.style.strokeDasharray=`${i}, ${s}`}}toggleAnimate(e){this._progressLoader&&this._progressLoader.classList.toggle("animate",e)}toggleHide(e){this.container.classList.toggle("hide",e)}};const h=".progress-loader-container{width:120px;opacity:1;transition:opacity .3s ease;line-height:0}.progress-loader-svg{max-width:120px;max-height:120px;transform:rotate(-90deg)}.progress-loader-background{fill:none;stroke:var(--progress-additional-color, #dee6ef);stroke-width:10px}.progress-loader{fill:none;stroke-width:10px;stroke:var(--progress-accent-color, #005cfe);animation:loading infinite linear 1.5s;animation-play-state:paused;transform-origin:center}.hide{opacity:0;transition:opacity .3s ease}@keyframes loading{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.animate{animation:loading infinite linear 1.5s}";class g extends HTMLElement{model;constructor(){super();const e=this.getAttribute("additional-color");this.style.setProperty("--additional-color",e);const t=this.getAttribute("accent-color");this.style.setProperty("--accent-color",t),this.innerHTML=`
      <style>${h}</style>
      <div id="progress" class="progress-loader-container">
        <svg class="progress-loader-svg">
          <circle class="progress-loader-background" cx="60" cy="60" r="55" />
          <circle id="progress-loader" class="progress-loader" cx="60" cy="60" r="55" />
        </svg>
      </div>
    `;const s=new a;this.model=new c({initialValue:70,initialAnimate:!1,initialHide:!1},s);const i=this.querySelector("#progress");if(i){const r=new d(i);new l(r,this.model,s)}}}class p{constructor(e,t,s){this.view=e,this.model=t,this.events=s,this.view.setValidateInput(String(t.value)),this.events.on("settings:changed",this.onSettingsChanged.bind(this))}onSettingsChanged(e){const t=e.target;switch(t?.title){case"Value":this.view.setValidateInput(t.value),this.model.value=this.view.inputValue;break;case"Animate":this.model.animate=t.checked;break;case"Hide":this.model.hide=t.checked;break}}}class u{constructor(e,t){this.container=e,this.events=t,e.addEventListener("input",s=>{t.emit("settings:changed",s)}),this._input=e.querySelector("input"),this._input&&this._input.addEventListener("keypress",s=>{s.key==="Enter"&&s.preventDefault()})}_input;setValidateInput(e){e=e.replace(/^[-][^0-9]/g,""),this._input&&(e||(this._input.value="0"),e=String(Math.max(0,Math.min(100,Number(e)))),this._input.value=e)}get inputValue(){return this._input?Number(this._input.value):0}}const m=".title{position:absolute;left:1.25rem;top:1.65rem;font-size:.9rem;margin:0}.progress-widget{position:relative;display:grid;grid-template-columns:1fr;grid-template-rows:1fr 1fr;justify-items:center;width:320px;height:568px;background-color:var(--progress-background-color, #fefefe);padding:1.25rem;box-sizing:border-box;gap:4.2rem;font-size:.9rem}.widget-loader{align-self:end;padding-bottom:1.5rem}.settings{display:flex;flex-direction:column;gap:.75rem;padding-right:.5rem}@media (orientation: landscape){.progress-widget{width:568px;height:320px;grid-template-columns:1fr 1fr;grid-template-rows:1fr;align-items:center;justify-items:start;gap:3.5rem}.widget-loader{justify-self:end;align-self:center;padding-right:1.85rem;padding-bottom:0}}",f='.checkbox-ui{display:flex;width:fit-content;gap:1.3rem;cursor:pointer;color:inherit;align-items:center}.checkbox-ui:hover{opacity:.8}.checkbox-input{appearance:none;position:relative;box-sizing:border-box;width:2.8rem;height:1.8rem;margin:0;background-color:var(--progress-additional-color, #dee6ef);border-radius:.9rem;cursor:pointer}.checkbox-input:after{content:"";position:absolute;box-sizing:border-box;margin:.15rem;height:1.5rem;background-color:var(--progress-background-color, #fefefe);border-radius:100%;aspect-ratio:1/1;transform:translate(0);transition:all .5s ease-out}.checkbox-input:checked:after{transform:translate(1rem)}.checkbox-input:checked{background-color:var(--progress-accent-color, #005cfe)}.checkbox-input:focus-visible{outline:.1rem solid var(--progress-accent-color, #005cfe);outline-offset:.05rem}.checkbox-label{cursor:pointer;padding-top:.2rem}';class b extends HTMLElement{constructor(){super()}connectedCallback(){const e=this.getAttribute("title"),t=this.getAttribute("checked");this.innerHTML=`
      <style>${f}</style>
      <div class="checkbox-ui">
        <input
          class="checkbox-input"
          type="checkbox"
          id="${e}_checkbox"
          title="${e}"
          ${t?"checked":""}
        />
        <label for="${e}_checkbox" class="checkbox-label">
          ${e}
        </label>
      </div>
    `}}const v=".input-ui{display:flex;width:fit-content;gap:1.3rem;cursor:pointer;color:inherit;align-items:center}.input-ui:hover{opacity:.8}.input{appearance:none;-moz-appearance:none;-webkit-appearance:none;border:.1rem solid currentColor;box-sizing:border-box;width:2.8rem;height:1.8rem;color:inherit;background-color:transparent;border-radius:.9rem;cursor:pointer;font-family:Poppins;text-align:center;font-size:1rem;padding-top:.2rem}.input::-webkit-inner-spin-button,.input::-webkit-outer-spin-button{appearance:none;-webkit-appearance:none}.input:focus{outline:none;border-color:var(--progress-accent-color, #005cfe)}.input-label{cursor:pointer;padding-top:.2rem}";class y extends HTMLElement{constructor(){super()}connectedCallback(){const e=this.getAttribute("title");this.innerHTML=`
      <style>${v}</style>
      <div class="input-ui">
        <input
          class="input"
          type="number"
          pattern="[0-9]*"
          id="${e}_input"
          title="${e}"
        />
        <label for="${e}_input" class="input-label">
          ${e}
        </label>
      </div>
    `}}customElements.define("my-progress",g);customElements.define("my-checkboxui",b);customElements.define("my-inputui",y);class x extends HTMLElement{constructor(){super(),this.innerHTML=`
      <style>${m}</style>
      <div id="progress-widget" class="progress-widget">
        <h4 class="title">Progress</h4>
        <my-progress 
          id="widget-loader"
          class="widget-loader"
        ></my-progress>
        <form id="settings" class="settings">
          <my-inputui 
            title="Value" 
          ></my-inputui>
          <my-checkboxui 
            title="Animate"
          ></my-checkboxui>
          <my-checkboxui 
            title="Hide"
          ></my-checkboxui>
        </form>
      </div>
    `;const e=new a,t=this.querySelector("#settings");if(t){const s=this.querySelector("#widget-loader");if(s){const i=new u(t,e);new p(i,s.model,e)}}}}customElements.define("my-progresswidget",x);
