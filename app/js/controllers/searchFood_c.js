// pay attention to whether Array or ObjectController is extended!
App.MealSearchFoodController = Ember.Controller.extend({
    queryParams: ['query'],
    query: null,

    actions: {
        search: function () {

            // prevent push to browser history!
            this.replaceRoute({
                queryParams: { query: this.get('queryField') }
            });

            Ember.$('.input-lg').blur(); // hides keyboard on mobile!
        }
    }
});