App.MealController = Ember.ObjectController.extend({
    queryParams: ['searchFoodKey'],
    searchFoodKey: false, // must be not false for param to exist!
    // content of this property must be defined during route's model hook!
    searchFieldValue: "",
    searchedFoods: [],
    isLoadingSearch: false,

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
        }
    }
});