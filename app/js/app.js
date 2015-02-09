var App = Ember.Application.create({
    LOG_TRANSITIONS: true,

    getNutrientSum: function (foods, nutrientName) {
        var sum = foods.reduce(function (previousValue, food, index) {
            // previous + nutrientValue * grams / 100  (since values is referenced for 100 grams)
            return previousValue + food.get(nutrientName) * food.get('amount') / 100;
        }, 0);
        return Math.round(sum * 10) / 10;
    }
});

// let app know to use fixtures!
App.ApplicationAdapter = DS.FixtureAdapter.extend({
    //querying that would normally be done by server!
    queryFixtures: function (records, query, type) {
        return records;
    }
});

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

    // override to render two different templates into outlets of two different templates!
    renderTemplate: function () {
        this.render('meal');  // render default

        this.render('mealMobileLogo', {   // the template to render
            into: 'application',                // the template to render into
            outlet: 'mobileLogo',              // the name of the outlet in that template
            controller: 'meal'        // the controller to use for the template
        });

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
        },

        // transition to searchFood and hide meal table!
        goToMeal: function() {
            this.transitionTo('meal');
        },

        // transition to searchFood and hide meal table!
        goToSearch: function() {
            this.transitionTo('meal.searchFood', {queryParams: {query: null}});
        }
    },

    model: function (params) {
        return this.store.find('meal', params['meal_id']);// default implementation!
    },

    // runs only once per full transition!
    setupController: function (controller, model) {
        controller.set('model', model);  // default implementation
    }
});

App.MealSearchFoodRoute = Ember.Route.extend({
    queryParams: {
        query: {
            // Opt into full transition
            refreshModel: true  // doesn't refresh if route is replaced by config or controller.replaceRoute()!
            //replace: true  // does not replace if there was only param change!
        }
    },
    model: function (params, transition) {
        var expression = new RegExp(params.query);

        // filter() does not contact server(or fixture), until queryParam arg is provided!
        return this.store.filter('food', {query: params.query}, function (food) {
            // regardless what server returns we still filter here!

            // TODO : Ignore case!
            return expression.exec(food.get('name'));
        });
    },

    // runs once per full transition
    setupController: function (controller, model, transition) {
        // update search input value on query change!
        controller.set('queryField', transition.queryParams.query);

        controller.set('model', model);  // default implementation
    },

    actions: {
        queryParamsDidChange: function (params) {
            //entering from another route does not constitute as param change, even though different
            //param might have been set earlier.

            // update search input value on query change!
            this.refresh();  // refresh route to call beforeModel + model + afterModel hooks!
        }
    }
});

