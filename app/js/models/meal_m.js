App.Meal = DS.Model.extend({
    title: DS.attr('string'),
    isCompleted: DS.attr('boolean'),
    foods: DS.hasMany('food', {async: true})
});

App.Meal.FIXTURES = [
    {
        id: 1,
        title: 'irish breakfast 1',
        isCompleted: true,
        foods: [
            2,3,4
        ]
    },
    {
        id: 2,
        title: 'mediterranean Lunch 1',
        isCompleted: false,
        foods: [
            1,2,3,4
        ]
    },
    {
        id: 3,
        title: 'light dinner!',
        isCompleted: false,
        foods: [
            1,2,3,4
        ]
    }
];