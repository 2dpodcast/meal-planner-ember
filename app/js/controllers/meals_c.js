App.MealsController = Ember.ArrayController.extend({
    actions: {
        createMeal: function() {
            // Get the meal title set by the "New Meal" text field
            var title = this.get('newMealTitle'); // get variable from default controller for this template!
            if (!title) { return false; }
            if (!title.trim()) { return; }

            // Create the new Meal model
            var meal = this.store.createRecord('meal', {
                title: title,
                isCompleted: false
            });

            // Clear the "New Meal" text field
            this.set('newMealTitle', '');  // set variable in default controller for this template!

            // Save the new model
            meal.save();
        }
    }
});


