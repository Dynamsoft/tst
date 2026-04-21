Object.defineProperty(exports,Symbol.toStringTag,{value:`Module`});var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},s=(n,r,a)=>(a=n==null?{}:e(i(n)),o(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));let c=require(`@dynamsoft/dynamsoft-capture-vision-bundle`);c=s(c);var l=function(e){return e.MRZ=`mrz`,e.Opposite=`opposite`,e}({}),u=function(e){return e.TD3=`td3`,e.TD1=`td1`,e.TD2=`td2`,e.Visa=`visa`,e.TD1AndTD2=`td1AndTd2`,e.All=`all`,e}({}),d=function(e){return e.Scanner=`scanner`,e.Result=`scan-result`,e}({}),f={[u.TD3]:`ReadPassport`,[u.TD1]:`ReadId-TD1`,[u.TD2]:`ReadId-TD2`,[u.Visa]:`ReadVisa`,[u.TD1AndTD2]:`ReadId`,[u.All]:`ReadAll`},p=function(e){return e[e.RS_SUCCESS=0]=`RS_SUCCESS`,e[e.RS_CANCELLED=1]=`RS_CANCELLED`,e[e.RS_FAILED=2]=`RS_FAILED`,e}({});function m(e){if(e==null)return null;if(typeof e==`string`){let t=document.querySelector(e);if(!t)throw Error(`Element not found`);return t}return e instanceof HTMLElement?e:null}function h(e,t){let n=document.getElementById(e);if(n){n.textContent=t;return}let r=document.createElement(`style`);r.id=e,r.textContent=t,document.head.appendChild(r)}var g=e=>!e||Object.keys(e).length===0;function _(e,t){return t?{...e,...t}:e}function v(e){return e?e.charAt(0).toUpperCase()+e.slice(1):``}function y(e,t={}){let{message:n,spinnerSize:r=32}=t,i=document.createElement(`div`);i.className=`dynamsoft-mrz-loading-screen`;let a=document.createElement(`div`);a.className=`dynamsoft-mrz-loading`;let o=document.createElement(`div`);if(o.className=`dynamsoft-mrz-loading-content`,o.innerHTML=`
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="white" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      width="${r}" 
      height="${r}" 
      stroke-width="0.75"
    > 
      <path d="M12 3a9 9 0 1 0 9 9"></path> 
    </svg>
  `,n){let e=document.createElement(`div`);e.className=`dynamsoft-mrz-loading-message`,e.textContent=n,o.appendChild(e)}return a.appendChild(o),i.appendChild(a),e.appendChild(i),{element:i,updateMessage:e=>{let t=a.querySelector(`.dynamsoft-mrz-loading-message`);if(e===null){t?.remove();return}t?t.textContent=e:(t=document.createElement(`div`),t.className=`dynamsoft-mrz-loading-message`,t.textContent=e,o.appendChild(t))},hide:()=>{i&&i.parentNode&&(i.classList.add(`fade-out`),setTimeout(()=>{i.parentNode?.removeChild(i)},200))}}}var b=`
  .dynamsoft-mrz-loading-screen {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #323234;
    z-index: 998;
    opacity: 1;
    transition: opacity 0.2s ease-out;
  }

  .dynamsoft-mrz-loading-screen.fade-out {
    opacity: 0;
  }

  .dynamsoft-mrz-loading {
    position: absolute;
    left: 50%;
    top: 50%;
    color: white;
    z-index: 999;
    transform: translate(-50%, -50%);
  }

  .dynamsoft-mrz-loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .dynamsoft-mrz-loading svg {
    animation: spin 1s linear infinite;
  }

  .dynamsoft-mrz-loading-message {
    color: white;
    font-family: "Verdana";
    font-size: 14px;
    text-align: center;
    max-width: 200px;
    line-height: 1.4;
    opacity: 0.9;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`,x=function(e){return e.InvalidFields=`invalidFields`,e.DocumentType=`documentType`,e.DocumentNumber=`documentNumber`,e.MRZText=`mrzText`,e.FirstName=`firstName`,e.LastName=`lastName`,e.Age=`age`,e.Sex=`sex`,e.IssuingState=`issuingState`,e.IssuingStateRaw=`issuingStateRaw`,e.Nationality=`nationality`,e.NationalityRaw=`nationalityRaw`,e.DateOfBirth=`dateOfBirth`,e.DateOfExpiry=`dateOfExpiry`,e.OptionalData1=`optionalData1`,e.OptionalData2=`optionalData2`,e}({}),S={[x.InvalidFields]:`Invalid Fields`,[x.DocumentType]:`Document Type`,[x.DocumentNumber]:`Document Number`,[x.MRZText]:`MRZ Text`,[x.FirstName]:`Given Name(s)`,[x.LastName]:`Surname`,[x.Age]:`Age`,[x.Sex]:`Sex`,[x.IssuingState]:`Issuing State`,[x.IssuingStateRaw]:`Issuing State (Raw Value)`,[x.Nationality]:`Nationality`,[x.NationalityRaw]:`Nationality State (Raw Value)`,[x.DateOfBirth]:`Date Of Birth (YYYY-MM-DD)`,[x.DateOfExpiry]:`Date Of Expiry (YYYY-MM-DD)`,[x.OptionalData1]:`Optional Data 1`,[x.OptionalData2]:`Optional Data 2`};function C(e){let t=new Date,n=t.getMonth()+1>e.month||t.getMonth()+1===e.month&&t.getDate()>=e.day;return t.getFullYear()-e.year-(n?0:1)}function w(e,t,n,r=!1){let i=parseInt(e,10),a;return a=r?i>=60?1900+i:2e3+i:i>new Date().getFullYear()%100?1900+i:2e3+i,{year:a,month:parseInt(t,10),day:parseInt(n,10)}}function T(e){let t=e=>`${e}`?.length===1?`0${e}`:e;return`${e?.year}-${t(e?.month)}${e?.day&&`-${t(e?.day)}`}`}var E=new Set(Object.values(c.EnumCodeType));function D(e){if(!E.has(e))throw Error(`Unknown document type: ${e}`);return e}function O(e){return e===`D<<`?`D`:e}function k(e,t){let n=[],r=e=>t.getFieldValidationStatus(e)===c.EnumValidationStatus.VS_FAILED,i=D(t.codeType),a=i===c.EnumCodeType.CT_MRTD_TD3_PASSPORT?`passportNumber`:`documentNumber`,o=w(t.getFieldValue(`birthYear`),t.getFieldValue(`birthMonth`),t.getFieldValue(`birthDay`)),s=w(t.getFieldValue(`expiryYear`),t.getFieldValue(`expiryMonth`),t.getFieldValue(`expiryDay`),!0);[`birthYear`,`birthMonth`,`birthDay`].forEach(e=>{r(e)&&n.push(x.DateOfBirth)}),[`expiryYear`,`expiryMonth`,`expiryDay`].forEach(e=>{r(e)&&n.push(x.DateOfExpiry)});let l={[x.LastName]:t.getFieldValue(`primaryIdentifier`),[x.FirstName]:t.getFieldValue(`secondaryIdentifier`),[x.Nationality]:t.getFieldValue(`nationality`),[x.NationalityRaw]:O(t.getFieldRawValue(`nationality`)),[x.DocumentNumber]:t.getFieldValue(a)||t.getFieldValue(`longDocumentNumber`),[x.IssuingState]:t.getFieldValue(`issuingState`),[x.IssuingStateRaw]:O(t.getFieldRawValue(`issuingState`)),[x.Sex]:v(t.getFieldValue(`sex`))};Object.keys(l).forEach(e=>{let t=!1;switch(e){case x.FirstName:t=r(`secondaryIdentifier`);break;case x.LastName:t=r(`primaryIdentifier`);break;case x.DocumentNumber:t=r(a)||r(`longDocumentNumber`);break;default:t=r(e)}t&&n.push(e)});let u=C(o);return u<1&&n.push(x.Age),{[x.InvalidFields]:n,[x.FirstName]:l[x.FirstName],[x.LastName]:l[x.LastName],[x.Age]:u,[x.DateOfBirth]:o,[x.Sex]:l[x.Sex],[x.Nationality]:l[x.Nationality],[x.NationalityRaw]:l[x.NationalityRaw],[x.DocumentNumber]:l[x.DocumentNumber],[x.DateOfExpiry]:s,[x.IssuingState]:l[x.IssuingState],[x.IssuingStateRaw]:l[x.IssuingStateRaw],[x.DocumentType]:i,[x.MRZText]:e}}var A=class{constructor(e){this._primaryOriginalImage=null,this._secondaryOriginalImage=null,this._primaryDocumentImage=null,this._secondaryDocumentImage=null,this._portraitImage=null,this.status=e.status,this.data=e.data,this._primaryOriginalImage=e.primaryOriginalImage??null,this._secondaryOriginalImage=e.secondaryOriginalImage??null,this._primaryDocumentImage=e.primaryDocumentImage??null,this._secondaryDocumentImage=e.secondaryDocumentImage??null,this._portraitImage=e.portraitImage??null}getDocumentImage(e){return e===l.MRZ?this._primaryDocumentImage:this._secondaryDocumentImage}getOriginalImage(e){return e===l.MRZ?this._primaryOriginalImage:this._secondaryOriginalImage}getPortraitImage(){return this._portraitImage}},j=14,M=.05,N=3,P=.75,F=.05,I=.5;function L(e){e.toCanvas=()=>(0,c._toCanvas)(e),e.toBlob=async()=>await(0,c._toBlob)(`image/png`,e)}function R(e){return!(!e||e.errorCode||!e.points||e.points.length!==4||!e.area||e.area<=0)}function z(e,t,n,r){if(r&&t)return r(e,t);if(t?.area&&e.area)return t.area/e.area>=N;if(!e.area)return!1;let i=n.width*n.height,a=e.area/i;return a>=F&&a<=I}function B(e){let t=e.processedDocumentResult?.detectedQuadResultItems?.[0];return!t||t.crossVerificationStatus===c.EnumCrossVerificationStatus.CVS_FAILED?null:t.location}function V(e,t,n){let r=e.points,i=(r[0].x+r[1].x+r[2].x+r[3].x)/4,a=(r[0].y+r[1].y+r[2].y+r[3].y)/4,o=n?n.width-1:1/0,s=n?n.height-1:1/0;return{points:r.map(e=>{let n=e.x-i,r=e.y-a,c=Math.sqrt(n*n+r*r)||1;return{x:Math.max(0,Math.min(o,e.x+n/c*t)),y:Math.max(0,Math.min(s,e.y+r/c*t))}})}}async function H(e,t={}){let{returnDocumentImage:n=!1,returnPortraitImage:r=!1,validatePortraitLocation:i}=t,a=e.items.filter(e=>e.type===c.EnumCapturedResultItemType.CRIT_ORIGINAL_IMAGE);if(a.length===0)throw Error(`No image data found in captured result`);let o=a[0].imageData;L(o);let s=e?.parsedResult?.parsedResultItems,l={};if(s?.length){let e=s[0]?.referenceItem?.text||``,t=s[0];l=k(e,t)}let u=null;if(r)try{u=await c.IdentityProcessor.findPortraitZone()}catch{}let d=null,f=null;if(n)try{let t=e.processedDocumentResult,n=t?.detectedQuadResultItems?.[0];if(n){let e=n.location,r=o.width*o.height,i=e?.area??0,a=i/r;if(n.crossVerificationStatus!==c.EnumCrossVerificationStatus.CVS_FAILED&&e&&i>0&&a>=M)if(f=e,a>P)d=o;else{let e=t?.deskewedImageResultItems?.[0];if(e?.imageData)d=e.imageData,L(d);else{let e=V(f,j,o);d=await c.ImageProcessor.cropAndDeskewImage(o,e),L(d)}}}d||=o}catch{d=o}let p=null;if(r&&u)try{if(!R(u))return{imageData:o,processedData:l,primaryDocumentImage:d,portraitImage:null};if(z(u,f,o,i)){let e=V(u,j,o);p=await c.ImageProcessor.cropAndDeskewImage(o,e),L(p)}}catch{}return{imageData:o,processedData:l,primaryDocumentImage:d,portraitImage:p}}var U=`<svg width="354" height="221" viewBox="0 0 354 221" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="352" height="219" rx="15" stroke="currentColor" stroke-width="2"/>
<rect width="338" height="42.4805" transform="translate(8 170.52)" fill="black" fill-opacity="0.1"/>
<path d="M332.647 202.684L338.8 206.703V208.754L330.159 202.984V202.369L338.8 196.709V198.787L332.647 202.684Z" fill="white"/>
<path d="M320.534 202.684L326.687 206.703V208.754L318.046 202.984V202.369L326.687 196.709V198.787L320.534 202.684Z" fill="white"/>
<path d="M308.421 202.684L314.573 206.703V208.754L305.933 202.984V202.369L314.573 196.709V198.787L308.421 202.684Z" fill="white"/>
<path d="M296.308 202.684L302.46 206.703V208.754L293.819 202.984V202.369L302.46 196.709V198.787L296.308 202.684Z" fill="white"/>
<path d="M284.194 202.684L290.347 206.703V208.754L281.706 202.984V202.369L290.347 196.709V198.787L284.194 202.684Z" fill="white"/>
<path d="M272.081 202.684L278.233 206.703V208.754L269.593 202.984V202.369L278.233 196.709V198.787L272.081 202.684Z" fill="white"/>
<path d="M259.968 202.684L266.12 206.703V208.754L257.479 202.984V202.369L266.12 196.709V198.787L259.968 202.684Z" fill="white"/>
<path d="M247.854 202.684L254.007 206.703V208.754L245.366 202.984V202.369L254.007 196.709V198.787L247.854 202.684Z" fill="white"/>
<path d="M235.741 202.684L241.894 206.703V208.754L233.253 202.984V202.369L241.894 196.709V198.787L235.741 202.684Z" fill="white"/>
<path d="M223.628 202.684L229.78 206.703V208.754L221.14 202.984V202.369L229.78 196.709V198.787L223.628 202.684Z" fill="white"/>
<path d="M211.515 202.684L217.667 206.703V208.754L209.026 202.984V202.369L217.667 196.709V198.787L211.515 202.684Z" fill="white"/>
<path d="M199.401 202.684L205.554 206.703V208.754L196.913 202.984V202.369L205.554 196.709V198.787L199.401 202.684Z" fill="white"/>
<path d="M187.288 202.684L193.44 206.703V208.754L184.8 202.984V202.369L193.44 196.709V198.787L187.288 202.684Z" fill="white"/>
<path d="M175.175 202.684L181.327 206.703V208.754L172.687 202.984V202.369L181.327 196.709V198.787L175.175 202.684Z" fill="white"/>
<path d="M163.062 202.684L169.214 206.703V208.754L160.573 202.984V202.369L169.214 196.709V198.787L163.062 202.684Z" fill="white"/>
<path d="M150.948 202.684L157.101 206.703V208.754L148.46 202.984V202.369L157.101 196.709V198.787L150.948 202.684Z" fill="white"/>
<path d="M138.835 202.684L144.987 206.703V208.754L136.347 202.984V202.369L144.987 196.709V198.787L138.835 202.684Z" fill="white"/>
<path d="M126.722 202.684L132.874 206.703V208.754L124.233 202.984V202.369L132.874 196.709V198.787L126.722 202.684Z" fill="white"/>
<path d="M114.608 202.684L120.761 206.703V208.754L112.12 202.984V202.369L120.761 196.709V198.787L114.608 202.684Z" fill="white"/>
<path d="M102.495 202.684L108.647 206.703V208.754L100.007 202.984V202.369L108.647 196.709V198.787L102.495 202.684Z" fill="white"/>
<path d="M90.3818 202.684L96.5342 206.703V208.754L87.8936 202.984V202.369L96.5342 196.709V198.787L90.3818 202.684Z" fill="white"/>
<path d="M80.415 200.729L81.1396 200.865C81.8096 201.016 82.3428 201.303 82.7529 201.727C83.6143 202.561 84.0518 203.559 84.0518 204.707V204.748C84.0518 205.91 83.71 206.826 83.04 207.496C82.1787 208.357 81.0986 208.85 79.7861 208.973C79.5811 208.986 79.3896 209 79.1846 209C78.0771 209 76.9561 208.727 75.8486 208.166V206.361L76.9561 206.936C77.5713 207.195 78.2275 207.318 78.9385 207.318C79.1299 207.318 79.335 207.305 79.54 207.291C80.4424 207.195 81.1533 206.881 81.6865 206.361C82.1787 205.896 82.4248 205.391 82.4248 204.844V204.762C82.4248 204.051 82.2061 203.477 81.7686 203.025C81.29 202.506 80.6338 202.246 79.7861 202.246H77.9951V200.893L81.5498 197.297H75.8486V195.656H83.6006V197.502L80.415 200.729Z" fill="white"/>
<path d="M63.8994 208.891C63.8994 206.908 64.0498 205.664 64.3506 205.131C64.8154 204.133 65.8135 203.148 67.3447 202.164C68.5615 201.385 69.3818 200.674 69.8193 200.031C69.9834 199.799 70.0654 199.512 70.0654 199.17C70.0654 198.951 70.0381 198.719 69.9697 198.459C69.874 198.09 69.5732 197.762 69.0811 197.475C68.7529 197.27 68.3701 197.16 67.9189 197.16C66.8662 197.16 65.8955 197.42 65.0068 197.939C64.4053 198.295 64.1045 198.473 64.1045 198.486C64.0908 198.062 64.0908 197.68 64.0908 197.352C64.0908 197.01 64.0908 196.736 64.1045 196.504C65.4033 195.861 66.6748 195.533 67.9189 195.52C69.04 195.52 69.9697 195.848 70.708 196.49C71.46 197.133 71.8291 198.008 71.8291 199.143C71.8291 200.1 71.5146 200.906 70.8857 201.549C70.1885 202.273 69.4229 202.889 68.5889 203.395C67.249 204.215 66.4561 204.926 66.1963 205.514C65.9639 206.074 65.8408 206.648 65.8271 207.25H71.624V208.891H63.8994Z" fill="white"/>
<path d="M56.7354 208.877V197.939L53.5908 200.646V198.268L56.708 195.725H58.6221V208.877H56.7354Z" fill="white"/>
<path d="M45.7021 185.088H47.3701C47.3701 185.908 47.0967 186.578 46.5498 187.111C46.0029 187.631 45.2783 187.918 44.376 187.973H44.1709C43.4736 187.973 42.8447 187.768 42.2842 187.357C41.6416 186.879 41.1768 186.209 40.8623 185.348C40.4932 184.309 40.3154 183.119 40.3154 181.766C40.3154 180.412 40.4932 179.223 40.8486 178.197C41.1357 177.391 41.6006 176.748 42.2432 176.27C42.8721 175.805 43.583 175.572 44.376 175.572C45.251 175.572 45.8799 175.764 46.2627 176.146C46.9873 176.871 47.3428 177.596 47.3428 178.334H45.7842L45.7568 178.047C45.7158 177.883 45.5928 177.691 45.4014 177.473C45.2236 177.254 44.8408 177.145 44.2803 177.145C43.6104 177.145 43.0635 177.473 42.6533 178.129C42.2432 178.826 42.0381 179.934 42.0381 181.479V181.766C42.0791 183.475 42.3252 184.678 42.7764 185.389C43.2002 186.059 43.6924 186.4 44.2803 186.4C44.7725 186.4 45.1553 186.25 45.4287 185.949C45.5518 185.812 45.6338 185.607 45.6748 185.334L45.7021 185.088Z" fill="white"/>
<path d="M45.7021 206.088H47.3701C47.3701 206.908 47.0967 207.578 46.5498 208.111C46.0029 208.631 45.2783 208.918 44.376 208.973H44.1709C43.4736 208.973 42.8447 208.768 42.2842 208.357C41.6416 207.879 41.1768 207.209 40.8623 206.348C40.4932 205.309 40.3154 204.119 40.3154 202.766C40.3154 201.412 40.4932 200.223 40.8486 199.197C41.1357 198.391 41.6006 197.748 42.2432 197.27C42.8721 196.805 43.583 196.572 44.376 196.572C45.251 196.572 45.8799 196.764 46.2627 197.146C46.9873 197.871 47.3428 198.596 47.3428 199.334H45.7842L45.7568 199.047C45.7158 198.883 45.5928 198.691 45.4014 198.473C45.2236 198.254 44.8408 198.145 44.2803 198.145C43.6104 198.145 43.0635 198.473 42.6533 199.129C42.2432 199.826 42.0381 200.934 42.0381 202.479V202.766C42.0791 204.475 42.3252 205.678 42.7764 206.389C43.2002 207.059 43.6924 207.4 44.2803 207.4C44.7725 207.4 45.1553 207.25 45.4287 206.949C45.5518 206.812 45.6338 206.607 45.6748 206.334L45.7021 206.088Z" fill="white"/>
<path d="M29.1318 180.795H31.8115C32.4404 180.795 33.001 180.658 33.4795 180.371C33.9033 180.111 34.1084 179.701 34.1084 179.141V179.072C34.1084 178.594 33.8486 178.211 33.3428 177.896C32.9053 177.623 32.3994 177.486 31.8115 177.486H29.1318V180.795ZM29.1318 186.291H31.8115C32.4814 186.291 33.042 186.154 33.4795 185.881C34.0127 185.566 34.2725 185.102 34.2725 184.486C34.2725 183.871 34.04 183.365 33.5889 182.982C33.1514 182.586 32.5635 182.381 31.8115 182.381H29.1318V186.291ZM27.4365 187.877V175.9H31.8115C33.1514 175.9 34.1768 176.215 34.9014 176.857C35.5166 177.404 35.8311 178.102 35.8311 178.963C35.8311 179.797 35.667 180.412 35.3389 180.795C35.1475 181.027 34.915 181.246 34.6553 181.438L34.3271 181.643L34.6279 181.779C34.9697 181.984 35.2568 182.23 35.4756 182.518C35.8447 182.941 36.0225 183.557 36.0225 184.377C36.0088 185.457 35.6807 186.25 35.0518 186.77C34.1631 187.508 33.083 187.877 31.8115 187.877H27.4365Z" fill="white"/>
<path d="M29.1318 201.795H31.8115C32.4404 201.795 33.001 201.658 33.4795 201.371C33.9033 201.111 34.1084 200.701 34.1084 200.141V200.072C34.1084 199.594 33.8486 199.211 33.3428 198.896C32.9053 198.623 32.3994 198.486 31.8115 198.486H29.1318V201.795ZM29.1318 207.291H31.8115C32.4814 207.291 33.042 207.154 33.4795 206.881C34.0127 206.566 34.2725 206.102 34.2725 205.486C34.2725 204.871 34.04 204.365 33.5889 203.982C33.1514 203.586 32.5635 203.381 31.8115 203.381H29.1318V207.291ZM27.4365 208.877V196.9H31.8115C33.1514 196.9 34.1768 197.215 34.9014 197.857C35.5166 198.404 35.8311 199.102 35.8311 199.963C35.8311 200.797 35.667 201.412 35.3389 201.795C35.1475 202.027 34.915 202.246 34.6553 202.438L34.3271 202.643L34.6279 202.779C34.9697 202.984 35.2568 203.23 35.4756 203.518C35.8447 203.941 36.0225 204.557 36.0225 205.377C36.0088 206.457 35.6807 207.25 35.0518 207.77C34.1631 208.508 33.083 208.877 31.8115 208.877H27.4365Z" fill="white"/>
<path d="M18.167 182.777H21.1475L19.6709 177.322L18.167 182.777ZM15.2002 187.877L18.6045 175.559H20.9014L24.0322 187.877H22.3096L21.4072 184.432H17.7568L16.7725 187.877H15.2002Z" fill="white"/>
<path d="M18.167 203.777H21.1475L19.6709 198.322L18.167 203.777ZM15.2002 208.877L18.6045 196.559H20.9014L24.0322 208.877H22.3096L21.4072 205.432H17.7568L16.7725 208.877H15.2002Z" fill="white"/>
<path d="M56.7354 187.877V176.939L53.5908 179.646V177.268L56.708 174.725H58.6221V187.877H56.7354Z" fill="white"/>
<path d="M63.8994 187.891C63.8994 185.908 64.0498 184.664 64.3506 184.131C64.8154 183.133 65.8135 182.148 67.3447 181.164C68.5615 180.385 69.3818 179.674 69.8193 179.031C69.9834 178.799 70.0654 178.512 70.0654 178.17C70.0654 177.951 70.0381 177.719 69.9697 177.459C69.874 177.09 69.5732 176.762 69.0811 176.475C68.7529 176.27 68.3701 176.16 67.9189 176.16C66.8662 176.16 65.8955 176.42 65.0068 176.939C64.4053 177.295 64.1045 177.473 64.1045 177.486C64.0908 177.062 64.0908 176.68 64.0908 176.352C64.0908 176.01 64.0908 175.736 64.1045 175.504C65.4033 174.861 66.6748 174.533 67.9189 174.52C69.04 174.52 69.9697 174.848 70.708 175.49C71.46 176.133 71.8291 177.008 71.8291 178.143C71.8291 179.1 71.5146 179.906 70.8857 180.549C70.1885 181.273 69.4229 181.889 68.5889 182.395C67.249 183.215 66.4561 183.926 66.1963 184.514C65.9639 185.074 65.8408 185.648 65.8271 186.25H71.624V187.891H63.8994Z" fill="white"/>
<path d="M80.415 179.729L81.1396 179.865C81.8096 180.016 82.3428 180.303 82.7529 180.727C83.6143 181.561 84.0518 182.559 84.0518 183.707V183.748C84.0518 184.91 83.71 185.826 83.04 186.496C82.1787 187.357 81.0986 187.85 79.7861 187.973C79.5811 187.986 79.3896 188 79.1846 188C78.0771 188 76.9561 187.727 75.8486 187.166V185.361L76.9561 185.936C77.5713 186.195 78.2275 186.318 78.9385 186.318C79.1299 186.318 79.335 186.305 79.54 186.291C80.4424 186.195 81.1533 185.881 81.6865 185.361C82.1787 184.896 82.4248 184.391 82.4248 183.844V183.762C82.4248 183.051 82.2061 182.477 81.7686 182.025C81.29 181.506 80.6338 181.246 79.7861 181.246H77.9951V179.893L81.5498 176.297H75.8486V174.656H83.6006V176.502L80.415 179.729Z" fill="white"/>
<path d="M332.647 181.684L338.8 185.703V187.754L330.159 181.984V181.369L338.8 175.709V177.787L332.647 181.684Z" fill="white"/>
<path d="M320.534 181.684L326.687 185.703V187.754L318.046 181.984V181.369L326.687 175.709V177.787L320.534 181.684Z" fill="white"/>
<path d="M308.421 181.684L314.573 185.703V187.754L305.933 181.984V181.369L314.573 175.709V177.787L308.421 181.684Z" fill="white"/>
<path d="M296.308 181.684L302.46 185.703V187.754L293.819 181.984V181.369L302.46 175.709V177.787L296.308 181.684Z" fill="white"/>
<path d="M284.194 181.684L290.347 185.703V187.754L281.706 181.984V181.369L290.347 175.709V177.787L284.194 181.684Z" fill="white"/>
<path d="M272.081 181.684L278.233 185.703V187.754L269.593 181.984V181.369L278.233 175.709V177.787L272.081 181.684Z" fill="white"/>
<path d="M259.968 181.684L266.12 185.703V187.754L257.479 181.984V181.369L266.12 175.709V177.787L259.968 181.684Z" fill="white"/>
<path d="M247.854 181.684L254.007 185.703V187.754L245.366 181.984V181.369L254.007 175.709V177.787L247.854 181.684Z" fill="white"/>
<path d="M235.741 181.684L241.894 185.703V187.754L233.253 181.984V181.369L241.894 175.709V177.787L235.741 181.684Z" fill="white"/>
<path d="M223.628 181.684L229.78 185.703V187.754L221.14 181.984V181.369L229.78 175.709V177.787L223.628 181.684Z" fill="white"/>
<path d="M211.515 181.684L217.667 185.703V187.754L209.026 181.984V181.369L217.667 175.709V177.787L211.515 181.684Z" fill="white"/>
<path d="M199.401 181.684L205.554 185.703V187.754L196.913 181.984V181.369L205.554 175.709V177.787L199.401 181.684Z" fill="white"/>
<path d="M187.288 181.684L193.44 185.703V187.754L184.8 181.984V181.369L193.44 175.709V177.787L187.288 181.684Z" fill="white"/>
<path d="M175.175 181.684L181.327 185.703V187.754L172.687 181.984V181.369L181.327 175.709V177.787L175.175 181.684Z" fill="white"/>
<path d="M163.062 181.684L169.214 185.703V187.754L160.573 181.984V181.369L169.214 175.709V177.787L163.062 181.684Z" fill="white"/>
<path d="M150.948 181.684L157.101 185.703V187.754L148.46 181.984V181.369L157.101 175.709V177.787L150.948 181.684Z" fill="white"/>
<path d="M138.835 181.684L144.987 185.703V187.754L136.347 181.984V181.369L144.987 175.709V177.787L138.835 181.684Z" fill="white"/>
<path d="M126.722 181.684L132.874 185.703V187.754L124.233 181.984V181.369L132.874 175.709V177.787L126.722 181.684Z" fill="white"/>
<path d="M114.608 181.684L120.761 185.703V187.754L112.12 181.984V181.369L120.761 175.709V177.787L114.608 181.684Z" fill="white"/>
<path d="M102.495 181.684L108.647 185.703V187.754L100.007 181.984V181.369L108.647 175.709V177.787L102.495 181.684Z" fill="white"/>
<path d="M90.3818 181.684L96.5342 185.703V187.754L87.8936 181.984V181.369L96.5342 175.709V177.787L90.3818 181.684Z" fill="white"/>
</svg>`,W=`<svg width="354" height="221" viewBox="0 0 354 221" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="352" height="219" rx="15" stroke="currentColor" stroke-width="2"/>
</svg>`,ee=`<svg width="160" height="100" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.9" d="M148 0C154.627 0 160 5.37258 160 12V88C160 94.6274 154.627 100 148 100H12C5.37258 100 0 94.6274 0 88V12C2.57711e-07 5.37258 5.37258 2.57703e-07 12 0H148ZM11 86C9.34315 86 8 87.3431 8 89C8 90.6569 9.34315 92 11 92H149C150.657 92 152 90.6569 152 89C152 87.3431 150.657 86 149 86H11ZM11 76C9.34315 76 8 77.3431 8 79C8 80.6569 9.34315 82 11 82H149C150.657 82 152 80.6569 152 79C152 77.3431 150.657 76 149 76H11Z" fill="white"/>
</svg>`,te=`<svg width="160" height="100" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.9" d="M12 0C5.37257 0 0 5.37258 0 12V88C0 94.6274 5.37259 100 12 100H148C154.627 100 160 94.6274 160 88V12C160 5.37258 154.627 0 148 0H12ZM35.999 16C39.6377 16 43.1761 17.1901 46.0703 19.3877C48.9644 21.5853 51.0552 24.6691 52.0205 28.165C52.9857 31.661 52.7727 35.3766 51.4141 38.7402C50.0553 42.1039 47.6257 44.9304 44.499 46.7852C50.8201 48.8434 56.2371 53.1852 59.752 59.2402C59.9143 59.5197 59.9996 59.8372 60 60.1602C60.0004 60.483 59.9155 60.8003 59.7539 61.0801C59.5918 61.3598 59.3588 61.5924 59.0781 61.7539C58.7974 61.9154 58.4785 62.0001 58.1543 62H13.8447C13.5208 61.9997 13.2023 61.9145 12.9219 61.7529C12.6415 61.5913 12.4089 61.3587 12.2471 61.0791C12.0853 60.7996 12 60.4828 12 60.1602C12.0001 59.8374 12.0851 59.5198 12.2471 59.2402C15.7619 53.1852 21.1789 48.8434 27.5 46.7852C24.3733 44.9304 21.9437 42.1039 20.585 38.7402C19.2263 35.3766 19.0133 31.661 19.9785 28.165C20.9438 24.6692 23.0337 21.5853 25.9277 19.3877C28.8219 17.19 32.3604 16.0001 35.999 16Z" fill="white"/>
</svg>`,ne={close:{icon:`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="2" y1="2" x2="18" y2="18"/><line x1="18" y1="2" x2="2" y2="18"/></svg>`,label:`Close scanner`,isHidden:!1},upload:{icon:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.25 3.75H6.75C6.35218 3.75 5.97064 3.90804 5.68934 4.18934C5.40804 4.47064 5.25 4.85218 5.25 5.25V6.75H3.75C3.35218 6.75 2.97064 6.90804 2.68934 7.18934C2.40804 7.47064 2.25 7.85218 2.25 8.25V18.75C2.25 19.1478 2.40804 19.5294 2.68934 19.8107C2.97064 20.092 3.35218 20.25 3.75 20.25H17.25C17.6478 20.25 18.0294 20.092 18.3107 19.8107C18.592 19.5294 18.75 19.1478 18.75 18.75V17.25H20.25C20.6478 17.25 21.0294 17.092 21.3107 16.8107C21.592 16.5294 21.75 16.1478 21.75 15.75V5.25C21.75 4.85218 21.592 4.47064 21.3107 4.18934C21.0294 3.90804 20.6478 3.75 20.25 3.75ZM16.125 6.75C16.3475 6.75 16.565 6.81598 16.75 6.9396C16.935 7.06321 17.0792 7.23891 17.1644 7.44448C17.2495 7.65005 17.2718 7.87625 17.2284 8.09448C17.185 8.31271 17.0778 8.51316 16.9205 8.6705C16.7632 8.82783 16.5627 8.93498 16.3445 8.97838C16.1262 9.02179 15.9 8.99951 15.6945 8.91436C15.4889 8.82922 15.3132 8.68502 15.1896 8.50002C15.066 8.31501 15 8.0975 15 7.875C15 7.57663 15.1185 7.29048 15.3295 7.0795C15.5405 6.86853 15.8266 6.75 16.125 6.75ZM17.25 18.75H3.75V8.25H5.25V15.75C5.25 16.1478 5.40804 16.5294 5.68934 16.8107C5.97064 17.092 6.35218 17.25 6.75 17.25H17.25V18.75ZM20.25 15.75H6.75V11.3147L9.59437 8.46937C9.66403 8.39964 9.74675 8.34432 9.83779 8.30658C9.92884 8.26884 10.0264 8.24941 10.125 8.24941C10.2236 8.24941 10.3212 8.26884 10.4122 8.30658C10.5033 8.34432 10.586 8.39964 10.6556 8.46937L15.3103 13.125L17.7188 10.7194C17.8594 10.5788 18.0501 10.4999 18.2489 10.4999C18.4477 10.4999 18.6384 10.5788 18.7791 10.7194L20.25 12.1941V15.75Z" fill="white"/></svg>`,label:`Upload image`,isHidden:!1},cameraSwitch:{icon:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.5 5.25H16.9012L15.6234 3.33375C15.555 3.23114 15.4623 3.147 15.3535 3.08879C15.2448 3.03057 15.1233 3.00007 15 3H9C8.87665 3.00007 8.75522 3.03057 8.64648 3.08879C8.53773 3.147 8.44502 3.23114 8.37656 3.33375L7.09781 5.25H4.5C3.90326 5.25 3.33097 5.48705 2.90901 5.90901C2.48705 6.33097 2.25 6.90326 2.25 7.5V18C2.25 18.5967 2.48705 19.169 2.90901 19.591C3.33097 20.0129 3.90326 20.25 4.5 20.25H19.5C20.0967 20.25 20.669 20.0129 21.091 19.591C21.5129 19.169 21.75 18.5967 21.75 18V7.5C21.75 6.90326 21.5129 6.33097 21.091 5.90901C20.669 5.48705 20.0967 5.25 19.5 5.25ZM14.7009 15.6C13.8672 16.2207 12.8451 16.5351 11.8066 16.4901C10.7682 16.4452 9.77701 16.0438 9 15.3534V15.75C9 15.9489 8.92098 16.1397 8.78033 16.2803C8.63968 16.421 8.44891 16.5 8.25 16.5C8.05109 16.5 7.86032 16.421 7.71967 16.2803C7.57902 16.1397 7.5 15.9489 7.5 15.75V13.5C7.5 13.3011 7.57902 13.1103 7.71967 12.9697C7.86032 12.829 8.05109 12.75 8.25 12.75H10.5C10.6989 12.75 10.8897 12.829 11.0303 12.9697C11.171 13.1103 11.25 13.3011 11.25 13.5C11.25 13.6989 11.171 13.8897 11.0303 14.0303C10.8897 14.171 10.6989 14.25 10.5 14.25H10.0172C10.5352 14.7039 11.1932 14.9664 11.8814 14.9939C12.5697 15.0214 13.2465 14.8121 13.7991 14.4009C13.9581 14.2813 14.1581 14.2298 14.3551 14.2577C14.5521 14.2855 14.7299 14.3905 14.8495 14.5495C14.9691 14.7085 15.0207 14.9085 14.9928 15.1055C14.9649 15.3025 14.8599 15.4804 14.7009 15.6ZM16.5 11.25C16.5 11.4489 16.421 11.6397 16.2803 11.7803C16.1397 11.921 15.9489 12 15.75 12H13.5C13.3011 12 13.1103 11.921 12.9697 11.7803C12.829 11.6397 12.75 11.4489 12.75 11.25C12.75 11.0511 12.829 10.8603 12.9697 10.7197C13.1103 10.579 13.3011 10.5 13.5 10.5H13.9828C13.4648 10.0461 12.8068 9.78356 12.1186 9.7561C11.4303 9.72863 10.7535 9.93792 10.2009 10.3491C10.0419 10.4687 9.84193 10.5202 9.64493 10.4923C9.44793 10.4645 9.27007 10.3595 9.15047 10.2005C9.03087 10.0415 8.97934 9.84146 9.00721 9.64446C9.03507 9.44746 9.14006 9.2696 9.29906 9.15C10.1328 8.52931 11.1549 8.21494 12.1934 8.25985C13.2318 8.30476 14.223 8.70621 15 9.39656V9C15 8.80109 15.079 8.61032 15.2197 8.46967C15.3603 8.32902 15.5511 8.25 15.75 8.25C15.9489 8.25 16.1397 8.32902 16.2803 8.46967C16.421 8.61032 16.5 8.80109 16.5 9V11.25Z" fill="white"/></svg>`,label:`Switch camera`,isHidden:!1},flash:{icon:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.25 6.5H6.75C6.35218 6.5 5.97064 6.65804 5.68934 6.93934C5.40804 7.22064 5.25 7.60218 5.25 8V10.2497C5.2508 10.5741 5.35599 10.8897 5.55 11.1497L7.5 13.7503V21C7.5 21.3978 7.65804 21.7794 7.93934 22.0607C8.22064 22.342 8.60218 22.5 9 22.5H15C15.3978 22.5 15.7794 22.342 16.0607 22.0607C16.342 21.7794 16.5 21.3978 16.5 21V13.7503L18.45 11.1497C18.644 10.8897 18.7492 10.5741 18.75 10.2497V8C18.75 7.60218 18.592 7.22064 18.3107 6.93934C18.0294 6.65804 17.6478 6.5 17.25 6.5ZM12.75 17.25C12.75 17.4489 12.671 17.6397 12.5303 17.7803C12.3897 17.921 12.1989 18 12 18C11.8011 18 11.6103 17.921 11.4697 17.7803C11.329 17.6397 11.25 17.4489 11.25 17.25V14.25C11.25 14.0511 11.329 13.8603 11.4697 13.7197C11.6103 13.579 11.8011 13.5 12 13.5C12.1989 13.5 12.3897 13.579 12.5303 13.7197C12.671 13.8603 12.75 14.0511 12.75 14.25V17.25Z" fill="white"/><path d="M11.125 3.7V1.3C11.125 1.08783 11.2172 0.884344 11.3813 0.734315C11.5454 0.584285 11.7679 0.5 12 0.5C12.2321 0.5 12.4546 0.584285 12.6187 0.734315C12.7828 0.884344 12.875 1.08783 12.875 1.3V3.7C12.875 3.91217 12.7828 4.11566 12.6187 4.26569C12.4546 4.41571 12.2321 4.5 12 4.5C11.7679 4.5 11.5454 4.41571 11.3813 4.26569C11.2172 4.11566 11.125 3.91217 11.125 3.7Z" fill="white"/><path d="M6.09231 4.97685L4.89231 2.89839C4.78622 2.71464 4.76432 2.49232 4.83141 2.28035C4.89851 2.06837 5.04911 1.8841 5.25008 1.76807C5.45106 1.65203 5.68594 1.61375 5.90307 1.66163C6.12019 1.70951 6.30177 1.83964 6.40785 2.02339L7.60785 4.10185C7.71394 4.2856 7.73585 4.50791 7.66875 4.71989C7.60166 4.93186 7.45106 5.11614 7.25008 5.23217C7.04911 5.3482 6.81422 5.38649 6.5971 5.3386C6.37997 5.29072 6.1984 5.1606 6.09231 4.97685Z" fill="white"/><path d="M16.3922 4.10185L17.5922 2.02339C17.6983 1.83964 17.8799 1.70951 18.097 1.66163C18.3141 1.61375 18.549 1.65203 18.75 1.76807C18.9509 1.8841 19.1015 2.06837 19.1686 2.28035C19.2357 2.49232 19.2138 2.71464 19.1077 2.89839L17.9077 4.97685C17.8016 5.1606 17.6201 5.29072 17.4029 5.33861C17.1858 5.38649 16.9509 5.3482 16.75 5.23217C16.549 5.11614 16.3984 4.93186 16.3313 4.71989C16.2642 4.50791 16.2861 4.2856 16.3922 4.10185Z" fill="white"/></svg>`,label:`Toggle flash`,isHidden:!1},flashOff:{icon:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.25 1.5H6.75C6.35218 1.5 5.97064 1.65804 5.68934 1.93934C5.40804 2.22064 5.25 2.60218 5.25 3V7.24969C5.2508 7.57411 5.35599 7.88967 5.55 8.14969L7.5 10.7503V21C7.5 21.3978 7.65804 21.7794 7.93934 22.0607C8.22064 22.342 8.60218 22.5 9 22.5H15C15.3978 22.5 15.7794 22.342 16.0607 22.0607C16.342 21.7794 16.5 21.3978 16.5 21V10.7503L18.45 8.14969C18.644 7.88967 18.7492 7.57411 18.75 7.24969V3C18.75 2.60218 18.592 2.22064 18.3107 1.93934C18.0294 1.65804 17.6478 1.5 17.25 1.5ZM12.75 14.25C12.75 14.4489 12.671 14.6397 12.5303 14.7803C12.3897 14.921 12.1989 15 12 15C11.8011 15 11.6103 14.921 11.4697 14.7803C11.329 14.6397 11.25 14.4489 11.25 14.25V11.25C11.25 11.0511 11.329 10.8603 11.4697 10.7197C11.6103 10.579 11.8011 10.5 12 10.5C12.1989 10.5 12.3897 10.579 12.5303 10.7197C12.671 10.8603 12.75 11.0511 12.75 11.25V14.25ZM6.75 5.25V3H17.25V5.25H6.75Z" fill="white"/></svg>`},sound:{icon:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.98"><path d="M19.7156 5.28185L12.2156 3.03185C12.1037 2.99824 11.9854 2.99127 11.8702 3.0115C11.7551 3.03173 11.6462 3.0786 11.5524 3.14837C11.4586 3.21813 11.3824 3.30887 11.3299 3.41332C11.2774 3.51778 11.25 3.63306 11.25 3.74997V13.8993C10.4819 13.2123 9.5013 12.8098 8.47206 12.7589C7.44282 12.7081 6.4273 13.012 5.59523 13.62C4.76317 14.2279 4.16496 15.103 3.9006 16.099C3.63624 17.095 3.72173 18.1516 4.14279 19.0922C4.56386 20.0327 5.29498 20.8002 6.21396 21.2665C7.13295 21.7327 8.18412 21.8695 9.1918 21.6538C10.1995 21.4381 11.1026 20.8831 11.7502 20.0816C12.3979 19.28 12.7508 18.2805 12.75 17.25V9.25779L19.2844 11.2181C19.3964 11.2517 19.5146 11.2587 19.6298 11.2384C19.7449 11.2182 19.8538 11.1713 19.9476 11.1016C20.0414 11.0318 20.1176 10.9411 20.1701 10.8366C20.2226 10.7322 20.25 10.6169 20.25 10.5V5.99997C20.25 5.83873 20.198 5.6818 20.1017 5.55245C20.0054 5.42309 19.8701 5.3282 19.7156 5.28185Z" fill="white"/></g></svg>`,label:`Toggle sound`,isHidden:!1},soundOff:{icon:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.98"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.52987 3.47025C4.76321 3.23691 5.11092 3.19215 5.3912 3.3306C5.42654 3.40214 5.47033 3.47125 5.52987 3.5308L21.4703 19.4703C21.5294 19.5292 21.5976 19.5728 21.6685 19.6079C21.8078 19.8885 21.7635 20.2366 21.5299 20.4703C21.237 20.7626 20.7621 20.7627 20.4693 20.4703L12.7496 12.7505V17.2505C12.7503 18.2809 12.3972 19.2801 11.7496 20.0816C11.1021 20.8829 10.1994 21.4381 9.19198 21.6538C8.1844 21.8694 7.13236 21.7333 6.21347 21.2671C5.29459 20.8009 4.56321 20.0328 4.14218 19.0923C3.72122 18.1519 3.6357 17.095 3.89999 16.0992C4.16433 15.1032 4.76337 14.2286 5.5953 13.6206C6.42729 13.0128 7.44312 12.7085 8.47226 12.7593C9.50127 12.8103 10.4816 13.2131 11.2496 13.8999V11.2505L4.52987 4.5308C4.23726 4.23807 4.23753 3.76315 4.52987 3.47025ZM11.8697 3.01127C11.9848 2.99106 12.1035 2.99824 12.2154 3.03178L19.7154 5.28178C19.8697 5.32808 20.0049 5.42317 20.1012 5.55228C20.1974 5.68164 20.2496 5.83929 20.2496 6.00053V10.5005C20.2495 10.6172 20.2219 10.7322 20.1695 10.8365C20.117 10.9408 20.0406 11.0324 19.9469 11.1021C19.8532 11.1716 19.7444 11.2186 19.6295 11.2388C19.5145 11.259 19.3956 11.2519 19.2838 11.2183L13.65 9.52787L11.2496 7.12748V3.75053C11.2496 3.63371 11.2772 3.518 11.3297 3.41361C11.3821 3.30928 11.4587 3.2187 11.5523 3.14896C11.646 3.07929 11.7547 3.03155 11.8697 3.01127Z" fill="white"/></g></svg>`}},re={passportLabel:`Passport`,idLabel:`ID`,visaLabel:`Visa`,allLabel:`All`},G={positionMRZ:`Position MRZ within the frame`,holdSteady:`Hold steady...`,scanSuccess:`MRZ scanned ✓`,flipDocument:`Now scan the portrait side`,flipDocumentCountdown:`Flip and scan the other side ({seconds}s)`,positionPortrait:`Position portrait within the frame`,scanMRZFirst:`Scan the MRZ side first`,scanningPortrait:`Scanning portrait...`,portraitScanned:`Portrait scanned ✓`,bothSidesScanned:`Both sides scanned ✓`,skipPortraitLabel:`Skip portrait scan`,uploadFailed:`Failed to upload image`,cameraAccessDenied:`Camera access denied`},K={colors:{primary:`--mrz-primary`,accent:`--mrz-accent`,backgroundDark:`--mrz-background-dark`,backgroundBadge:`--mrz-background-badge`,backgroundOverlay:`--mrz-background-overlay`,backgroundSkipLabel:`--mrz-background-skip-label`,text:`--mrz-text`,textSecondary:`--mrz-text-secondary`,divider:`--mrz-divider`,guideFrame:`--mrz-guide-frame`},typography:{fontFamily:`--mrz-font-family`,badgeFontSize:`--mrz-badge-font-size`,badgeFontSizeDesktop:`--mrz-badge-font-size-desktop`,formatBtnFontSize:`--mrz-format-btn-font-size`,formatBtnFontSizeSmall:`--mrz-format-btn-font-size-small`},spacing:{topBarHeight:`--mrz-top-bar-height`,topBarHeightDesktop:`--mrz-top-bar-height-desktop`,guideFrameWidth:`--mrz-guide-frame-width`,guideFrameWidthDesktop:`--mrz-guide-frame-width-desktop`,badgeMargin:`--mrz-badge-margin`,badgeBorderRadius:`--mrz-badge-border-radius`}};function ie(e){if(!e)return``;let t=[];for(let[n,r]of Object.entries(K)){let i=e[n];if(i)for(let[e,n]of Object.entries(r)){let r=i[e];r&&t.push(`${n}: ${r};`)}}return t.length>0?`.mrz-scanner-overlay {\n  ${t.join(`
  `)}\n}`:``}var q=`
  .dce-header,
  .dce-footer,
  .dce-mn-footer,
  .dce-mn-resolution-box,
  .dce-mn-select-camera-icon,
  .dce-mn-camera-and-resolution-settings,
  .dce-mn-upload-image-icon,
  .dce-mn-sound-feedback,
  .dce-mn-torch,
  .dce-mn-close,
  .dce-mn-scan-mode-select,
  .dce-mn-zoom,
  .dce-mn-toast,
  .dce-mn-msg-poweredby,
  .dce-mn-setting,
  .dce-mn-settings,
  .dce-mn-cog,
  .dce-mn-camera-setting,
  .dce-scanguide-passport,
  .dce-scanguide-td1,
  .dce-scanguide-td2,
  .dce-mn-bg-mrz-passport,
  .dce-mn-bg-mrz-td1,
  .dce-mn-bg-mrz-td2 {
    display: none !important;
  }
`,ae=`
  .mrz-scanner-overlay {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    pointer-events: none;
    z-index: 100;
    font-family: var(--mrz-font-family, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif);
    box-sizing: border-box;
  }

  /* ── Top bar ── */
  .mrz-top-bar {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: calc(var(--mrz-top-bar-height, 56px) + env(safe-area-inset-top, 0px));
    background: var(--mrz-background-dark, #000);
    display: flex;
    flex-direction: column;
    pointer-events: auto;
  }

  /* Absorbs the notch / Dynamic Island zone — no buttons ever live here */
  .mrz-top-safe-spacer {
    height: env(safe-area-inset-top, 0px);
    flex-shrink: 0;
  }

  /* Fixed-height row that always holds the buttons — centred unconditionally */
  .mrz-top-bar-inner {
    flex: 0 0 var(--mrz-top-bar-height, 56px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px 0 8px;
  }

  .mrz-top-controls {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .mrz-icon-btn {
    background: none;
    border: none;
    outline: none;
    box-shadow: none;
    cursor: pointer;
    color: var(--mrz-text, #fff);
    padding: 0 10px;
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    user-select: none;
    -webkit-user-select: none;
  }

  .mrz-icon-btn:active {
    opacity: 0.6;
  }

  /* Close button — tight 20×20 viewBox (~90% coverage), keep visually small */
  .mrz-close-btn svg {
    width: 22px;
    height: 22px;
    display: block;
  }

  /*
   * Top-controls action icons — 24×24 viewBox rendered at 24 px.
   */
  .mrz-top-controls .mrz-icon-btn svg {
    width: 24px;
    height: 24px;
    display: block;
  }

  /*
   * Flash / sound buttons wrap their SVGs in <span> elements for dual-state
   * toggling. Spans are inline by default which adds a descender gap below
   * the SVG and shifts it off-centre. Make them flex containers to match the
   * layout of buttons whose SVG is a direct child.
   */
  .mrz-icon-btn span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mrz-icon-btn.mrz-hidden {
    display: none;
  }

  /* Hide a divider whose preceding button is hidden (prevents orphan / double dividers) */
  .mrz-icon-btn.mrz-hidden + .mrz-top-divider {
    display: none;
  }

  .mrz-top-divider {
    width: 1px;
    height: 24px;
    background: var(--mrz-divider, rgba(255, 255, 255, 0.3));
    margin: 0 4px;
    flex-shrink: 0;
    align-self: center;
  }

  /* ── Guide wrapper (positions frame + badge together) ── */
  .mrz-guide-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -46%);
    width: var(--mrz-guide-frame-width, min(88vw, 520px));
    pointer-events: none;
  }

  /* ── Badge — floats just above the guide frame ── */
  .mrz-badge {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: var(--mrz-badge-margin, 8px);
    background: var(--mrz-background-badge, rgba(0, 0, 0, 0.72));
    border-radius: var(--mrz-badge-border-radius, 20px);
    padding: 10px 20px;
    text-align: center;
    white-space: nowrap;
    pointer-events: none;
    display: none;
    flex-direction: column;
    gap: 3px;
  }

  .mrz-badge.mrz-badge-visible {
    display: flex;
  }

  .mrz-badge-line {
    font-size: var(--mrz-badge-font-size, 14px);
    font-weight: 500;
    color: var(--mrz-text, #fff);
    line-height: 1.4;
    letter-spacing: 0.1px;
  }

  .mrz-badge-line.mrz-success {
    color: var(--mrz-accent, #FF9F40);
  }

  /* ── Guide frame ── */
  .mrz-guide-frame {
    position: relative;
    width: 100%;
    color: var(--mrz-guide-frame, #fff);
    transition: color 0.35s ease;
    pointer-events: none;
  }

  .mrz-guide-frame.mrz-guide-success {
    color: var(--mrz-primary, #4CAF50);
  }

  .mrz-guide-frame svg {
    width: 100%;
    height: auto;
    display: block;
  }

  /* ── Flip animation ── */
  .mrz-flip-animation {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 160px;
    height: 100px;
    perspective: 600px;
  }

  .mrz-flip-animation.mrz-flip-visible {
    display: block;
  }

  .mrz-flip-card {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
  }

  .mrz-flip-card.mrz-flip-animate {
    animation: mrz-card-flip 0.8s ease-in-out forwards;
  }

  .mrz-flip-card-front,
  .mrz-flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .mrz-flip-card-back {
    transform: rotateY(180deg);
  }

  @keyframes mrz-card-flip {
    0%   { transform: rotateY(0deg); }
    100% { transform: rotateY(180deg); }
  }

  /* ── Bottom bar / Format selector ── */
  .mrz-format-selector {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--mrz-background-overlay, rgba(0, 0, 0, 0.85));
    padding: 10px 16px calc(20px + env(safe-area-inset-bottom, 0px));
    overflow: hidden;
    pointer-events: auto;
    touch-action: pan-y;
  }

  /* Row that holds the format buttons plus the sliding indicator */
  .mrz-format-buttons-row {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    padding-top: 10px;
    transition: transform 0.25s ease;
  }

  /* Indicator always centered above the format buttons */
  .mrz-format-indicator {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 3px;
    width: 32px;
    background: var(--mrz-text, #fff);
    border-radius: 2px;
    pointer-events: none;
  }

  .mrz-format-btn {
    flex: 1;
    text-align: center;
    background: none;
    border: none;
    outline: none;
    box-shadow: none;
    color: var(--mrz-text-secondary, rgba(255, 255, 255, 0.8));
    font-size: var(--mrz-format-btn-font-size, 15px);
    font-weight: 400;
    padding: 8px 0;
    cursor: pointer;
    letter-spacing: 0.2px;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    user-select: none;
    -webkit-user-select: none;
    transition: color 0.15s ease, font-weight 0.15s ease;
    font-family: inherit;
  }

  .mrz-format-btn.mrz-format-active {
    color: var(--mrz-text, #fff);
    font-weight: 700;
  }

  @media (max-width: 400px) {
    .mrz-format-btn {
      padding: 8px 14px;
      font-size: var(--mrz-format-btn-font-size-small, 14px);
    }
  }

  /* ── Skip-portrait label (shown after 5 s timeout in portrait phase) ── */
  .mrz-skip-portrait-label {
    position: absolute;
    top: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    background: var(--mrz-background-skip-label, rgba(55, 55, 55, 0.92));
    border-radius: 50px;
    color: var(--mrz-text, #fff);
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.1px;
    line-height: 1.4;
    text-align: center;
    white-space: nowrap;
    padding: 12px 20px;
    display: none;
    pointer-events: none;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    user-select: none;
    -webkit-user-select: none;
  }

  .mrz-skip-portrait-label.mrz-skip-portrait-visible {
    display: block;
    pointer-events: auto;
    cursor: pointer;
  }

  @media (min-width: 1024px) {
    .mrz-top-bar {
      height: calc(var(--mrz-top-bar-height-desktop, 60px) + env(safe-area-inset-top, 0px));
    }
    .mrz-top-bar-inner {
      flex-basis: var(--mrz-top-bar-height-desktop, 60px);
    }
    .mrz-badge-line {
      font-size: var(--mrz-badge-font-size-desktop, 15px);
    }
    .mrz-guide-wrapper {
      width: var(--mrz-guide-frame-width-desktop, min(60vw, 600px));
    }
  }
`;function J(e){e.addEventListener(`keydown`,t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),e.click())})}function Y(e,t,n){let r=document.createElement(`div`);return r.className=`mrz-icon-btn ${e}`,r.setAttribute(`role`,`button`),r.setAttribute(`aria-label`,t),r.setAttribute(`tabindex`,`0`),r.innerHTML=n,J(r),r}function oe(e){let{showUpload:t,showFormatSelector:n,showSoundToggle:r,toolbarButtonsConfig:i,formatSelectorConfig:a,messagesConfig:o,themeConfig:s}=e,c=e=>({...ne[e],...i?.[e]}),l={close:c(`close`),upload:c(`upload`),cameraSwitch:c(`cameraSwitch`),flash:c(`flash`),flashOff:c(`flashOff`),sound:c(`sound`),soundOff:c(`soundOff`)},u=_(re,a),d=_(G,o),f=document.createElement(`div`);f.className=`mrz-scanner-overlay`;let p=document.createElement(`div`);p.className=`mrz-top-bar`;let m=document.createElement(`div`);m.className=`mrz-top-safe-spacer`;let h=document.createElement(`div`);h.className=`mrz-top-bar-inner`;let g=Y(`mrz-close-btn`,l.close.label,l.close.icon);l.close.className&&g.classList.add(l.close.className),l.close.isHidden&&g.classList.add(`mrz-hidden`);let v=document.createElement(`div`);v.className=`mrz-top-controls`;let y=Y(`mrz-upload-btn`,l.upload.label,l.upload.icon);l.upload.className&&y.classList.add(l.upload.className),(!t||l.upload.isHidden)&&y.classList.add(`mrz-hidden`);let b=document.createElement(`span`);b.className=`mrz-top-divider`,(!t||l.upload.isHidden)&&b.classList.add(`mrz-hidden`);let x=Y(`mrz-camera-btn`,l.cameraSwitch.label,l.cameraSwitch.icon);l.cameraSwitch.className&&x.classList.add(l.cameraSwitch.className),l.cameraSwitch.isHidden&&x.classList.add(`mrz-hidden`);let S=document.createElement(`span`);S.className=`mrz-top-divider`;let C=Y(`mrz-flash-btn`,l.flash.label,``);l.flash.className&&C.classList.add(l.flash.className),l.flash.isHidden&&C.classList.add(`mrz-hidden`);let w=document.createElement(`span`);w.innerHTML=l.flashOff.icon;let T=document.createElement(`span`);T.innerHTML=l.flash.icon,T.style.display=`none`,C.appendChild(w),C.appendChild(T);let E=Y(`mrz-sound-btn`,l.sound.label,``);l.sound.className&&E.classList.add(l.sound.className),(!r||l.sound.isHidden)&&E.classList.add(`mrz-hidden`);let D=document.createElement(`span`);D.innerHTML=l.soundOff.icon;let O=document.createElement(`span`);O.innerHTML=l.sound.icon,O.style.display=`none`,E.appendChild(D),E.appendChild(O),v.append(y,b,x,S,C,E),h.append(g,v),p.append(m,h);let k=document.createElement(`div`);k.className=`mrz-guide-wrapper`;let A=document.createElement(`div`);A.className=`mrz-badge`;let j=document.createElement(`span`);j.className=`mrz-badge-line`;let M=document.createElement(`span`);M.className=`mrz-badge-line`,M.style.display=`none`,A.append(j,M);let N=document.createElement(`div`);N.className=`mrz-guide-frame`,N.innerHTML=U;let P=document.createElement(`div`);P.className=`mrz-flip-animation`;let F=document.createElement(`div`);F.className=`mrz-flip-card`;let I=document.createElement(`div`);I.className=`mrz-flip-card-front`,I.innerHTML=ee;let L=document.createElement(`div`);L.className=`mrz-flip-card-back`,L.innerHTML=te,F.append(I,L),P.appendChild(F),N.appendChild(P);let R=document.createElement(`div`);R.className=`mrz-skip-portrait-label`,R.setAttribute(`role`,`button`),R.setAttribute(`tabindex`,`0`),R.textContent=d.skipPortraitLabel,J(R),k.append(A,N,R);let z=null,B=null,V=null,H=null,W=null,K=null;if(n){z=document.createElement(`div`),z.className=`mrz-format-selector`;let e=document.createElement(`div`);e.className=`mrz-format-buttons-row`;let t=(e,t=!1)=>{let n=document.createElement(`div`);return n.className=`mrz-format-btn${t?` mrz-format-active`:``}`,n.setAttribute(`role`,`button`),n.setAttribute(`tabindex`,`0`),n.textContent=e,J(n),n};H=t(u.visaLabel),W=t(u.allLabel,!0),B=t(u.passportLabel),V=t(u.idLabel),K=document.createElement(`div`),K.className=`mrz-format-indicator`,e.append(H,W,B,V),z.append(K,e)}f.append(p,k),z&&f.appendChild(z);let q=ie(s);if(q){let e=document.createElement(`style`);e.textContent=q,f.appendChild(e)}return{overlay:f,closeBtn:g,uploadBtn:y,cameraSwitchBtn:x,flashBtn:C,flashOnIcon:T,flashOffIcon:w,soundBtn:E,soundOnIcon:O,soundOffIcon:D,badge:A,badgeLine1:j,badgeLine2:M,guideFrame:N,flipAnimation:P,skipPortraitLabel:R,formatSelector:z,formatPassportBtn:B,formatIdBtn:V,formatVisaBtn:H,formatAllBtn:W,formatIndicator:K}}var se={width:125,height:88},X=[c.EnumCodeType.CT_MRTD_TD1_ID,c.EnumCodeType.CT_MRTD_TD2_ID,c.EnumCodeType.CT_MRTD_TD3_PASSPORT,c.EnumCodeType.CT_MRTD_TD2_VISA,c.EnumCodeType.CT_MRTD_TD3_VISA,c.EnumCodeType.CT_MRTD_TD2_FRENCH_ID],Z={...Object.fromEntries(X.map(e=>[e,se])),[c.EnumCodeType.CT_MRTD_TD1_ID]:{width:85.6,height:53.98},[c.EnumCodeType.CT_MRTD_TD2_ID]:{width:105,height:74},[c.EnumCodeType.CT_MRTD_TD2_VISA]:{width:120,height:80},[c.EnumCodeType.CT_MRTD_TD3_VISA]:{width:105,height:74},[c.EnumCodeType.CT_MRTD_TD2_FRENCH_ID]:{width:105,height:74}},Q=14,ce=3,$=class e{static{this.FORMAT_ORDER=[`visa`,`all`,`passport`,`id`]}static{this.PORTRAIT_SKIP_TIMEOUT_MS=5e3}static{this.SAME_SIDE_MISSES_BEFORE_FLIP=3}static{this.PORTRAIT_STABLE_FRAMES_REQUIRED=10}showScannerLoadingOverlay(e){let t=m(this.config.container);if(!t)throw Error(`Scanner view container not found`);this.loadingScreen=y(t,{message:e}),t.style.display=`block`,t.style.position=`relative`}hideScannerLoadingOverlay(e=!1){this.loadingScreen&&(this.loadingScreen.hide(),this.loadingScreen=null,e&&(m(this.config.container).style.display=`none`))}constructor(e,t){this.resources=e,this.config=t,this.isSoundFeedbackOn=!1,this.isFlashOn=!1,this.currentFormatMode=`all`,this.currentScanMode=u.All,this.resizeTimer=null,this.defaultBackCameraId=null,this.originalImageData=null,this.initialized=!1,this.initializedUI=!1,this.isMRZScanned=!1,this.isPortraitScanned=!1,this.areSidesDifferent=!1,this.isWaitingForFlip=!1,this.flipTimeoutHandle=null,this.flipCountdownHandle=null,this.portraitSkipTimerHandle=null,this.isProcessingSameSideFrame=!1,this.isProcessingPortraitFrame=!1,this.sameSideMissCount=0,this.consecutiveStablePortraitFrames=0,this.latestLocalizedTextLines=null,this.mrzSideData={processedData:null,primaryOriginalImage:null,primaryDocumentImage:null,portraitImage:null},this.ui=null,this.loadingScreen=null,this.handleResize=()=>{this.setGuideFrameVisible(!1),this.resizeTimer&&window.clearTimeout(this.resizeTimer),this.resizeTimer=window.setTimeout(()=>{this.setGuideFrameVisible(!0),this.updateScanRegion()},500)},this.firstFrame=!0,this.messages={...G,...t.messagesConfig}}async initialize(){if(!this.initialized){this.initializeScanModeManager(),this.currentScanMode=this.getScanMode(),h(`dynamsoft-mrz-loading-screen-style`,b),h(`dynamsoft-mrz-scanner-view-style`,ae);try{let{cameraView:e,cameraEnhancer:t,cvRouter:n}=this.resources;if(!e||!t||!n)throw Error(`Camera resources not initialized`);try{e.setScanRegionMaskStyle({strokeStyle:`transparent`,fillStyle:`transparent`,lineWidth:0}),e.setVideoFit(`cover`)}catch{}if(n.setInput(t),this.config.enableMultiFrameCrossFilter===!0){let e=new c.MultiFrameResultCrossFilter;e.enableResultCrossVerification(c.EnumCapturedResultItemType.CRIT_TEXT_LINE,!0),this.resources.returnDocumentImage&&e.enableResultCrossVerification(c.EnumCapturedResultItemType.CRIT_DETECTED_QUAD,!0),await n.addResultFilter(e)}let r=new c.CapturedResultReceiver;if(r.onCapturedResultReceived=e=>this.handleMRZResult(e),n.addResultReceiver(r),this.resources.returnPortraitImage){let e=new c.IntermediateResultReceiver;e.onLocalizedTextLinesReceived=e=>{this.latestLocalizedTextLines=e},n.getIntermediateResultManager().addResultReceiver(e)}this.initialized=!0}catch(e){let t=e?.message||e;console.error(t),alert(t),this.closeCamera();let n=new A({status:p.RS_FAILED});this.currentScanResolver?.(n)}}}initializeUI(){let t=m(this.config.container);if(!t)throw Error(`Container element not found`);let n=t.children[t.children.length-1];if(n?.shadowRoot&&!n.shadowRoot.querySelector(`#mrz-dce-hide-style`)){let e=document.createElement(`style`);e.id=`mrz-dce-hide-style`,e.textContent=q,n.shadowRoot.appendChild(e)}if(this.ui=oe({showUpload:this.config.showUploadImage!==!1,showFormatSelector:this.config.showFormatSelector===!0&&this.shouldShowFormatSelector(),showSoundToggle:this.config.showSoundToggle!==!1,toolbarButtonsConfig:this.config.toolbarButtonsConfig,formatSelectorConfig:this.config.formatSelectorConfig,messagesConfig:this.config.messagesConfig,themeConfig:this.config.themeConfig}),t.appendChild(this.ui.overlay),this.ui.closeBtn.addEventListener(`click`,()=>this.handleCloseBtn()),this.ui.uploadBtn.addEventListener(`click`,()=>this.uploadFile()),this.ui.cameraSwitchBtn.addEventListener(`click`,()=>this.switchCamera()),this.ui.flashBtn.addEventListener(`click`,()=>this.toggleFlash()),this.ui.soundBtn.addEventListener(`click`,()=>this.toggleSoundFeedback()),this.ui.skipPortraitLabel.addEventListener(`click`,()=>this.handleSkipPortrait()),this.ui.formatPassportBtn&&this.ui.formatPassportBtn.addEventListener(`click`,()=>this.setFormatMode(`passport`)),this.ui.formatIdBtn&&this.ui.formatIdBtn.addEventListener(`click`,()=>this.setFormatMode(`id`)),this.ui.formatVisaBtn&&this.ui.formatVisaBtn.addEventListener(`click`,()=>this.setFormatMode(`visa`)),this.ui.formatAllBtn&&this.ui.formatAllBtn.addEventListener(`click`,()=>this.setFormatMode(`all`)),this.ui.formatSelector){let t=0;this.ui.formatSelector.addEventListener(`touchstart`,e=>{t=e.touches[0].clientX},{passive:!0}),this.ui.formatSelector.addEventListener(`touchend`,n=>{let r=n.changedTouches[0].clientX-t;if(Math.abs(r)<50)return;let i=e.FORMAT_ORDER,a=i.indexOf(this.currentFormatMode);r<0&&a<i.length-1?this.setFormatMode(i[a+1]):r>0&&a>0&&this.setFormatMode(i[a-1])},{passive:!0})}this.toggleSoundFeedback(!1),this.syncFormatButtons(),this.ui.flashBtn.classList.add(`mrz-hidden`),this.initializedUI=!0}shouldShowFormatSelector(){return X.filter(e=>this.scanModeManager[e]).length>1}async toggleFlash(){try{let{cameraEnhancer:e}=this.resources;if(!e)return;this.isFlashOn?(await e.turnOffTorch(),this.isFlashOn=!1):(await e.turnOnTorch(),this.isFlashOn=!0),this.syncFlashIcon()}catch{this.ui?.flashBtn.classList.add(`mrz-hidden`)}}syncFlashIcon(){this.ui&&(this.ui.flashOnIcon.style.display=this.isFlashOn?`inline`:`none`,this.ui.flashOffIcon.style.display=this.isFlashOn?`none`:`inline`)}async probeFlashSupport(){try{let{cameraEnhancer:e}=this.resources;if(!e)return;await e.turnOffTorch(),this.ui?.flashBtn.classList.remove(`mrz-hidden`)}catch{this.ui?.flashBtn.classList.add(`mrz-hidden`)}}async switchCamera(){try{let{cameraEnhancer:e}=this.resources;if(!e)return;let t=await e.getAllCameras();if(t.length<=1){this.ui?.cameraSwitchBtn.classList.add(`mrz-hidden`);return}let n=e.getSelectedCamera()?.deviceId===this.defaultBackCameraId,r;if(r=n?t.find(e=>/front|user|selfie/i.test(e.label))??t.find(e=>e.deviceId!==this.defaultBackCameraId):t.find(e=>e.deviceId===this.defaultBackCameraId),!r)return;await e.selectCamera(r.deviceId),this.setGuideFrameVisible(!1),window.setTimeout(()=>{this.setGuideFrameVisible(!0),this.updateScanRegion()},300)}catch(e){console.warn(`Camera switch failed:`,e?.message||e)}}toggleSoundFeedback(e){this.isSoundFeedbackOn=e===void 0?!this.isSoundFeedbackOn:e,this.ui&&(this.ui.soundOnIcon.style.display=this.isSoundFeedbackOn?`inline`:`none`,this.ui.soundOffIcon.style.display=this.isSoundFeedbackOn?`none`:`inline`)}setGuideFrame(e){if(!this.ui)return;let{flipAnimation:t}=this.ui;this.ui.guideFrame.innerHTML=e===`mrz`?U:W,this.ui.guideFrame.appendChild(t)}setGuideFrameVisible(e){this.ui&&(this.ui.guideFrame.style.visibility=e?`visible`:`hidden`)}showGuideSuccessBorder(e=1e3){this.ui&&(this.ui.guideFrame.classList.add(`mrz-guide-success`),window.setTimeout(()=>{this.ui?.guideFrame.classList.remove(`mrz-guide-success`)},e))}showFlipAnimation(){if(!this.ui)return;let{flipAnimation:e}=this.ui,t=e.querySelector(`.mrz-flip-card`);t&&(t.classList.remove(`mrz-flip-animate`),e.classList.add(`mrz-flip-visible`),t.offsetWidth,t.classList.add(`mrz-flip-animate`),t.addEventListener(`animationend`,()=>{window.setTimeout(()=>this.hideFlipAnimation(),2e3)},{once:!0}))}hideFlipAnimation(){if(!this.ui)return;let{flipAnimation:e}=this.ui;e.classList.remove(`mrz-flip-visible`),e.querySelector(`.mrz-flip-card`)?.classList.remove(`mrz-flip-animate`)}showBadge(e,t,n,r){if(!this.ui)return;let{badge:i,badgeLine1:a,badgeLine2:o}=this.ui;a.textContent=e,a.className=`mrz-badge-line${t?` mrz-success`:``}`,n===void 0?o.style.display=`none`:(o.textContent=n,o.className=`mrz-badge-line${r?` mrz-success`:``}`,o.style.display=`block`),i.classList.add(`mrz-badge-visible`)}static{this.FORMAT_DOC_TYPES={passport:[c.EnumCodeType.CT_MRTD_TD3_PASSPORT],id:[c.EnumCodeType.CT_MRTD_TD1_ID,c.EnumCodeType.CT_MRTD_TD2_ID,c.EnumCodeType.CT_MRTD_TD2_FRENCH_ID],visa:[c.EnumCodeType.CT_MRTD_TD2_VISA,c.EnumCodeType.CT_MRTD_TD3_VISA],all:X}}static{this.FORMAT_SCAN_MODES={passport:u.TD3,id:u.TD1AndTD2,visa:u.Visa,all:u.All}}static buildScanModeManager(e){let t=new Set(e);return Object.fromEntries(X.map(e=>[e,t.has(e)]))}async setFormatMode(t){try{this.scanModeManager=e.buildScanModeManager(e.FORMAT_DOC_TYPES[t]),this.currentScanMode=e.FORMAT_SCAN_MODES[t],this.stopCapturing(),this.updateScanRegion(),await this.startCapturing(),this.syncFormatButtons()}catch(e){console.error(`MRZ Scanner switch scan mode error:`,e?.message||e),this.closeCamera(),this.currentScanResolver?.(new A({status:p.RS_FAILED}))}}syncFormatButtons(){if(!this.ui)return;let{formatPassportBtn:t,formatIdBtn:n,formatVisaBtn:r,formatAllBtn:i}=this.ui;if(!t||!n||!r||!i)return;let a=this.scanModeManager,o=a[c.EnumCodeType.CT_MRTD_TD3_PASSPORT],s=a[c.EnumCodeType.CT_MRTD_TD1_ID]||a[c.EnumCodeType.CT_MRTD_TD2_ID]||a[c.EnumCodeType.CT_MRTD_TD2_FRENCH_ID],l=a[c.EnumCodeType.CT_MRTD_TD2_VISA]||a[c.EnumCodeType.CT_MRTD_TD3_VISA],u=`all`;o&&!s&&!l?u=`passport`:s&&!o&&!l?u=`id`:l&&!o&&!s&&(u=`visa`),this.currentFormatMode=u;let d={visa:r,all:i,passport:t,id:n};for(let[e,t]of Object.entries(d))t.className=`mrz-format-btn${e===u?` mrz-format-active`:``}`;let f=e.FORMAT_ORDER.indexOf(u),p=d[u].parentElement;p.style.transform=`translateX(${(1.5-f)*25}%)`}updateScanRegion(){if(this.config.showScanGuide===!1)return;let e;switch(this.currentScanMode){case u.TD1:case u.TD1AndTD2:e=c.EnumCodeType.CT_MRTD_TD1_ID;break;case u.TD2:e=c.EnumCodeType.CT_MRTD_TD2_ID;break;case u.Visa:e=c.EnumCodeType.CT_MRTD_TD2_VISA;break;default:e=c.EnumCodeType.CT_MRTD_TD3_PASSPORT;break}this.calculateScanRegion(e)}calculateScanRegion(e){let{cameraEnhancer:t,cameraView:n}=this.resources;if(!t||!t.isOpen()||!n)return;let r=Z[e].width/Z[e].height,i=n.getVisibleRegionOfVideo({inPixels:!0});if(!i)return;let{width:a,height:o}=i,s;if(a>o){let e=.5*o*r,t=Math.round(e/a*100),n=(100-t)/2;s={left:n,right:n+t,top:25,bottom:75,isMeasuredInPercentage:!0}}else{let e=.9*a/r,t=Math.round(e/o*100),n=(100-t)/2;s={left:5,right:95,top:n,bottom:n+t,isMeasuredInPercentage:!0}}try{n.setScanRegionMaskVisible(!0)}catch{}try{let e=n.getDrawingLayer(1);e&&e.setVisible(!1)}catch{}try{let e=n.getDrawingLayer(3);e&&e.setVisible(!1)}catch{}try{t.setScanRegion(s)}catch{}}async openCamera(){try{let{cameraEnhancer:e,cameraView:t}=this.resources;if(!e||!t)throw Error(`Camera resources not initialized`);let n=m(this.config.container);if(!n)throw Error(`Container element not found`);n.style.display=`block`;let r=t.getUIElement();if(e.isOpen())e.isPaused()&&await e.resume();else{r.parentElement||n.append(r),await e.open();let t=e.getSelectedCamera();t&&(this.defaultBackCameraId=t.deviceId)}let i=r.shadowRoot;if(i){let e=i.querySelector(`.dce-macro-use-mobile-native-like-ui`);e&&(e.style.display=`block`)}await e.setResolution({width:2560,height:1440}),!this.initializedUI&&e.isOpen()&&this.initializeUI();let a=await e.getAllCameras(),o=a.find(e=>/front|user|selfie/i.test(e.label));a.length>1&&(o||a.some(e=>e.deviceId!==this.defaultBackCameraId))?this.ui?.cameraSwitchBtn.classList.remove(`mrz-hidden`):this.ui?.cameraSwitchBtn.classList.add(`mrz-hidden`),await this.probeFlashSupport(),window.addEventListener(`resize`,this.handleResize)}catch(e){let t=e?.message||e;console.error(t),alert(t),this.closeCamera(),this.currentScanResolver?.(new A({status:p.RS_FAILED}))}}async closeCamera(e=!0){try{window.removeEventListener(`resize`,this.handleResize),this.resizeTimer&&=(window.clearTimeout(this.resizeTimer),null),this.defaultBackCameraId=null;let{cameraEnhancer:t,cameraView:n}=this.resources,r=m(this.config.container);if(!r||(r.style.display=e?`none`:`block`,n?.getUIElement().parentElement&&r.removeChild(n.getUIElement()),this.ui?.overlay.parentElement&&r.removeChild(this.ui.overlay),this.ui=null,this.initializedUI=!1,!t))return;t.close(),this.stopCapturing()}catch(e){console.error(`Close Camera error: ${e?.message||e}`)}}pauseCamera(){this.resources.cameraEnhancer?.pause()}stopCapturing(){let{cameraView:e,cvRouter:t}=this.resources;!t||!e||(t.stopCapturing(),e.clearAllInnerDrawingItems())}handleCloseBtn(){if(this.closeCamera(),this.currentScanResolver)if(this.isMRZScanned&&!this.isPortraitScanned&&this.areSidesDifferent){let e=new A({status:p.RS_SUCCESS,data:this.mrzSideData.processedData,primaryOriginalImage:this.mrzSideData.primaryOriginalImage,primaryDocumentImage:this.mrzSideData.primaryDocumentImage,portraitImage:this.mrzSideData.portraitImage});this.currentScanResolver?.(e),this.resetScanningState()}else this.currentScanResolver(new A({status:p.RS_CANCELLED})),this.resetScanningState()}startPortraitSkipTimer(){this.portraitSkipTimerHandle===null&&(this.portraitSkipTimerHandle=window.setTimeout(()=>{this.portraitSkipTimerHandle=null,this.ui?.skipPortraitLabel.classList.add(`mrz-skip-portrait-visible`)},e.PORTRAIT_SKIP_TIMEOUT_MS))}clearPortraitSkipTimer(){this.portraitSkipTimerHandle!==null&&(window.clearTimeout(this.portraitSkipTimerHandle),this.portraitSkipTimerHandle=null),this.ui?.skipPortraitLabel.classList.remove(`mrz-skip-portrait-visible`)}handleSkipPortrait(){if(this.closeCamera(),this.currentScanResolver){let e=new A({status:p.RS_SUCCESS,data:this.mrzSideData.processedData,primaryOriginalImage:this.mrzSideData.primaryOriginalImage,primaryDocumentImage:this.mrzSideData.primaryDocumentImage,portraitImage:null});this.resources.onResultUpdated?.(e),this.currentScanResolver?.(e),this.resetScanningState()}}async uploadFile(){let{cvRouter:e}=this.resources;if(!e)throw Error(`Router not initialized`);let t=document.createElement(`input`);t.type=`file`,t.accept=this.config.uploadAcceptedTypes??`image/*`,t.style.display=`none`,document.body.appendChild(t);try{this.showScannerLoadingOverlay(`Processing file...`),await this.closeCamera(!1);let n=await new Promise((e,n)=>{t.onchange=t=>{let r=t.target.files?.[0];if(!r){n(Error(`No file selected`));return}e(r)},t.addEventListener(`cancel`,async()=>{this.hideScannerLoadingOverlay(!1),this.showScannerLoadingOverlay(`Initializing camera...`),await this.openCamera(),this.setGuideFrameVisible(!0),this.updateScanRegion(),await this.startCapturing(),this.hideScannerLoadingOverlay()}),t.click()});if(!n)return;let r;if(this.config.uploadFileConverter&&!n.type.startsWith(`image/`))try{r=await this.config.uploadFileConverter(n)}catch(e){throw Error(`Error converting file: ${e instanceof Error?e.message:String(e)}`)}else if(n.type.startsWith(`image/`))r=n;else throw Error(`Unsupported file type. Please provide a converter function for this file type.`);let i=this.config.utilizedTemplateNames[this.currentScanMode],a=await H(await e.capture(r,i),{returnDocumentImage:this.resources.returnDocumentImage,returnPortraitImage:this.resources.returnPortraitImage,validatePortraitLocation:this.validatePortraitLocation.bind(this)});this.originalImageData=a.imageData;let o=new A({status:p.RS_SUCCESS,data:a.processedData,primaryOriginalImage:a.imageData,primaryDocumentImage:a.primaryDocumentImage,portraitImage:a.portraitImage});this.resources.onResultUpdated?.(o),this.currentScanResolver?.(o)}catch(e){let t=e?.message||e;console.error(t),alert(t),this.closeCamera(),this.currentScanResolver?.(new A({status:p.RS_FAILED}))}finally{this.hideScannerLoadingOverlay(!0),document.body.removeChild(t)}}initializeScanModeManager(){let{mrzFormatType:t}=this.config;this.scanModeManager=e.buildScanModeManager(X),!(!t||Array.isArray(t)&&t.length===0)&&(Object.keys(this.scanModeManager).forEach(e=>{this.scanModeManager[e]=!1}),(Array.isArray(t)?t:[t]).forEach(e=>{this.scanModeManager[e]=!0}))}getScanMode(){let e=this.scanModeManager,t=e[c.EnumCodeType.CT_MRTD_TD3_PASSPORT],n=e[c.EnumCodeType.CT_MRTD_TD1_ID],r=e[c.EnumCodeType.CT_MRTD_TD2_ID]||e[c.EnumCodeType.CT_MRTD_TD2_FRENCH_ID],i=e[c.EnumCodeType.CT_MRTD_TD2_VISA]||e[c.EnumCodeType.CT_MRTD_TD3_VISA];return(t||i)&&(n||r)||t&&i?u.All:t?u.TD3:i?u.Visa:n&&r?u.TD1AndTD2:n?u.TD1:r?u.TD2:u.All}async startCapturing(){let{cvRouter:e}=this.resources;if(!e)throw Error(`Router not initialized`);let t=this.config.utilizedTemplateNames[this.currentScanMode];try{this.firstFrame=!0,await e.startCapturing(t)}catch(e){let t=e?.message||e;console.error(`Failed to start capturing:`,t),this.closeCamera(),this.currentScanResolver?.(new A({status:p.RS_FAILED}))}}async launch(){try{return this.resetScanningState(),await this.initialize(),new Promise(async e=>{this.currentScanResolver=e,this.showScannerLoadingOverlay(`Initializing camera...`),await this.openCamera(),this.setGuideFrame(`mrz`),this.setGuideFrameVisible(!0),this.updateScanRegion(),await this.startCapturing(),this.hideScannerLoadingOverlay(),this.resources.returnPortraitImage?this.showBadge(this.messages.scanMRZFirst,!1):this.showBadge(this.messages.positionMRZ,!1)})}catch(e){let t=e?.message||e;console.error(`MRZ Scanner launch error:`,t),this.closeCamera(),this.currentScanResolver?.(new A({status:p.RS_FAILED}))}}async handleMRZResult(e){if(this.firstFrame){this.firstFrame=!1;return}if(!(e.items.length<=1&&!this.isMRZScanned)){if(this.isMRZScanned&&!this.isPortraitScanned&&this.resources.returnPortraitImage){let t=e.items.filter(e=>e.type===c.EnumCapturedResultItemType.CRIT_ORIGINAL_IMAGE);if(t.length>0){let e=t[0].imageData;e.toCanvas=()=>(0,c._toCanvas)(e),e.toBlob=async()=>await(0,c._toBlob)(`image/png`,e),this.originalImageData=e}e?.parsedResult?.parsedResultItems?.length?await this.tryPortraitOnSameSide(e,this.resources.onResultUpdated):t.length>0&&await this.handlePortraitSideScan(e,this.resources.onResultUpdated);return}if(!(e.items.length<=1))try{let{onResultUpdated:t}=this.resources;if(e?.parsedResult?.parsedResultItems?.length){this.isSoundFeedbackOn&&!this.isMRZScanned&&c.Feedback.beep();let n=await H(e,{returnDocumentImage:this.resources.returnDocumentImage,returnPortraitImage:!1});this.originalImageData=n.imageData;let r=B(e);if(this.resources.returnDocumentImage&&!r)return;this.isMRZScanned||await this.handleMRZSideScan(n.processedData,n.primaryDocumentImage,r??null,t)}}catch(e){let t=e?.message||e;console.error(t),alert(t),this.closeCamera(),this.currentScanResolver?.(new A({status:p.RS_FAILED}))}}}async handleMRZSideScan(e,t,n,r){let i=null,a=!1;if(this.resources.returnPortraitImage&&this.originalImageData)try{let e=await c.IdentityProcessor.findPortraitZone();if(e&&!e.errorCode&&e.points?.length===4&&(!n||this.validatePortraitLocation(e,n))){let t=V(e,Q,this.originalImageData);i=await c.ImageProcessor.cropAndDeskewImage(this.originalImageData,t),i.toCanvas=()=>(0,c._toCanvas)(i),i.toBlob=async()=>await(0,c._toBlob)(`image/png`,i),a=!0}}catch(e){console.warn(`Error finding portrait zone:`,e)}if(this.isMRZScanned=!0,this.mrzSideData={processedData:e,primaryOriginalImage:this.originalImageData,primaryDocumentImage:t,portraitImage:i},this.resources.returnPortraitImage&&!a)this.showGuideSuccessBorder(1e3),this.showBadge(this.messages.scanSuccess,!0,this.messages.scanningPortrait,!1),this.startPortraitSkipTimer();else{this.areSidesDifferent=!1,this.isPortraitScanned=!0,this.showGuideSuccessBorder(1e3);let n=i?this.messages.portraitScanned:void 0;this.showBadge(this.messages.scanSuccess,!0,n,!!n),setTimeout(()=>{this.closeCamera();let n=new A({status:p.RS_SUCCESS,data:e,primaryOriginalImage:this.originalImageData,primaryDocumentImage:t,portraitImage:i});r?.(n),this.currentScanResolver?.(n),this.resetScanningState()},1e3)}}async tryPortraitOnSameSide(t,n){if(this.isProcessingSameSideFrame)return;this.isProcessingSameSideFrame=!0;let r=!1;try{if(!this.hasHighConfidencePortraitZone())return;let e=await c.IdentityProcessor.findPortraitZone();if(this.isPortraitScanned)return;if(e&&!e.errorCode&&e.points?.length===4){let i=B(t);if((!i||this.validatePortraitLocation(e,i))&&this.originalImageData){r=!0;let t=V(e,Q,this.originalImageData),i=await c.ImageProcessor.cropAndDeskewImage(this.originalImageData,t);i.toCanvas=()=>(0,c._toCanvas)(i),i.toBlob=async()=>await(0,c._toBlob)(`image/png`,i),this.flipTimeoutHandle!==null&&(window.clearTimeout(this.flipTimeoutHandle),this.flipTimeoutHandle=null),this.flipCountdownHandle!==null&&(window.clearInterval(this.flipCountdownHandle),this.flipCountdownHandle=null),this.areSidesDifferent=!1,this.isWaitingForFlip=!1,this.isPortraitScanned=!0,this.mrzSideData.portraitImage=i,this.showGuideSuccessBorder(1e3),this.showBadge(this.messages.scanSuccess,!0,this.messages.portraitScanned,!0),setTimeout(()=>{this.closeCamera();let e=new A({status:p.RS_SUCCESS,data:this.mrzSideData.processedData,primaryOriginalImage:this.mrzSideData.primaryOriginalImage,primaryDocumentImage:this.mrzSideData.primaryDocumentImage,portraitImage:i});n?.(e),this.currentScanResolver?.(e),this.resetScanningState()},1e3)}}}catch(e){console.warn(`tryPortraitOnSameSide error:`,e)}finally{if(!r&&(this.isProcessingSameSideFrame=!1,this.sameSideMissCount++,!this.areSidesDifferent&&this.sameSideMissCount>=e.SAME_SIDE_MISSES_BEFORE_FLIP)){this.areSidesDifferent=!0;let e=this.config.flipDocumentTimeout??3e3,t=Math.ceil(e/1e3),n=e=>this.messages.flipDocumentCountdown.replace(`{seconds}`,String(e));this.setGuideFrame(`portrait`),this.showFlipAnimation(),this.showGuideSuccessBorder(1e3),this.showBadge(this.messages.scanSuccess,!0,n(t),!1),this.isWaitingForFlip=!0,this.flipCountdownHandle=window.setInterval(()=>{t--,t>0&&this.showBadge(this.messages.scanSuccess,!0,n(t),!1)},1e3),this.flipTimeoutHandle=window.setTimeout(()=>{window.clearInterval(this.flipCountdownHandle),this.flipCountdownHandle=null,this.flipTimeoutHandle=null,this.isWaitingForFlip=!1,this.showBadge(this.messages.scanSuccess,!0,this.messages.flipDocument,!1)},e)}}}async handlePortraitSideScan(t,n){if(this.isProcessingPortraitFrame)return;if(!this.hasHighConfidencePortraitZone()){this.consecutiveStablePortraitFrames=0;return}let r=null;if(this.resources.returnDocumentImage||this.resources.returnPortraitImage){if(r=B(t),r)this.consecutiveStablePortraitFrames++;else if(this.consecutiveStablePortraitFrames=0,this.resources.returnDocumentImage)return;if(this.consecutiveStablePortraitFrames<e.PORTRAIT_STABLE_FRAMES_REQUIRED)return}this.isProcessingPortraitFrame=!0;let i=!1;try{let e=await c.IdentityProcessor.findPortraitZone();if(e&&!e.errorCode&&e.points?.length===4&&this.originalImageData){i=!0,this.isPortraitScanned=!0;let t=this.originalImageData,a=null;if(this.resources.returnDocumentImage&&r)try{let e=V(r,Q,this.originalImageData);a=await c.ImageProcessor.cropAndDeskewImage(this.originalImageData,e),a.toCanvas=()=>(0,c._toCanvas)(a),a.toBlob=async()=>await(0,c._toBlob)(`image/png`,a)}catch(e){console.warn(`Error extracting secondary document image:`,e)}let o=null;try{let t=V(e,Q,this.originalImageData);o=await c.ImageProcessor.cropAndDeskewImage(this.originalImageData,t),o.toCanvas=()=>(0,c._toCanvas)(o),o.toBlob=async()=>await(0,c._toBlob)(`image/png`,o)}catch(e){console.warn(`Error cropping portrait image:`,e)}this.hideFlipAnimation(),this.isSoundFeedbackOn&&c.Feedback.beep(),this.showGuideSuccessBorder(1e3),this.showBadge(this.messages.scanSuccess,!0,this.messages.bothSidesScanned,!0),setTimeout(()=>{this.closeCamera();let e=new A({status:p.RS_SUCCESS,data:this.mrzSideData.processedData,primaryOriginalImage:this.mrzSideData.primaryOriginalImage,secondaryOriginalImage:t,primaryDocumentImage:this.mrzSideData.primaryDocumentImage,secondaryDocumentImage:a,portraitImage:o||this.mrzSideData.portraitImage});n?.(e),this.currentScanResolver?.(e),this.resetScanningState()},1e3)}}catch(e){console.warn(`Error finding portrait on second side:`,e)}finally{i||(this.isProcessingPortraitFrame=!1)}}resetScanningState(){this.hideFlipAnimation(),this.isMRZScanned=!1,this.isPortraitScanned=!1,this.areSidesDifferent=!1,this.isWaitingForFlip=!1,this.isProcessingSameSideFrame=!1,this.isProcessingPortraitFrame=!1,this.consecutiveStablePortraitFrames=0,this.sameSideMissCount=0,this.latestLocalizedTextLines=null,this.flipTimeoutHandle!==null&&(window.clearTimeout(this.flipTimeoutHandle),this.flipTimeoutHandle=null),this.flipCountdownHandle!==null&&(window.clearInterval(this.flipCountdownHandle),this.flipCountdownHandle=null),this.clearPortraitSkipTimer(),this.mrzSideData={processedData:null,primaryOriginalImage:null,primaryDocumentImage:null,portraitImage:null}}hasHighConfidencePortraitZone(){let e=this.latestLocalizedTextLines?.auxiliaryRegionElements;return e?e.some(e=>e.name===`PortraitZone`&&e.confidence>70):!0}validatePortraitLocation(e,t){return!e.points.every(e=>this.isPointInQuadrilateral(e,t))||!t.area||!e.area||e.area===0?!1:t.area/e.area>=ce}isPointInQuadrilateral(e,t){let n=t.points,r=!1;for(let t=0,i=n.length-1;t<n.length;i=t++){let a=n[t].x,o=n[t].y,s=n[i].x,c=n[i].y;o>e.y!=c>e.y&&e.x<(s-a)*(e.y-o)/(c-o)+a&&(r=!r)}return r}},le=new URL(`./mrz-scanner.ui.html`,{}.url).href,ue=new URL(`./mrz-scanner.template.json`,{}.url).href,de={dcvBundle:`/dist/@dynamsoft/dynamsoft-capture-vision-bundle/dist/`,dcvData:`/dist/@dynamsoft/dynamsoft-capture-vision-data/`},fe=`100dvh`,pe=class{showLoadingOverlay(e){let t=this.config.scannerViewConfig?.container;if(!t)throw Error(`Scanner view container not configured`);let n=m(t);if(!n)throw Error(`Scanner view container element not found`);this.loadingScreen=y(n,{message:e}),n.style.display=`block`,n.style.position=`relative`}hideLoadingOverlay(e=!1){let t=m(this.config.scannerViewConfig?.container);t&&this.loadingScreen&&(this.loadingScreen.hide(),this.loadingScreen=null,t.style.display=`none`,e&&this.config?.container&&(m(this.config.container).style.display=`none`))}constructor(e){this.config=e,this.resources={},this.isInitialized=!1,this.isCapturing=!1,this.loadingScreen=null,this.isDynamsoftResourcesLoaded=!1,this.isFileMode=!1,this.isDynamsoftResourcesLoaded||this.initializeDynamsoftResources()}async initialize(){if(this.isInitialized)return{resources:this.resources,components:{scannerView:this.scannerView}};try{if(!this.initializeMRZScannerConfig())return console.error(`Failed to initialize mrz scanner config`),{resources:this.resources,components:{}};h(`dynamsoft-mrz-loading-screen-style`,b),this.showLoadingOverlay(`Loading...`),await this.initializeDCVResources(),this.resources.onResultUpdated=e=>{this.resources.result=e},this.resources.returnOriginalImage=this.config.returnOriginalImage??!1,this.resources.returnDocumentImage=this.config.returnDocumentImage??!0,this.resources.returnPortraitImage=this.config.returnPortraitImage??!0;let e={};return!this.isFileMode&&this.config.scannerViewConfig&&(this.scannerView=new $(this.resources,this.config.scannerViewConfig),e.scannerView=this.scannerView,await this.scannerView.initialize()),this.isInitialized=!0,{resources:this.resources,components:e}}catch(e){this.isInitialized=!1;let t=`Initialization Failed: ${e?.message||e}`;throw console.error(t),Error(t)}finally{this.hideLoadingOverlay(!0)}}initializeDynamsoftResources(){c.CoreModule.engineResourcePaths=g(this.config?.engineResourcePaths)?de:this.config.engineResourcePaths,c.CoreModule.loadWasm(),c.CodeParserModule.loadSpec(`MRTD`),this.isDynamsoftResourcesLoaded=!0}async initializeDCVResources(){try{if(this.isDynamsoftResourcesLoaded||this.initializeDynamsoftResources(),c.LicenseManager._onAuthMessage=e=>e.replace(`(https://www.dynamsoft.com/customer/license/trialLicense?product=unknown&deploymenttype=unknown)`,`(https://www.dynamsoft.com/customer/license/trialLicense?product=mrz&deploymenttype=web)`),await c.LicenseManager.initLicense(this.config?.license||``,{executeNow:!0}),!this.isFileMode){let e=this.config.scannerViewConfig?.cameraEnhancerUIPath,t;if(e)try{t=await fetch(e).then(e=>e.text())}catch(t){console.warn(`Failed to fetch UI from ${e}, using default UI:`,t)}this.resources.cameraEnhancer=await c.CameraEnhancer.createInstance(t),this.resources.cameraView=this.resources.cameraEnhancer}this.resources.cvRouter=await c.CaptureVisionRouter.createInstance(),await c.CaptureVisionRouter.appendDLModelBuffer([`MRZLocalization`,`MRZCharRecognition`,`MRZTextLineRecognition`]);let e=this.config.templateFilePath,t=await this.resources.cvRouter.initSettings(e);if(t?.errorCode!==0)throw Error(`Failed to load template (${t.errorCode}): ${t.errorString}`)}catch(e){let t=typeof e==`string`?e:e?.message??(typeof e==`object`?JSON.stringify(e):String(e)),n=t?.toLowerCase().includes(`license`)?`The MRZ Scanner license is invalid or has expired. Please contact the site administrator to resolve this issue.`:`Resource Initialization Failed: ${t}`;throw console.error(n),Error(n)}}shouldCreateDefaultContainer(){let e=!this.config.container,t=!this.config.scannerViewConfig?.container;return e&&t}createDefaultMRZScannerContainer(){let e=document.createElement(`div`);return e.className=`mrz-scanner-main-container`,Object.assign(e.style,{height:fe,width:`100%`,position:`absolute`,left:`0`,top:`0`,zIndex:`999`}),document.body.append(e),e}checkForTemporaryLicense(e){return!e?.length||e?.startsWith(`A`)||e?.startsWith(`L`)||e?.startsWith(`P`)||e?.startsWith(`Y`)?`DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9`:e}validateViewConfigs(){try{if(this.config.container&&!m(this.config.container)){let e=`Invalid main container reference`;return alert(e),console.error(e),!1}if(this.config.scannerViewConfig?.container&&!m(this.config.scannerViewConfig?.container)){let e=`Invalid scanner view container reference`;return alert(e),console.error(e),!1}}catch(e){let t=`Error accessing container references: ${e instanceof Error?e.message:String(e)}`;return alert(t),console.error(t),!1}return!0}initializeMRZScannerConfig(){if(this.config=this.config??{},!this.validateViewConfigs())return!1;this.shouldCreateDefaultContainer()?this.config.container=this.createDefaultMRZScannerContainer():this.config.container&&(this.config.container=m(this.config.container)??void 0);let e=this.config.container?this.createViewContainers(m(this.config.container)):{},t={license:this.checkForTemporaryLicense(this.config.license),utilizedTemplateNames:Object.fromEntries(Object.values(u).map(e=>[e,this.config.utilizedTemplateNames?.[e]||f[e]])),templateFilePath:this.config?.templateFilePath||ue},n={...this.config.scannerViewConfig,container:e[d.Scanner]||m(this.config.scannerViewConfig?.container)||null,cameraEnhancerUIPath:this.config.scannerViewConfig?.uiPath||this.config.scannerViewConfig?.cameraEnhancerUIPath||le,templateFilePath:t.templateFilePath,utilizedTemplateNames:t.utilizedTemplateNames,enableMultiFrameCrossFilter:this.config.scannerViewConfig?.enableMultiFrameCrossFilter??!0,mrzFormatType:this.config.mrzFormatType};return Object.assign(this.config,{...t,scannerViewConfig:n}),!0}createViewContainers(e){return e.textContent=``,[d.Scanner].reduce((t,n)=>{let r=document.createElement(`div`);return r.className=`mrz-scanner-${n}-view-container`,Object.assign(r.style,{height:`100%`,width:`100%`,display:`none`,position:`relative`}),e.append(r),t[n]=r,t},{})}dispose(){this.scannerView=void 0,this.resources.cameraEnhancer&&(this.resources.cameraEnhancer.dispose(),this.resources.cameraEnhancer=void 0,this.resources.cameraView=void 0),this.resources.cvRouter&&(this.resources.cvRouter.dispose(),this.resources.cvRouter=void 0),this.resources.result=void 0,this.resources.onResultUpdated=void 0;let e=e=>{let t=m(e);t&&(t.style.display=`none`,t.textContent=``)};e(this.config.container),e(this.config.scannerViewConfig?.container),this.isInitialized=!1}async processUploadedFile(e){try{this.showLoadingOverlay(`Processing File...`);let t=this.resources.cvRouter;if(!t)throw Error(`CaptureVisionRouter not initialized`);let n=this.config.utilizedTemplateNames.all,r=await t.getSimplifiedSettings(n);r.roiMeasuredInPercentage=!0,r.roi.points=[{x:0,y:0},{x:100,y:0},{x:100,y:100},{x:0,y:100}],await t.updateSettings(n,r);let i=await H(await t.capture(e,n),{returnDocumentImage:this.resources.returnDocumentImage,returnPortraitImage:this.resources.returnPortraitImage}),a=new A({status:p.RS_SUCCESS,data:i.processedData,primaryOriginalImage:i.imageData,primaryDocumentImage:i.primaryDocumentImage,portraitImage:i.portraitImage});return this.resources.onResultUpdated?.(a),a}catch(e){return console.error(`Failed to process uploaded file:`,e),new A({status:p.RS_FAILED})}finally{this.hideLoadingOverlay(!1)}}async launch(e){if(this.isCapturing)throw Error(`Capture session already in progress`);try{this.isCapturing=!0,this.isFileMode=!!e;let{components:t}=await this.initialize();if(this.config.container&&(m(this.config.container).style.display=`block`),this.isFileMode)return await this.processUploadedFile(e),this.resources.result;if(!t.scannerView&&this.resources.result)return this.resources.result;if(!t.scannerView)throw Error(`Scanner view is required when no previous result exists`);let n=await t.scannerView.launch();return n?.status===p.RS_SUCCESS?this.resources.result:new A({status:n?.status??p.RS_FAILED})}catch(e){let t=e instanceof Error?e.message:String(e);return alert(t),console.error(t),new A({status:p.RS_FAILED})}finally{this.isCapturing=!1,this.dispose()}}},me={MRZScanner:pe,MRZScannerView:$};exports.DEFAULT_TEMPLATE_NAMES=f,Object.defineProperty(exports,`Dynamsoft`,{enumerable:!0,get:function(){return c}}),exports.DynamsoftMRZScanner=me,exports.EnumDocumentSide=l,exports.EnumMRZData=x,exports.EnumMRZScanMode=u,exports.EnumMRZScannerViews=d,exports.EnumResultStatus=p,exports.MRZDataLabel=S,exports.MRZScanner=pe,exports.MRZScannerView=$,exports.displayMRZDate=T;