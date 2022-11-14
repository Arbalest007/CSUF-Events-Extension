const btn = document.getElementById('btn');

btn.addEventListener('click', function onClick(event) {
  
  var foobarElement = document.getElementById('foobar');
  foobarElement.style.backgroundImage = '';
  foobarElement.style.background = '';
  foobarElement.style.backgroundUrl = '';
  foobarElement.style.backgroundColor = '';

  document.body.style.backgroundColor = 'black';

});