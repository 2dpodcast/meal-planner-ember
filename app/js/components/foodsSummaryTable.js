App.FoodsSummaryTableComponent = Ember.Component.extend({
    actions: {
        // actions coming directly from component elements!
        tableClickAction: function (food) {
            console.log("tableClickAction");
            this.sendAction("clickAction", food);  // as defined on component declaration!
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