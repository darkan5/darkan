var TopMenu = function() { 
	this.$el = $('.topmenu');
	this.initOnScroll();

	this.$el.removeClass('scrolled');
	this.$el.find('.logo img').attr('src', 'css/img/new_web/logo_white.png');
};

TopMenu.prototype.initOnScroll = function() {
	var _that = this;
	$(document).on('scroll', function(e){_that.onScrolling(e)});
};

TopMenu.prototype.onScrolling = function(e) {
	var scrollValue = $(document).scrollTop();
	var movieContainerHeight = $('.movie-container').height() - 100;
	if (scrollValue >= movieContainerHeight) {
		this.$el.addClass('scrolled');
		this.$el.find('.logo img').attr('src', 'css/img/new_web/logo.png');
	} else {
		this.$el.removeClass('scrolled');
		this.$el.find('.logo img').attr('src', 'css/img/new_web/logo_white.png');
	}
};



(function() {
	var topmenu = new TopMenu();
})();