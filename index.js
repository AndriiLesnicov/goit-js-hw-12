import{a as m,S as y,i as a}from"./assets/vendor-CrlV4O_2.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const g="50210744-4391225cbd715823d75e3ef00",h="https://pixabay.com/api/";async function b(o){const r={key:g,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0};return(await m.get(h,{params:r})).data}const c=document.querySelector(".gallery"),u=document.querySelector(".loader");let l=null;function L(o){const r=o.map(({webformatURL:n,largeImageURL:s,tags:e,likes:t,views:i,comments:f,downloads:p})=>`
    <li class="gallery-item">
      <a href="${s}">
        <img src="${n}" alt="${e}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${t}</p>
        <p><b>Views:</b> ${i}</p>
        <p><b>Comments:</b> ${f}</p>
        <p><b>Downloads:</b> ${p}</p>
      </div>
    </li>
  `).join("");c.insertAdjacentHTML("beforeend",r),l?l.refresh():l=new y(".gallery a",{captionsData:"alt",captionDelay:250})}function S(){c.innerHTML=""}function q(){u.classList.remove("is-hidden")}function w(){u.classList.add("is-hidden")}const d=document.querySelector(".form"),E=d.querySelector('input[name="search-text"]');d.addEventListener("submit",P);function P(o){o.preventDefault(),o.target.disabled=!0;const r=E.value.trim();if(a.destroy(),r===""){a.warning({message:"Please enter a search query.",position:"topRight"});return}q(),S(),$(r).then(n=>{if(n.length===0){a.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}L(n)}).catch(n=>{a.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(n)}).finally(()=>{w(),o.target.disabled=!1})}function $(o){return b(o).then(r=>r.hits)}
//# sourceMappingURL=index.js.map
