Ember.Handlebars.helper('roundup', function (value, options) {
    if (value) {
        return value.toString().substring(0, 4);
    }
});

Ember.Handlebars.helper('proteinSum', function (foods, options) {
    return App.getNutrientSum(foods, "protein");
}, '@each.protein', '@each.amount');

Ember.Handlebars.helper('complexSum', function (foods, options) {
    return App.getNutrientSum(foods, "complex");
}, '@each.complex', '@each.amount');

Ember.Handlebars.helper('sugarSum', function (foods, options) {
    return App.getNutrientSum(foods, "sugar");
}, '@each.sugar', '@each.amount');

Ember.Handlebars.helper('o3Sum', function (foods, options) {
    return App.getNutrientSum(foods, "o3");
}, '@each.o3', '@each.amount');

Ember.Handlebars.helper('o6Sum', function (foods, options) {
    return App.getNutrientSum(foods, "o6");
}, '@each.o6', '@each.amount');

Ember.Handlebars.helper('monoSum', function (foods, options) {
    return App.getNutrientSum(foods, "o6");
}, '@each.o6', '@each.amount');

Ember.Handlebars.helper('saturatedSum', function (foods, options) {
    return App.getNutrientSum(foods, "saturated");
}, '@each.saturated', '@each.amount');


Ember.Handlebars.helper('calSum', function (foods, options) {
    return App.getNutrientSum(foods, "calories");
}, '@each.calories', '@each.amount');