App.FoodsSummaryTableComponent = Ember.Component.extend({
    actions: {
        actionIconClick: function (food) {
            console.log("actionIconAction");
            this.sendAction("actionIconAction", food);
        }
    },

    getNutrientSum: function(nutrientName) {
        var sum = this.get('foods').reduce(function (previousValue, food, index) {
            // previous + nutrientValue * grams / 100  (since values is referenced for 100 grams)
            return previousValue + food.get(nutrientName) * food.get('amount')/100;
        }, 0);
        return Math.round(sum*10)/10;
    }
});