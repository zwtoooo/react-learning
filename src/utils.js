
function hasClass(elem, cls) {
  if (elem.classList) {
    return elem.classList.contains(cls);
  }
  cls = cls || '';
  if (cls.replace(/\s/g, '').length === 0) return false; //当cls没有参数时，返回false
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}
 
function addClass(elem, cls) {
  if (elem.classList) {
    elem.classList.add(cls);
    return;
  }
  if (!hasClass(elem, cls)) {
    elem.className = elem.className === '' ? cls : elem.className + ' ' + cls;
  }
}
 
function removeClass(elem, cls) {
  if (elem.classList) {
    elem.classList.remove(cls);
  }
  if (hasClass(elem, cls)) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
      newClass = newClass.replace(' ' + cls + ' ', ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  }
}

module.exports = {
  hasClass,
  addClass,
  removeClass
}
