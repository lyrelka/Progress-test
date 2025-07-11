(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();class c{_events;constructor(){this._events=new Map}on(e,t){this._events.has(e)||this._events.set(e,new Set),this._events.get(e)?.add(t)}off(e,t){this._events.has(e)&&(this._events.get(e).delete(t),this._events.get(e)?.size===0&&this._events.delete(e))}offAll(){this._events=new Map}emit(e,t){this._events.forEach((r,i)=>{i==="*"&&r.forEach(s=>s({eventName:e,data:t})),(i instanceof RegExp&&i.test(e)||i===e)&&r.forEach(s=>s(t))})}}class a{constructor(e,t,r){this.view=e,this.model=t,this.events=r,this.view.setValidateInput(String(t.value)),this.events.on("settings:changed",this.onSettingsChanged.bind(this))}onSettingsChanged(e){const t=e.target;switch(t?.title){case"Value":this.view.setValidateInput(t.value),this.model.value=this.view.inputValue;break;case"Animate":this.model.animate=t.checked;break;case"Hide":this.model.hide=t.checked;break}}}class l{constructor(e,t){this.container=e,this.events=t,e.addEventListener("input",r=>{t.emit("settings:changed",r)}),this._input=e.querySelector("input"),this._input&&this._input.addEventListener("keypress",r=>{r.key==="Enter"&&r.preventDefault()})}_input;setValidateInput(e){e=e.replace(/^[-][^0-9]/g,""),this._input&&(e||(this._input.value="0"),e=String(Math.max(0,Math.min(100,Number(e)))),this._input.value=e)}get inputValue(){return this._input?Number(this._input.value):0}}const d=".title{position:absolute;left:1.25rem;top:1.65rem;font-size:.9rem;margin:0}.progress-widget{position:relative;display:grid;grid-template-columns:1fr;grid-template-rows:1fr 1fr;justify-items:center;width:320px;height:568px;background-color:var(--background-color, #fefefe);padding:1.25rem;box-sizing:border-box;gap:4.2rem;font-size:.9rem}.widget-loader{align-self:end;padding-bottom:1.5rem}.settings{display:flex;flex-direction:column;gap:.75rem;padding-right:.5rem}@media (orientation: landscape){.progress-widget{width:568px;height:320px;grid-template-columns:1fr 1fr;grid-template-rows:1fr;align-items:center;justify-items:start;gap:3.5rem}.widget-loader{justify-self:end;align-self:center;padding-right:1.85rem;padding-bottom:0}}",u='.checkbox-ui{display:flex;width:fit-content;gap:1.3rem;cursor:pointer;color:inherit;align-items:center;width:100%}.checkbox-ui:hover{opacity:.8}.checkbox-input{appearance:none;position:relative;box-sizing:border-box;width:2.8rem;height:1.8rem;margin:0;background-color:var(--additional-color, #dee6ef);border-radius:.9rem;cursor:pointer}.checkbox-input:after{content:"";position:absolute;box-sizing:border-box;margin:.15rem;height:1.5rem;background-color:var(--background-color, #fefefe);border-radius:100%;aspect-ratio:1/1;transform:translate(0);transition:all .5s ease-out}.checkbox-input:checked:after{transform:translate(1rem)}.checkbox-input:checked{background-color:var(--accent-color, #005cfe)}.checkbox-input:focus-visible{outline:.1rem solid var(--accent-color, #005cfe);outline-offset:.05rem}.checkbox-label{cursor:pointer;padding-top:.2rem}';class p extends HTMLElement{constructor(){super()}connectedCallback(){const e=this.getAttribute("title"),t=this.getAttribute("checked");this.innerHTML=`
      <style>${u}</style>
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
    `}}customElements.define("my-checkboxui",p);const h=".input-ui{display:flex;width:fit-content;gap:1.3rem;cursor:pointer;color:inherit;align-items:center;width:100%}.input-ui:hover{opacity:.8}.input{appearance:none;-moz-appearance:none;-webkit-appearance:none;border:.1rem solid currentColor;box-sizing:border-box;width:2.8rem;height:1.8rem;color:inherit;background-color:transparent;border-radius:.9rem;cursor:pointer;font-family:Poppins;text-align:center;font-size:1rem;padding-top:.2rem}.input::-webkit-inner-spin-button,.input::-webkit-outer-spin-button{appearance:none;-webkit-appearance:none}.input:focus{outline:none;border-color:var(--accent-color, #005cfe)}.input-label{cursor:pointer;padding-top:.2rem}";class g extends HTMLElement{constructor(){super()}connectedCallback(){const e=this.getAttribute("title");this.innerHTML=`
      <style>${h}</style>
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
    `}}customElements.define("my-inputui",g);class f extends HTMLElement{constructor(){super(),this.innerHTML=`
      <style>${d}</style>
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
    `;const e=new c,t=this.querySelector("#settings");if(t){const r=this.querySelector("#widget-loader");if(r){const i=new l(t,e);new a(i,r.model,e)}}}}customElements.define("my-progresswidget",f);
