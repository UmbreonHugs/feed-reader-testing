/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
// startout with the basics, make sure we have gathered the data
	describe('RSS Feeds', function() {

		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		it('has URL', function(){
			for (let i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].url).toBeDefined(); // must be defined
				expect(allFeeds[i].url).not.toBe(''); // must NOT be blank
			}
		});

		it('has a name', function(){
			for (let i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].name).toBeDefined(); // must be defined
				expect(allFeeds[i].name).not.toBe(''); // must NOT be blank
			}
		});
	});


// check the menu and make sure its hidden by default, and that it works properly
	describe('The menu', function(){

		it('should be hidden by default', function(){
			expect($('body').hasClass('menu-hidden')).toBe(true); // body HAS to have menu-hidden class for it to wokr
		})

		it('should change visibility when the icon is clicked', function(){
			$('.menu-icon-link').trigger('click'); // shows menu on click
			expect($('body').hasClass('menu-hidden')).toBe(false);
			$('.menu-icon-link').trigger('click'); // hides menu on click
			expect($('body').hasClass('menu-hidden')).toBe(true);
		})
	});
// check the entries, make sure it loads properly
	describe('Initial Entries', function(){

		// https://jasmine.github.io/tutorials/async
		it('should contain entries within the feed on load', function(){
			let entryLink = 0;
			beforeEach(function(done){
				entryLink = document.querySelectorAll('.feed .entry'); // selects the entry within the feeds
				loadFeed(1, done);
			});
			expect(entryLink.length).not.toBe(0);
		})
	});
// check the entries, make sure we are able to load it properly upon tab switching
	describe('News Feed Selection', function(){

		// https://jasmine.github.io/tutorials/async
		let firstFeed;
		beforeEach(function(done) {
			loadFeed(0, function(){
				firstFeed = $('.feed article').html(); // store old .feed in a variable
				loadFeed(1, done); // load new one in
			});
		})
		it('update contents', function() {
			expect($('.feed article').html()).not.toEqual(firstFeed);
		});
	});
});
