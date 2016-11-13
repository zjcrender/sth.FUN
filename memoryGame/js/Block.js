
(function(){
	
	function Block(src,num){
		this._htmlNode;
		this._frontSide;
		this._backSide;
		this._src = src;
		this._num = num;
		this._isClicked = false;
		this.setElement();
		this.addListenerr();
	}
	
	Block.prototype.setElement = function(){
		this.htmlNode = document.createElement("div");
		this.htmlNode.className = "block";
		this.htmlNode.cons = this;
		this.frontSide = document.createElement("img");
		this.frontSide.src = this.src;
		this.frontSide.className = "frontSide";
		this.backSide = document.createElement("img");
		this.backSide.className = "backSide";
		this.htmlNode.appendChild(this.frontSide);
		this.htmlNode.appendChild(this.backSide);
	}

	Block.prototype.canClick = true;

	Block.prototype.showFrontSide = function(){
		this.turnOver(this.backSide,this.frontSide);
	}
	
	Block.prototype.showBackSide = function(){
		this.turnOver(this.frontSide,this.backSide,true);
	}
	
	Block.prototype.turnOver = function(from,to,jg){
		from.style.transform = "rotateY(90deg)";
		setTimeout(function(){
			from.style.display = "none";
			to.style.display = "block";
			setTimeout(function(){
				to.style.transform = "rotateY(0deg)";
			},20)
		},500)
		if(jg && jg===true) {
			setTimeout(function(){
				this.isClicked = false;
			}.bind(this),1020)
		}
	}
	
	Block.prototype.addListenerr = function(){
		this.htmlNode.onclick = function(){
			if(this.canClick && !this.isClicked){
				this.isClicked = true;
				this.showFrontSide()
			}
		}.bind(this)
	}
	
	Block.prototype.removeHtmlNode = function(){
		this.htmlNode.parentNode.removeChild(this.htmlNode);
	}
	
	
	Object.defineProperty(Block.prototype,"htmlNode",{
		set:function(value){
			this._htmlNode = value;
		},
		get:function(){
			return this._htmlNode;
		}
	});
	
	Object.defineProperty(Block.prototype,"frontSide",{
		get:function(){
			return this._frontSide;
		},
		set:function(value){
			this._frontSide = value;
		}
	});
	
	Object.defineProperty(Block.prototype,"backSide",{
		get:function(){
			return this._backSide;
		},
		set:function(value){
			this._backSide = value;
		}
	});
	
	Object.defineProperty(Block.prototype,"src",{
		get:function(){
			return this._src;
		}
	});
	
	Object.defineProperty(Block.prototype,"isClicked",{
		get:function(){
			return this._isClicked;
		},
		set:function(value){
			this._isClicked = value;
		}
	});
	
	Object.defineProperty(Block.prototype,"num",{
		get:function(){
			return this._num;
		}
	});
	
	
	
	window.Block = Block;
})();
