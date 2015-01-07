// pay attention to whether Array or ObjectController is extended!
App.MealSearchFoodController = Ember.Controller.extend({
    queryParams: ['query'],
    query: null,

    init: function() {
      console.log("init")
    },

    actions: {
        searchFoods: function () {
            var url = '../test/food_data.json';

            var foods = DS.PromiseArray.create({
                promise: $.getJSON(url)
            });

            this.set('foodSearch.foods', foods);
            this.set('searchedFoodTitle', '');   // Clear the "New Meal" text field
        },

        addFoodToMeal: function () {
            var meal = this.store.find('meal' /* , meal Id */);

            // this should come from action argument in template!
            var foodToAdd = this.store.createRecord('food', this);
        }

    }
});