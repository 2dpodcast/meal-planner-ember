App.MealController = Ember.ObjectController.extend({
    needs: ['application'],
    queryParams: ['searchFoodKey'],
    searchFoodKey: false, // must be not false for param to exist!
    // content of this property must be defined during route's model hook!
    searchFieldValue: "",
    searchedFoods: [],
    isLoadingSearch: false,
    visible: function(){
        return this.get('controllers.application').get("currentPath") === "meal.index";
    }.property('controllers.application.currentPath'),

    init: function () {
        console.log("init");
        this._super();
    },

    actions: {
        // you can remove meal in /meal or /meals (but create only in /meals)!
        removeMeal: function () {
            var meal = this.get('model');
            meal.deleteRecord();
            meal.save();
        },

        // transition to searchFood and hide meal table!
        goToSearch: function() {
            this.transitionToRoute('meal.searchFood', {queryParams: {query: null}});
        },

        // transition to searchFood and hide meal table!
        goToMeal: function() {
            this.transitionToRoute('meal');
        }
    }
});