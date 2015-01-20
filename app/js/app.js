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

    // override to render two different templates into outlets of two different templates!
    renderTemplate: function () {
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

    // runs only once!
    setupController: function (controller, model) {
        controller.set('model', model);  // default implementation
    }
});

App.MealSearchFoodRoute = Ember.Route.extend({
    queryParams: {
        query: {
            // Opt into full transition
            refreshModel: true
        }
    },
    model: function(params, transition) {

        var expression = new RegExp(params.query);
        return this.store.filter('food', function(food) {
            // TODO: LATER: figure out efficient way to filter!
            return expression.exec(food.get('name'));
            //return food.get('name') === params.query;
        });
    },
    actions: {
        queryParamsDidChange: function(params) {
            // to update search input value on query change!
            this.controllerFor('mealSearchFood').set('queryField', params.query);
            this.refresh();  // otherwise transition would stop without calling model!
        }
    }
});

