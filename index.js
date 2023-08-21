


var cards = document.getElementsByClassName('card1');
var buttons = document.getElementsByClassName('button-33');

for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener("mouseover", function() {
    var button = this.querySelector('.button-33');
    if (button) {
      button.style.display = "block";
    }
  });

  cards[i].addEventListener("mouseout", function() {
    var button = this.querySelector('.button-33');
    if (button) {
      button.style.display = "none";
    }
  });
}




function atvImg(){
	var d = document,
		de = d.documentElement,
		bd = d.getElementsByTagName('body')[0],
		htm = d.getElementsByTagName('html')[0],
		win = window,
		imgs = d.querySelectorAll('.atvImg'),
		totalImgs = imgs.length,
		supportsTouch = 'ontouchstart' in win || navigator.msMaxTouchPoints;

	if(totalImgs <= 0){
		return;
	}

	for(var l=0;l<totalImgs;l++){

		var thisImg = imgs[l],
			layerElems = thisImg.querySelectorAll('.atvImg-layer'),
			totalLayerElems = layerElems.length;

		if(totalLayerElems <= 0){
			continue;
		}

		while(thisImg.firstChild) {
			thisImg.removeChild(thisImg.firstChild);
		}
	
		var containerHTML = d.createElement('div'),
			shineHTML = d.createElement('div'),
			shadowHTML = d.createElement('div'),
			layersHTML = d.createElement('div'),
			layers = [];

		thisImg.id = 'atvImg__'+l;
		containerHTML.className = 'atvImg-container';
		shineHTML.className = 'atvImg-shine';
		shadowHTML.className = 'atvImg-shadow';
		layersHTML.className = 'atvImg-layers';

		for(var i=0;i<totalLayerElems;i++){
			var layer = d.createElement('div'),
				imgSrc = layerElems[i].getAttribute('data-img');

			layer.className = 'atvImg-rendered-layer';
			layer.setAttribute('data-layer',i);
			layer.style.backgroundImage = 'url('+imgSrc+')';
			layersHTML.appendChild(layer);

			layers.push(layer);
		}

		containerHTML.appendChild(shadowHTML);
		containerHTML.appendChild(layersHTML);
		containerHTML.appendChild(shineHTML);
		thisImg.appendChild(containerHTML);

		var w = thisImg.clientWidth || thisImg.offsetWidth || thisImg.scrollWidth;
		thisImg.style.transform = 'perspective('+ w*3 +'px)';

		if(supportsTouch){
			win.preventScroll = false;

	        (function(_thisImg,_layers,_totalLayers,_shine) {
				thisImg.addEventListener('touchmove', function(e){
					if (win.preventScroll){
						e.preventDefault();
					}
					processMovement(e,true,_thisImg,_layers,_totalLayers,_shine);		
				});
	            thisImg.addEventListener('touchstart', function(e){
	            	win.preventScroll = true;
					processEnter(e,_thisImg);		
				});
				thisImg.addEventListener('touchend', function(e){
					win.preventScroll = false;
					processExit(e,_thisImg,_layers,_totalLayers,_shine);		
				});
	        })(thisImg,layers,totalLayerElems,shineHTML);
	    } else {
	    	(function(_thisImg,_layers,_totalLayers,_shine) {
				thisImg.addEventListener('mousemove', function(e){
					processMovement(e,false,_thisImg,_layers,_totalLayers,_shine);		
				});
	            thisImg.addEventListener('mouseenter', function(e){
					processEnter(e,_thisImg);		
				});
				thisImg.addEventListener('mouseleave', function(e){
					processExit(e,_thisImg,_layers,_totalLayers,_shine);		
				});
	        })(thisImg,layers,totalLayerElems,shineHTML);
	    }
	}

	function processMovement(e, touchEnabled, elem, layers, totalLayers, shine){

		var bdst = bd.scrollTop || htm.scrollTop,
			bdsl = bd.scrollLeft,
			pageX = (touchEnabled)? e.touches[0].pageX : e.pageX,
			pageY = (touchEnabled)? e.touches[0].pageY : e.pageY,
			offsets = elem.getBoundingClientRect(),
			w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth,
			h = elem.clientHeight || elem.offsetHeight || elem.scrollHeight,
			wMultiple = 320/w,
			offsetX = 0.52 - (pageX - offsets.left - bdsl)/w,
			offsetY = 0.52 - (pageY - offsets.top - bdst)/h,
			dy = (pageY - offsets.top - bdst) - h / 2,
			dx = (pageX - offsets.left - bdsl) - w / 2,
			yRotate = (offsetX - dx)*(0.07 * wMultiple),
			xRotate = (dy - offsetY)*(0.1 * wMultiple),
			imgCSS = 'rotateX(' + xRotate + 'deg) rotateY(' + yRotate + 'deg)',
			arad = Math.atan2(dy, dx),
			angle = arad * 180 / Math.PI - 90;

		if (angle < 0) {
			angle = angle + 360;
		}

		if(elem.firstChild.className.indexOf(' over') != -1){
			imgCSS += ' scale3d(1.07,1.07,1.07)';
		}
		elem.firstChild.style.transform = imgCSS;
		
		shine.style.background = 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + (pageY - offsets.top - bdst)/h * 0.4 + ') 0%,rgba(255,255,255,0) 80%)';
		shine.style.transform = 'translateX(' + (offsetX * totalLayers) - 0.1 + 'px) translateY(' + (offsetY * totalLayers) - 0.1 + 'px)';	

		var revNum = totalLayers;
		for(var ly=0;ly<totalLayers;ly++){
			layers[ly].style.transform = 'translateX(' + (offsetX * revNum) * ((ly * 2.5) / wMultiple) + 'px) translateY(' + (offsetY * totalLayers) * ((ly * 2.5) / wMultiple) + 'px)';
			revNum--;
		}
	}

	function processEnter(e, elem){
		elem.firstChild.className += ' over';
	}

	function processExit(e, elem, layers, totalLayers, shine){

		var container = elem.firstChild;

		container.className = container.className.replace(' over','');
		container.style.transform = '';
		shine.style.cssText = '';
		
		for(var ly=0;ly<totalLayers;ly++){
			layers[ly].style.transform = '';
		}

	}

}

