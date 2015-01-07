var App = Ember.Application.create({LOG_TRANSITIONS: true});
App.ApplicationAdapter = DS.FixtureAdapter.extend();  // let app know to use fixtures!

// define URL mappings (use resource for nouns, and routes for adjectives & verbs)!
App.Router.map(function () {
    this.resource('meals');
    this.resource('meal', {path: '/meal/:meal_id'}, function () {
        this.route("searchFood");   //url: /meal/_id/addFood, template: meal/addFood, route name: meal.addFood
    });
    this.resource('contact');
});

App.MealsRoute = Ember.Route.extend({
    // when model is known right fixture will be used?
    model: function () {
        return this.store.find('meal');
    }
});

App.MealRoute = Ember.Route.extend({
    // same query params must be declared in controller!
    queryParams: {
        searchFoodKey: {
            // Opt into full transition?
            refreshModel: true  // default: false
        }
    },

    // override to render two different templates into outlets of two different templates!
    renderTemplate: function() {
        this.render('meal');  // render default

        this.render('mealMobileTitle', {   // the template to render
            into: 'application',                // the template to render into
            outlet: 'mobileTitle',              // the name of the outlet in that template
            controller: 'meal'        // the controller to use for the template
        });
    },

    actions: {
        // expected as bubbled from children!
        removeFood: function (food) {
            var foods = this.modelFor('meal').get("foods");
            foods.removeObject(food);
        },
        addFood: function (food) {
            var foods = this.modelFor('meal').get("foods");
            foods.addObject(food);
        }
    },

    model: function (params) {
        return this.store.find('meal', params['meal_id']);// default implementation!
    },

    /**
     * Only transition.queryParams seems to be receiving updated params when default param value = false,
     * it appears to be emberJS issue!
     * AfterModel is the only method fired both when page first open and on each queryParam change,
     * ( provided refreshModel property of particular queryParam is true).
     */
    afterModel: function (model, transition, queryParams) {
        var ctrl = this.controllerFor("meal");
        var params = transition.queryParams;

        // except when param appears without equal sign!
        if (params.searchFoodKey !== "true") {
            // set search input value!
            ctrl.set('searchFieldValue', params.searchFoodKey);
        }

        // TRIGGER SEARCH!
        if (params.searchFoodKey && params.searchFoodKey.length > 0) {
            ctrl.set("isLoadingSearch", true);
            var promise = new Ember.RSVP.Promise(function (resolve) {
                Ember.run.later(function () {
                    resolve(Ember.$.getJSON('../test/food_data.json'));
                }, 1500);
            });

            promise.then(
                function (resolved) {
                    ctrl.set("isLoadingSearch", false);

                    // TODO: need to convert raw resolved object into model!
                    // TODO: check models/rest adapter docs for the above!
                    debugger
                    // no access to this.store here ... not a good idea to create record here?
                    ctrl.set('searchedFoods', resolved);
                },
                function () {
                    ctrl.set("isLoadingSearch", false);
                }
            );
        }
        else {
            ctrl.set('searchedFoods', []);
        }
    },

    // TODO : replace history ... not to include param changes ;-) !

    // runs only once!
    setupController: function (controller, model) {
        controller.set('model', model);  // default implementation
    }
});

App.MealSearchFoodRoute = Ember.Route.extend({

    // same query params must be declared in controller!
    queryParams: {
        query: {
            // Opt into full transition
            refreshModel: true
        }
    }
    ,
    model: function (params) {
        if (!params.query) {
            return []; // no results;
        }

        //this.controller.send('setSearchField');


        return new Ember.RSVP.Promise(function (resolve) {
            Ember.run.later(function () {
                resolve(Ember.$.getJSON('../test/food_data.json'));
            }, 500);
        });

        //return Ember.$.getJSON('../test/food_data.json');
    }
});

