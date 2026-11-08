const dialog=document.querySelector('.testimonial-dialog');
if(dialog){
 let opener;
 document.querySelectorAll('.testimonial-open').forEach(button=>button.addEventListener('click',()=>{
  opener=button;const image=dialog.querySelector('img');image.src=button.dataset.image;image.alt=button.dataset.caption;dialog.querySelector('p').textContent=button.dataset.caption;dialog.showModal();
 }));
 dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>opener?.focus());
}
