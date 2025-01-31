

window.addEventListener('DOMContentLoaded', ()=>{
    document.querySelector('header').addEventListener('mousedown', ()=>{
      document.querySelector('.sidebar').classList.add('onfocus');
    });
    document.querySelector('header').addEventListener('mouseout',(event)=>{
      if (event.relatedTarget && event.target.contains(event.relatedTarget)){
        return;
      }
        document.querySelector('.sidebar').classList.remove('onfocus');
    });
  });