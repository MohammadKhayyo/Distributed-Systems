let Data_Save = [];
let Date_From_Server = [];
function SetDate() { //Take the date from PHP File and store it by ajax.
    $.ajax({
        type: "GET",
        url: "http://mihmadkh.mysoft.jce.ac.il/ex1/Sources/get_current_date.php",
        timeout: 5000,
        success: function (result) {
            Date_From_Server = result;
            $(".The_Date").html(result);
        },
        error: function (request) { alert(request.statusText) }
    });
}
function AddAnimals(number) { //Make an Ajax call to an array of animals and call the function AddData.
    let URL = "https://zoo-animal-api.herokuapp.com/animals/rand/" + number;
    $.ajax({
        type: "GET",
        url: URL,
        dataType: 'json',
        timeout: 5000,
        success: function (data) {
            AddData(data, number);
        },
        error: function (request) { alert(request.statusText) }
    });
}
function AddData(data, size) { //The function adds the name and image of the animals.
    Data_Save = data;
    $('.Add_Animels').html('<div' + ' class="All_animals">' + '</div>');
    for (let i = 0; i < size; i++) {
        $('.All_animals').append('<div' + ' class="animals_name_img">'
            + '<p id=' + i + ' class="click">' + data[i].name + '</p>' +
            '<img id= ' + i + ' src=' + data[i].image_link + ' class="click">'
            + '<div' + ' class= "details' + i + '">' + '</div>' +
            '</div>');
    }
}
function details(data, number, status, detail_Add) { //The function adds a menu to the selected animal.
    let detail="";
    if(Data_Save[number].animal_type===undefined){
        detail+= '<p>" <div class="title" > "animal type: " </div> </p>';
    }
    else{
        detail+='<p> <div class="title" > ' + "animal type: " +'</div>'+'<div class="answer">'+Data_Save[number].animal_type + '</div>'+'</p>';
    }

    if(Data_Save[number].diet===undefined){
        detail+= '<p> <div class="title" > "diet: " </div> </p>';
    }
    else{
        detail+='<p> <div class="title"> ' + "diet: " +'</div>' +'<div class="answer">'+ Data_Save[number].diet + '</div>'+'</p>';
    }

    if( Data_Save[number].lifespan ===undefined){
        detail+='<p> <div class="title"> "lifespan:" </div> </p>' ;
    }
    else{
        detail+='<p> <div class="title">' + "lifespan: "+'</div>' +'<div class="answer">'+ Data_Save[number].lifespan + " years" + '</div>'+'</p>';
    }

    if(Data_Save[number].length_min===undefined){
        detail+='<p> <div class="title"> "min length: " </div> </p>';
    }
    else{
        detail+='<p> <div class="title">' + "min length: "+ '</div>'+'<div class="answer">'+ (Data_Save[number].length_min*0.3048).toFixed(4) + " Meters" + '</div>'+'</p>';
    }
    if(Data_Save[number].length_max===undefined){
        detail+='<p> <div class="title"> "max length: " </div> </p>';
    }
    else{
        detail+='<p> <div class="title"> ' + "max length: "+'</div>'+ '<div class="answer">'+(Data_Save[number].length_max*0.3048).toFixed(4) + " Meters" + '</div>'+'</p>';
    }
    if(Data_Save[number].weight_min===undefined){
        detail+='<p> <div class="title"> "min weight: " </div> </p>';
    }
    else{
        detail+= '<p> <div class="title"> ' + "min weight: "+'</div>'+ '<div class="answer">'+(Data_Save[number].weight_min * 0.45359237).toFixed(4) + " Kilograms" + '</div>'+'</p>';
    }
    if(Data_Save[number].weight_max===undefined){
        detail+='<p> <div class="title"> "max weight: " </div> </p>';
    }
    else{
        detail+= '<p> <div class="title"> ' + "max weight: " +'</div>'+ '<div class="answer">'+(Data_Save[number].weight_max * 0.45359237).toFixed(4) + " Kilograms" + '</div>'+'</p>';
    }
    if (status === true) {
        let Views = 0;
        for (let i = 0; i < data["items"].length; i++) {
            Views += data["items"][i].views;
        }
        if(Views!==undefined)
            detail += '<p> <div class="title"> ' + "Views: "+'</div>'+'<div class="answer">'+ Views + ' </div>'+' </p>';
        else detail += '<p> <div class="title">' + "Views: " + '</div> </p>';
    }
    else {
        detail += '<p> <div class="title">' + "Views: " + '</div> </p>';
    }
    $(detail_Add).html(detail);
}
function Onclick(button) { //The function will perform an Ajax reading to know the views of the selected animal.
    let LastSevenDay =  GetTheLastDate(7);
    let number = button.target.id;
    let Day =  GetTheLastDate(0);
    let detail_Add = ".details" + number;
    if (button.target && $(detail_Add).html().length===0) {
        let url = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/' + Data_Save[button.target.id].name + '/daily/' + LastSevenDay + '/' + Day;
        $.ajax(url,
            {
                dataType: 'json',
                timeout: 5000,
                success: function (data) {
                    details(data, number, true, detail_Add);
                },
                error: function () {
                    details(undefined, number, false, detail_Add);
                }
            });
    } else if (button.target && $(detail_Add).html().length!==0) {
        $(detail_Add).empty();
    };
}
$(document).ready(function () {
    SetDate();
    $('body').on('click', '.button', function (button) {
        AddAnimals(parseInt(button.target.id));
    });
    $('body').on('click', '.click', function (button) {
        Onclick(button);
    });
});
function convert_Date() { //The function changes the format of the date.
    let date = Date_From_Server.split('/');
    date = date[1] + '/' + date[0] + '/' + date[2];
    return date;
}
function GetTheLastDate(Day){ //The function returns the date of a week ago.
    let Date1=convert_Date();
    Date1 = new Date(Date1);
    Date1.setDate(Date1.getDate() -Day);
    let StringDay = Date1.getFullYear().toString();
    if ((Date1.getMonth() + 1).toString().length < 2) {
        StringDay+='0'+(Date1.getMonth() + 1).toString();
    } else {
        StringDay+=(Date1.getMonth()+1).toString();
    }
    if (Date1.getDate().toString().length<2) {
        StringDay+='0'+Date1.getDate().toString();
    } else {
        StringDay+=Date1.getDate().toString();
    }
    return StringDay;
}