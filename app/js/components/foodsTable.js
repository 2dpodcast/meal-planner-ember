App.FoodsTableComponent = Ember.Component.extend({
    // leave top element as wrapper!
    isLoading: false,  // if unspecified by components user (user object)!
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
    },

    proteinSum: function () {
        return this.getNutrientSum("protein");
    }.property('foods.@each.protein', 'foods.@each.amount'),

    complexSum: function () {
        return this.getNutrientSum("complex");
    }.property('foods.@each.complex', 'foods.@each.amount'),

    sugarSum: function () {
        return this.getNutrientSum("sugar");
    }.property('foods.@each.sugar', 'foods.@each.amount'),

    o3Sum: function () {
        return this.getNutrientSum("o3");
    }.property('foods.@each.o3', 'foods.@each.amount'),

    o6Sum: function () {
        return this.getNutrientSum("o6");
    }.property('foods.@each.o6', 'foods.@each.amount'),

    monoSum: function () {
        return this.getNutrientSum("monoUnsaturated");
    }.property('foods.@each.monoUnsaturated', 'foods.@each.amount'),

    saturatedSum: function () {
        return this.getNutrientSum("saturated");
    }.property('foods.@each.saturated', 'foods.@each.amount')  //key @each instructs to update bindings on enumerable size change!
});