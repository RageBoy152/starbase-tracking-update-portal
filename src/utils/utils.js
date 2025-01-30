export function camelToCapitalized(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/^./, (match) => match.toUpperCase());
}



//    THIS FUNCTION HAS LOGIC ERROR
export function toggleInputGroup(e) {
  // hide all child nodes if hiding
  $(e.currentTarget.parentNode.querySelectorAll('.collapse-content .collapse-content-heading i.bi-dash-square')).toggleClass('bi-plus-square bi-dash-square');
  $(e.currentTarget.parentNode.querySelectorAll('.collapse-content .collapse-content')).filter(':visible').slideUp();
  
  // toggle hide node
  $(e.currentTarget.parentNode.querySelector('.collapse-content')).slideToggle();
  
  // toggle dropdown btn icon
  $(e.currentTarget.querySelector('i')).toggleClass('bi-plus-square bi-dash-square');
}