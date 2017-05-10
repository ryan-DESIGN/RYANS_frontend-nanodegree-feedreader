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
  "use strict";

  let feeds = $('.feed');

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through
         * the allFeeds object and ensures each has a URL defined
         * and that the URL is not empty.
         */
         it("all have a URL property that isn't empty", function() {
           for(var i = 0; i < allFeeds.length; i++) {
             expect(allFeeds[i].url).toBeDefined();
             expect(allFeeds[i].url).not.toBe(null);
           }
         });


        /* A test that loops through
         * the allFeeds object and ensures each has a name defined
         * and that the name is not empty.
         */
         it("all have a name that isn't empty", function() {
           for(var i = 0; i < allFeeds.length; i++) {
             expect(allFeeds[i].name).toBeDefined();
             expect(allFeeds[i].name).not.toBe(null);
           }
         });

    });


    /* Test suite named "The menu" */
    describe("The menu", function() {

        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it("is hidden by default", function() {
           expect($('.menu-hidden').is(':visible')).toBe(true);
         });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          // var menuHidden = true;
          // beforeEach(function() { //Does this get hoisted above the first it() spec?? Why else would it be making "is hidden by default" fail? Yes, just tested and this line is the cause of that failure...
          //   $(".menu-icon-link").click(); //Just put this into each of the specs below, thus excluding the one above from getting clicked.
          //   menuHidden = !menuHidden;
          // });

          it("visibility is turned on by first click", function() {
            $(".menu-icon-link").click();
            expect($('.menu-hidden').is(':visible')).toBe(false);
          });
          it("visibility is turned off by second click", function() {
            $(".menu-icon-link").click();
            expect($('.menu-hidden').is(':visible')).toBe(true);
          });

    });

    /* Test suite named "Initial Entries" */
    describe("Initial Entries", function() {

      beforeEach(function(done) {//`done` Jasmine keyword used to make sure the async loadFeed() is finished before the test runs down below.
        loadFeed(0, done); //Unique style of async function offered by MarkN one of the Udacity coaches.
      });

        /* A test that ensures that when the loadFeed
         * function is called and completes its work there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
      it("has at least one entry after loadFeed has finished working", function(done) {
        expect(feeds.children.length).not.toBe(0);
        done();
      });
    });

    /* Test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {
      /* Test to ensure when a new feed is loaded into .feeds
       * by the loadFeed function that the content of each feed actually changes.
       * Remember, loadFeed() is asynchronous.
       */
       beforeEach(function(done) {
         loadFeed(0, done);
       });

       it("should change content for each new feed", function(done) {//passing in `done` signals to Jasmine that this spec depends on async calls in the beforeEach() before beginning here


          for(var i = 0; i<feeds.children().length; i++ ) {
              expect(feeds.children(i).find('*').innerText).not.toHaveStringSameLengthAs(feeds.children(i+1).find('*').innerText);
              done();
          }
       });
    });

}());

/*
Implement error handling for undefined variables and out-of-bound array access.
*/
