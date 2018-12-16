function tab(node){
    this.$node = $(node)
    console.log(this.$node)
    this.$tabTitle = this.$node.find('.tab-title li')
    this.$tabCon = this.$node.find('.tab-con li')
    this.bind()
}

tab.prototype.bind = function($node){
    var _this = this
    _this.$tabTitle.on('click',function(){
        $(this).addClass('active')
                .siblings().removeClass('active')
        _this.$tabCon.eq($(this).index())
                .addClass('active')
                .siblings().removeClass('active')
    })
}

//  var a = new tab('.tab')

 $.fn.tab = function(){
     $.each(this,function(index,node){
        new tab($(node))
     })
 }

 $('.tab').tab()
