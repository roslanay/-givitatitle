(function($) {

	var comments = {
		comments: [],
		init: function() {
			this.cacheDom();
			this.bindEvents();
			this.render();
		},
		cacheDom: function() {
			this.$el = $('.comments');
			this.$input = this.$el.find('#comment-username-input');
			this.$textarea = this.$el.find('#comment-body-input');
			this.$button = this.$el.find('.comment-submit-button');
			this.$ul = this.$el.find('.comments-list');
			this.template = this.$el.find('#comment-template').html();
		},
		bindEvents: function() {
			this.$button.on('click', this.addComment.bind(this));
			this.$ul.delegate('.comment-delete-button', 'click', this.deleteComment.bind(this));
		},
		render: function() {
			var data = {
				comments: this.comments,
			};
			this.$ul.html(Mustache.render(this.template, data));
		},
		addComment: function() {
			if ( this.$input.val().length && this.$textarea.val().length ) {
				this.comments.push({
					name: this.$input.val(), 
					body: this.$textarea.val()
				});
				this.render();
				this.$input.val('');
				this.$textarea.val('');
			}
			return false;
		},
		deleteComment: function(e) {
			var $remove = $(e.target).closest('li');
			var i = this.$ul.find('li').index($remove);
			$remove.addClass('leave');
			
			setTimeout(function() {
				comments.comments.splice(i, 1);
				comments.render();
			}, 200);
		}	
	};
	
	comments.init();
	
})(jQuery)