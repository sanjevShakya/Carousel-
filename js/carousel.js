;(function(){
	var Carousel = function(index, interval) {

	this.index = index;
	this.interval = interval;
	var carouselWrapper = document.getElementsByClassName('carousel-wrapper')[this.index];
	var imagesWrapper = carouselWrapper.getElementsByClassName('images-wrapper')[0];
	var imageList = imagesWrapper.getElementsByTagName('img');
	var imageCount = 0;
	var maxMargin;
	var minMargin = 0;
	var leftSlideFlag = false; 
	var nIntervalId;
	var bulletList = [];
	var leftArrow = document.createElement('div');
	var rightArrow = document.createElement('div');
	var bulletsContainer = document.createElement('div');
	var bulletArrays = [];
	var activeBackground = "url(images/bullet-active.png)";
	var inactiveBackground = "url(images/bullet-inactive.png)"

	leftArrow.className = "left-arrow";
	rightArrow.className = "right-arrow";
	bulletsContainer.className = "bullets-container";
	carouselWrapper.appendChild(leftArrow);
	carouselWrapper.appendChild(rightArrow);
	carouselWrapper.appendChild(bulletsContainer);

	leftArrow.addEventListener("click",function(){
		clearInterval(nIntervalId);
		leftShift();
	});

	rightArrow.addEventListener("click",function(){
		clearInterval(nIntervalId);
		rightShift();
	});

	for(var i = 0; i < imageList.length; i++) {
		imageList[i].style = 'margin-left:' + (i * 640) + 'px;';
		maxMargin = ( i ) * 640; //maximu margin

		//creating span elements;
	}

	function bulletClicked() {
		for(var i = 0; i < imageList.length; i++) {
			var bullet = document.createElement('span');
			bulletArrays.push(bullet);
			bullet.onclick = (function(num){
				return function() {
					//bullets clicked
					clearInterval(nIntervalId);
					imagesWrapper.style = "margin-left: -"+ (num * 640)+"px";
					imageCount = num;
					clearBullets();
					bulletArrays[num].style.backgroundImage = activeBackground;

				}
			})(i);
			bulletsContainer.appendChild(bullet);
		}
	}

	var updateBullets = function(index) {
		console.log('bulletActive',imageCount);
		clearBullets();
		if(index >= 0 && index < bulletArrays.length){
			bulletArrays[index].style.backgroundImage = activeBackground;
		}
	}

	var clearBullets = function() {
		for(var i =0; i < bulletArrays.length; i++) {
			bulletArrays[i].style.backgroundImage = inactiveBackground;
		}
	}

	function leftShift() {
		var offset = 0;
		var margin = parseInt(getComputedStyle(imagesWrapper).getPropertyValue('margin-left').split('px')[0]);
		imageCount--;
		offset = margin + (imageCount * 640);
		margin -= offset;
		imagesWrapper.style = "margin-left:" +margin+"px;";
		updateBullets(imageCount);
		if(imageCount < 0) {
			imagesWrapper.style ="margin-left: -"+((imageList.length-1) * 640)+"px;";
			imageCount = imageList.length;
			leftSlideFlag = false;		
			holdInterval();
		}
	}

	function rightShift() {
		var offset = 0;
		var margin = parseInt(getComputedStyle(imagesWrapper).getPropertyValue('margin-left').split('px')[0]);
		imageCount++;
		offset = margin + (imageCount * 640);
		margin -= offset;
		imagesWrapper.style = "margin-left:" + margin +"px;";
		updateBullets(imageCount);
		if(imageCount > imageList.length -1) {
			imagesWrapper.style = "margin-left: 0 px;";
			imageCount = 0;
			leftSlideFlag = true;		
			holdInterval();
		}
	}

	function holdInterval() {
		clearInterval(nIntervalId);
		updateBullets(imageCount);
		setTimeout(function(){
			getInterval();
		},2500);
	}

	function getInterval() {
		nIntervalId=setInterval(run,16);
	}

	function leftSlide() {
		if(leftSlideFlag){
			var margin = parseInt(getComputedStyle(imagesWrapper).getPropertyValue('margin-left').split('px')[0]);
			margin =margin - 40;
			imagesWrapper.style = "margin-left:" + margin +"px;";
			if(margin % 640 == 0) {
				imageCount++;
				holdInterval();
				
			}
			if(Math.abs(margin) == maxMargin){
				setTimeout(function(){
					leftSlideFlag = false;	
				},1000);
			}
		}
		
	}

	function rightSlide() {
		if(!leftSlideFlag){
			var margin = parseInt(getComputedStyle(imagesWrapper).getPropertyValue('margin-left').split('px')[0]);		
			margin = margin + 40;
			imagesWrapper.style = "margin-left:" + margin +"px;";
			if(margin % 640 == 0) {
				imageCount--;
				holdInterval();
				
			}
			if(Math.abs(margin) == minMargin){
				setTimeout(function(){
					leftSlideFlag = true;
				},1000);
			}
		}
	}

	function run() {
		leftSlide();
		rightSlide();
	}

	leftSlideFlag = true;
	holdInterval();
	bulletClicked();
	bulletArrays[0].style.backgroundImage = activeBackground;
		
	};

	var numCarouselWrapper = document.getElementsByClassName('carousel-wrapper').length;
	for (var i = 0; i < numCarouselWrapper; i++ ){
		new Carousel(i, 200);
	}
})();
