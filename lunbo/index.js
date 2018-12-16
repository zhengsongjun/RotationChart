
function Carousel($ct){
    this.init($ct)
    this.bind()
    this.autoPlay()
}

Carousel.prototype = {
    init:function($ct){
        //节点获取
        this.$ct = $ct
        this.$imgCt = this.$ct.find('ul.img-ct')
        this.$imgs = this.$ct.find('.img-ct>li')
        this.$preBtn = this.$ct.find('.pre')
        this.$nextBtn = this.$ct.find('.next')
        this.$bullets = this.$ct.find('.bullet>li')
        //初始化数据
        this.imgWidth = this.$imgs.width()
        this.imgCount = this.$imgs.length
        this.index =  0
        this.isAnimate = false
        //添加dom使得完成基本的轮播原理
        this.$imgCt.append(this.$imgs.first().clone())
        this.$imgCt.prepend(this.$imgs.last().clone())
        //设置ul的宽度
        this.$imgCt.width((this.imgCount+2)*this.imgWidth)

        this.$imgCt.css('left',-this.imgWidth)
    },
    bind:function(){
        var _this = this
        this.$preBtn.on('click',function(){
            _this.playPre()
            console.log(_this.index)
        })
        this.$nextBtn.on('click',function(){
            console.log('下一个')
            _this.playNext()
            console.log(_this.index)
        })
        this.$bullets.on('click',function(){
            var index = $(this).index()
            if(_this.index>index){
                _this.playPre(_this.index - index)
            }else{
                _this.playNext(index - _this.index)
            }
        })
        this.$ct.on('mouseover',function(){
            _this.stop()
        })
        this.$ct.on('mouseout',function(){
            _this.autoPlay()
        })

    },
    playNext:function(len){
        var _this = this
        if(_this.isAnimate) return
        _this.isAnimate = true
        if(len){
            this.$imgCt.animate({
                left: '-='+this.imgWidth*len
            },function(){
                _this.index+=len
                if(_this.index === _this.imgCount){
                    _this.$imgCt.css('left',-_this.imgWidth)
                    _this.index = 0
                }
                _this.setBullet()
            _this.isAnimate = false
            })
        }else{
            this.$imgCt.animate({
                left: '-='+this.imgWidth
            },function(){
                _this.index++
                if(_this.index === _this.imgCount){
                    _this.$imgCt.css('left',-_this.imgWidth)
                    _this.index = 0
                }
                _this.setBullet()
            _this.isAnimate = false
            })
        }
    },
    playPre:function(len){
        var _this = this
        if(_this.isAnimate) return
        _this.isAnimate = true
        if(len){
            this.$imgCt.animate({
                left: '+='+this.imgWidth * len
            },function(){
                _this.index-=len
                if(_this.index < 0){
                    _this.$imgCt.css('left',-_this.imgWidth*_this.imgCount)
                    _this.index = _this.imgCount - 1
                }
                _this.setBullet()
                _this.isAnimate = false
            })
        }else{
            this.$imgCt.animate({
                left: '+='+this.imgWidth
            },function(){
                _this.index--
                if(_this.index < 0){
                    _this.$imgCt.css('left',-_this.imgWidth*_this.imgCount)
                    _this.index = _this.imgCount - 1
                }
                _this.setBullet()
                _this.isAnimate = false
            })
        }

    },
    setBullet:function(){
        this.$bullets.eq(this.index).addClass('active')
                      .siblings().removeClass('active')
    },
    autoPlay:function(){
        var _this = this
        this.autoClock = setInterval(function(){
            _this.playNext(1)
        },1500)
    },
    stop:function(){
        var _this=this
        clearInterval(_this.autoClock)
    }
}

$.fn.Carousel = function() {
    $.each(this,function(index,node){

        new Carousel($(node))
    })
}


$('.carousel').Carousel()
