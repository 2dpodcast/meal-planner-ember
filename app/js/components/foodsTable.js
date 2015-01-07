App.FoodsTableComponent = Ember.Component.extend({
    // leave top element as wrapper!
    isLoading:false,  // if unspecified by components user (user object)!
    actions: {
        actionIconClick: function (food) {
            console.log("actionIconAction");
            this.sendAction("actionIconAction", food);
        }
    }
});