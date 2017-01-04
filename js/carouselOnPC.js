;(function($){
	function carousel(obj){
		var self=this;

		// 默认尺寸属性
		this.setting={
			width:500,
			speed:300,
			autoPlay:false,
			delay:3000
		}

		// 合并用户设置属性
		$.extend(this.setting,$.parseJSON($(obj).attr("data-setting")));

		// 在轮播列表首部加入最后一个轮播图，尾部加入第一个轮播图
		$(obj).find(".carousel-list").prepend($(obj).find(".carousel-item").last().clone());	
		$(obj).find(".carousel-list").append($(obj).find(".carousel-item").eq(1).clone());

		this.nextBtn=$(obj).find(".next-btn");// 上一页按钮
		this.prevBtn=$(obj).find(".prev-btn");// 下一页按钮
		this.carouselList=$(obj).find(".carousel-list");
		this.carouselItems=$(obj).find(".carousel-item");
		this.carousel=$(obj);
		this.carouselBottomBtns=$(obj).find(".bottom-btn-item");
		this.isCarousel=true;// 是否正在轮播
		this.currentPage=1;// 当前页码

		// 设置DOM样式
		this.setSize();

		// 点击左右按钮切换轮播图
		this.nextBtn.on("click",function(){
			// 切换至下一页
			self.turnPage("next");

			
			if(self.currentPage<self.carouselItems.length-2){
				self.currentPage+=1;
			}
			else{
				self.currentPage=1;
			}
			self.carouselBottomBtns.removeClass("selected");
			self.carousel.find(".bottom-btn-item[data-number='"+self.currentPage+"']").addClass("selected");
		});
		this.prevBtn.on("click",function(){
			self.turnPage("prev");
			if(self.currentPage>1){
				self.currentPage-=1;
			}
			else{
				self.currentPage=self.carouselItems.length-2;
			}
			self.carouselBottomBtns.removeClass("selected");
			self.carousel.find(".bottom-btn-item[data-number='"+self.currentPage+"']").addClass("selected");
		});

		// 点击圆点切换轮播图
		this.carouselBottomBtns.on("click",function(){
			self.toPage(this);
		});

		// 自动轮播
		this.timer=setInterval(function(){
			self.autoPlay()
		},self.setting.delay);

		// 鼠标放入停止自动轮播，鼠标移开开始自动轮播
		this.carousel.hover(function(){
			clearInterval(self.timer);
		},function(){
			self.timer=setInterval(function(){
				self.autoPlay()
			},self.setting.delay);
		});
	};
	carousel.prototype={
		// 自动轮播
		autoPlay:function(){
			var self=this;
			if(this.currentPage<this.carouselItems.length-2){
				this.currentPage+=1;
			}
			else{
				this.currentPage=1;
			}
			this.carouselList.animate({left:-self.setting.width*self.currentPage});
			self.carouselBottomBtns.removeClass("selected");
			self.carousel.find(".bottom-btn-item[data-number='"+self.currentPage+"']").addClass("selected");
		},

		// 点击圆点切换轮播图
		toPage:function(obj){
			var self=this;
			this.carouselBottomBtns.removeClass("selected");
			$(obj).addClass("selected");
			this.carouselList.animate({left:-self.setting.width*parseInt($(obj).attr("data-number"))});
		},

		// 点击左右按钮切换轮播
		turnPage:function(direction){
			var self=this;
			if(this.isCarousel){
				// this.isCarousel=false;
				if(direction=="next"){
					// 如果是最后一张
					if(this.carouselList.css("left")==-this.setting.width*(this.carouselItems.length-1)+"px"){
						this.carouselList.css("left",-this.setting.width);
					}

					// 如果是第一张
					else if(this.carouselList.css("left")=="0px"){
						this.carouselList.css("left",-this.setting.width*(this.carouselItems.length-2)+"px");
					};
					this.carouselList.animate({left:-parseInt(this.carouselList.css("left").substring(1,this.carouselList.css("left").length-2))-this.setting.width+"px"},this.setting.speed,function(){
						self.isCarousel=true;
					});
				}
				else if(direction=="prev"){
					// 如果是第一张
					if(this.carouselList.css("left")=="0px"){
						this.carouselList.css("left",-this.setting.width*(this.carouselItems.length-2)+"px");
					}

					// 如果是最后一张
					else if(this.carouselList.css("left")==-this.setting.width*(this.carouselItems.length-1)+"px"){
						this.carouselList.css("left",-this.setting.width);
					};
					this.carouselList.animate({left:-parseInt(this.carouselList.css("left").substring(1,this.carouselList.css("left").length-2))+this.setting.width+"px"},this.setting.speed,function(){
						self.isCarousel=true;
					});
				}
			}
		},

		// 设置DOM样式
		setSize:function(){
			var self=this;
			this.carousel.css("width",this.setting.width);
			this.carouselList.css("left",-this.setting.width);
			this.carouselItems.each(function(){
				$(this).css("width",self.setting.width);
			});
		}
	};

	// 扩展为jQuery功能
	$.fn.extend({
		carouselOnPc:function(){
			$(this).each(function(){
				new carousel(this);
			});
		}
	});
})(jQuery);