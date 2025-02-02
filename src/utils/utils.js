export function camelToCapitalized(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/^./, (match) => match.toUpperCase());
}



//    THIS FUNCTION HAS LOGIC ERROR - collapsing child nodes
export function toggleInputGroup(e) {
  // hide all child nodes if hiding
  // $(e.currentTarget.parentNode.querySelectorAll('.collapse-content .collapse-content-heading i.bi-dash-square')).toggleClass('bi-plus-square bi-dash-square');
  // $(e.currentTarget.parentNode.querySelectorAll('.collapse-content .collapse-content')).filter(':visible').slideUp();
  
  // toggle hide node
  $(e.currentTarget.parentNode.querySelector('.collapse-content')).slideToggle();
  
  // toggle dropdown btn icon
  $(e.currentTarget.querySelector('i')).toggleClass('bi-plus-square bi-dash-square');
}



function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }



export function copyText(text, link) {
  navigator.clipboard.writeText(text);

  $(link).addClass('hover:bg-green-700 bg-green-700');
  $(link).removeClass('hover:text-black hover:bg-white');
  
  delay(1000).then(() => {
    $(link).removeClass('hover:bg-green-700 bg-green-700');
    $(link).addClass('hover:text-black hover:bg-white');
  })
}