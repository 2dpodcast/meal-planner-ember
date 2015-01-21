// pay attention to whether Array or ObjectController is extended!
App.MealSearchFoodController = Ember.Controller.extend({
    queryParams: ['query'],
    query: null,

    actions: {
        search: function () {
            this.set('query', this.get('queryField'));
            Ember.$('.input-lg').blur(); // hides keyboard on mobile!
        }
    }
});