import{a as m,i as n,S as g}from"./assets/vendor-DFCQGEf1.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const y="50210744-4391225cbd715823d75e3ef00",h="https://pixabay.com/api/";async function b(o){const r={key:y,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0};try{return(await m.get(h,{params:r})).data}catch{n.error({title:"Помилка",message:"Не вдалося завантажити зображення. Спробуйте пізніше.",position:"topRight"})}}const c=document.querySelector(".gallery"),d=document.querySelector(".loader");let l=null;function L(o){const r=o.map(({webformatURL:i,largeImageURL:s,tags:e,likes:t,views:a,comments:f,downloads:p})=>`
    <li class="gallery-item">
      <a href="${s}">
        <img src="${i}" alt="${e}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${t}</p>
        <p><b>Views:</b> ${a}</p>
        <p><b>Comments:</b> ${f}</p>
        <p><b>Downloads:</b> ${p}</p>
      </div>
    </li>
  `).join("");c.insertAdjacentHTML("beforeend",r),l?l.refresh():l=new g(".gallery a",{captionsData:"alt",captionDelay:250})}function S(){c.innerHTML=""}function w(){d.classList.remove("is-hidden")}function q(){d.classList.add("is-hidden")}const u=document.querySelector(".form"),E=u.querySelector('input[name="search-text"]');u.addEventListener("submit",P);async function P(o){o.preventDefault(),o.target.disabled=!0;const r=E.value.trim();if(n.destroy(),r===""){n.warning({message:"Please enter a search query.",position:"topRight"}),o.target.disabled=!1;return}w(),S();try{const s=(await b(r)).hits;if(s.length===0){n.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}L(s)}catch(i){n.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(i)}finally{q(),o.target.disabled=!1}}
//# sourceMappingURL=index.js.map
