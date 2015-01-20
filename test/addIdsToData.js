var prom = Ember.$.getJSON('../test/food_data_full.json');
var array = prom['responseJSON'];


for (var i = 0; i < array.length; i++) {
    console.log("ID added to " + array[i].name, array[i].id = i + 1);
}

var printout = JSON.stringify(array);