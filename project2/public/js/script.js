$(document).ready(function() {

console.log("linked");

$(".dropdown-button").dropdown();


$(".button-collapse").sideNav();


$('select').material_select();

$("select[required]").css({display: "block", height: 0, padding: 0, width: 0, position: 'absolute'});

//should pre-select my drop down on update
// $(function() {
//     var cat="sinles";
//     $("#updatecategory").val(cat);
// });

});