atvImg();






// Open the modal for the specific button
function OpenModal(buttonNumber) {
	
  var modal = document.getElementById("modal-" + buttonNumber);
  modal.style.display = "block";
}
function OpenModal1(buttonNumber) {
	
  var element = document.getElementById("modal-" + buttonNumber);
  element.style.display = 'inline-block'; // Show the element
  setTimeout(function() {
    element.style.transform = 'translate(-50%, -50%) scale(1)'; // Scale to 1 after a short delay
  }, 10);
}


// Close the modal for the specific button
// function closeModal(buttonNumber) {
//   var modal = document.getElementById("modal-" + buttonNumber);
//   modal.style.display = "none";
// }
function closeModal(buttonNumber) {
	console.log("Closing modal: " + buttonNumber);
	var modal = document.getElementById("modal-" + buttonNumber);
	console.log("Modal element found: " + modal);
	
	if (modal) {
	  modal.style.display = "none";
	  console.log("Modal closed successfully.");
	} else {
	  console.log("Modal element not found or null.");
	}
  }
  

  const slideTrack = document.querySelector('.slide-track');

let scrollAmount = 0;
let scrollStep = 250; // Adjust the step value as needed
let isAnimating = true;



slideTrack.addEventListener('animationstart', () => {
  isAnimating = true;
});

slideTrack.addEventListener('animationiteration', () => {
  isAnimating = false;
  scrollAmount = 0;
});

slideTrack.addEventListener('animationend', () => {
  isAnimating = false;
});

// Pause the animation on hover
slideTrack.addEventListener('mouseover', () => {
  slideTrack.style.animationPlayState = 'paused';
    isAnimating = false;

});

// Resume the animation on mouseout
slideTrack.addEventListener('mouseout', () => {
  slideTrack.style.animationPlayState = 'running';
  isAnimating = true;

});


const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});


  function handleSubmit() {


var name = document.getElementById("name").value;
var email= document.getElementById("email").value;
var address = document.getElementById("address").value;
var phone = document.getElementById("phone").value;
var issue = document.getElementById("issue").value;

var httpr=new XMLHttpRequest();
httpr.open("POST","./ajax/send_db.php",true);
httpr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpr.onreadystatechange=function(){
	if(httpr.readyState==4 && httpr.status==200 )
	{
		alert('Thank you for contacting us.');
	}
}
httpr.send("name=" + name + "&email=" + email + "&phone=" + phone + "&address=" + address + "&issue=" + issue);


 
}
        // function updateServiceCount() {
        //     // Make an AJAX call to the PHP file to fetch the count
		// 	console.log('hello')
        //     fetch('get_service_count.php')
        //         .then(response => response.json())
        //         .then(data => {
        //             // Update the content of the <h3> element with the fetched count
        //             document.getElementById('serviceCount').textContent = data.serviceCount;
        //         })
        //         .catch(error => {
        //             console.error('Error fetching service count:', error);
        //         });
        // }

        // // Update the service count every 5 seconds (you can adjust this interval as needed)
        // setInterval(updateServiceCount, 10);
