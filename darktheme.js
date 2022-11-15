const btn = document.getElementById('btn');
let clickState = 0;

btn.addEventListener('click', function onClick(event) {
  
  clickState++;

        if (clickState ==1 ) {
          var foobarElement = document.getElementById('foobar');
          foobarElement.style.backgroundImage = '';
          foobarElement.style.background = '';
          foobarElement.style.backgroundUrl = '';
          foobarElement.style.backgroundColor = '';
        
          document.body.style.backgroundColor = 'black';
          localStorage.setItem('btn', 'black');
        } else if (clickState == 2 ) {
          var foobarElement = document.getElementById('foobar');
          foobarElement.style.backgroundImage = '';
          foobarElement.style.background = '';
          foobarElement.style.backgroundUrl = '';
          foobarElement.style.backgroundColor = '';
        
          document.body.style.backgroundColor = 'brown';
          localStorage.setItem('btn', 'cyan');
        } else if (clickState == 3 ) {
          var foobarElement = document.getElementById('foobar');
          foobarElement.style.backgroundImage = '';
          foobarElement.style.background = '';
          foobarElement.style.backgroundUrl = '';
          foobarElement.style.backgroundColor = '';
        
          document.body.style.backgroundColor = 'green';
          localStorage.setItem('btn', 'green');
        } else if (clickState == 4 ) {
          var foobarElement = document.getElementById('foobar');
          foobarElement.style.backgroundImage = '';
          foobarElement.style.background = '';
          foobarElement.style.backgroundUrl = '';
          foobarElement.style.backgroundColor = '';
        
          document.body.style.backgroundColor = 'rgb(100, 50, 119)';
          localStorage.setItem('btn', 'orange');
        } else if (clickState == 5 ) {
          var foobarElement = document.getElementById('foobar');
          foobarElement.style.backgroundImage = '';
          foobarElement.style.background = '';
          foobarElement.style.backgroundUrl = '';
          foobarElement.style.backgroundColor = '';
        
          document.body.style.backgroundColor = 'rgb(200, 68, 112)';
          localStorage.setItem('btn', 'red');
        } else if (clickState == 6 ) {
          var foobarElement = document.getElementById('foobar');
          foobarElement.style.backgroundImage = '';
          foobarElement.style.background = '';
          foobarElement.style.backgroundUrl = '';
          foobarElement.style.backgroundColor = '';
        
          document.body.style.backgroundColor = 'rgb(80, 20, 122)';
          localStorage.setItem('btn', 'white');
        } else if (clickState == 7 ) {
          var foobarElement = document.getElementById('foobar');
          foobarElement.style.backgroundImage = '';
          foobarElement.style.background = '';
          foobarElement.style.backgroundUrl = '';
          foobarElement.style.backgroundColor = '';
        
          document.body.style.backgroundColor = 'rgb(14, 58, 116)';
          localStorage.setItem('btn', 'blue');
            clickState=0;
        }

});

