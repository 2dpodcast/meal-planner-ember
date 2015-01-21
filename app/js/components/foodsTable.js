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
            return previousValue + food.get(nutrientName);
        }, 0);
        return Math.round(sum*10)/10;
    },

    proteinSum: function () {
        return this.getNutrientSum("protein");
    }.property('foods.@each.protein'),

    complexSum: function () {
        return this.getNutrientSum("complex");
    }.property('foods.@each.complex'),

    sugarSum: function () {
        return this.getNutrientSum("sugar");
    }.property('foods.@each.sugar'),

    o3Sum: function () {
        return this.getNutrientSum("o3");
    }.property('foods.@each.o3'),

    o6Sum: function () {
        return this.getNutrientSum("o6");
    }.property('foods.@each.o6'),

    monoSum: function () {
        return this.getNutrientSum("monoUnsaturated");
    }.property('foods.@each.monoUnsaturated'),

    saturatedSum: function () {
        return this.getNutrientSum("saturated");
    }.property('foods.@each.saturated')  //key @each instructs to update bindings on enumerable size change!
});