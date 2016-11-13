
(function(){
	var imgs = [];
	var tds = document.querySelectorAll("td");
	var clickNume = 0,doneNum=0,lastBlock;

	function setGameBlocks() {
		for (var i=0,j=tds.length;i<j;i++) {
			var randomNum = Math.floor(Math.random()*imgs.length);
			var block = new Block(imgs[randomNum].src,imgs[randomNum].num);
			tds[i].appendChild(block.htmlNode);
			imgs.splice(randomNum,1);
		}
	}

	function setJGclick() {
		var blocks = document.querySelectorAll("div.block");
		for (var i=0,j=blocks.length;i<j;i++) {
			blocks[i].addEventListener("click",function () {
				if (this.cons.__proto__.canClick) {
					clickNume++;
					switch (clickNume){
						case 1:
							lastBlock = this;
							break;
						case 2:
							if (this==lastBlock){
								clickNume = 1;
								break;
							}
							this.cons.__proto__.canClick = false;
							(function (e1,e2) {
								setTimeout(function () {
									var bl = e1.num===e2.num;
									if(bl) {
										e1.removeHtmlNode();
										e2.removeHtmlNode();
										doneNum++;
										doneNum==10 && (alert("完成"));
										e1.__proto__.canClick = true;
										clickNume=0
									} else{
										e1.showBackSide();
										e2.showBackSide();
										e1.__proto__.canClick = true;
										clickNume=0;
									}
								},1000)
							})(lastBlock.cons,this.cons);
							break;
					}
				}
			})
		}
	}

	function pushImages() {
		for (var i=1,j=tds.length/2;i<=j;i++) {
			var obj = {};
			obj.num = i;
			obj.src = "img/"+i+".jpg";
			imgs.push(obj);
			imgs.push(obj);
		}
	}


	function init() {
		pushImages();
		setGameBlocks();
		setJGclick();
	}

	init();
	
})();
