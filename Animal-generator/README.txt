Animals – Web Page
(exercise one "EX1")
Authored by : Mohammad Khayyo
URL Cpanel : mihmadkh.mysoft.jce.ac.il/ex1/
=============================================== last question in exercise (5)  ========================================
:שאלה 5 סעיף 1
 HTTP המנגנון שמשתמשים בו הוא  HTTP response שישלח אותה הלקוח לשרת ,ושרת יענה לו בהודעה  HTTP request  הודעה בצד הלקוח היא  
HTTP The mechanism used is an HTTP response that the client will send to the server, and a server will respond to it with an HTTP request message.
- Send an AJAX request over HTTP to the CPanel server to get the date when the page is first loaded.
The work is done on the server side and the result is sent as an HTTP response. 
The browser then receives the HTTP response and executes the function to display the date on the screen.
- When you click one of the three buttons, an AJAX request is sent over HTTP to the zoo-animal-api server.
The work is done on the server side and the result is sent as an HTTP response. 
Our browser then receives the HTTP response and displays the image and information on the screen.
- Clicking on the image / name sends another AJAX request (like the last two) to the Wikimedia server. 
And the resulting HTTP response (if successful) is displayed on the page.
=========================================================================================
:שאלה 5 סעיף 2
 ##############   בקשה ראשונה  ##############
: לחיצה על  תמונה של חיה
Request URL: http://mihmadkh.mysoft.jce.ac.il/ex1/Sources/get_current_date.php
Request Method: GET
Status: 200 ok
Remote Address: 62.90.88.37:80
-Response Headers:
	Connection: Keep-Alive
	Content-Type: text/html; charset=UTF-8

-Request Headers:
	Accept: */*
	Accept-Encoding: gzip, deflate
	Accept-Language: en-US,en;q=0.9,ar;q=0.8,he;q=0.7
	Connection: keep-alive

 ##############  בקשה שניה  ##############
Request URL: https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/Angolan%20Python/daily/20220308/20220315
Request Method: GET
Status: 404
Remote Address: 91.198.174.192:443

-Response Headers:
	access-control-allow-headers: accept, content-type, content-length, cache-control, accept-language, api-user-agent, if-match, if-modified-since, if-	none-match, dnt, accept-encoding
	access-control-allow-methods: GET,HEAD
	access-control-allow-origin: *
	access-control-expose-headers: etag
	age: 0
	cache-control: private, max-age=0, s-maxage=0, must-revalidate
	content-length: 452
	content-security-policy: default-src 'none'; frame-ancestors 'none'
	content-type: application/problem+json
-Request Headers:
	:authority: wikimedia.org
	:method: GET
	:path: /api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/Angolan%20Python/daily/20220308/20220315
	:scheme: https
	accept: application/json, text/javascript, */*; q=0.01
	accept-encoding: gzip, deflate, br
	accept-language: en-US,en;q=0.9,ar;q=0.8,he;q=0.7
	
######################################## Difference ############################################
The Difference is in Status,content-length,content-type
in content-type in First request we received the text/html information.
in content-type in Second request we received the Json type information, with an error

=======================================Description(my code doing)==================================
The web page displays the details of randomly selected animals, and you can determine their number by pressing one of the buttons that appear on the screen. And this data is obtained from an external database by using AJAX.
By pressing one of the buttons, the name and picture of the animals whose information was previously received will be added to the screen, and their quantity is proportional to the value of the button that was pressed.
If the animal's picture or name is clicked, the data about the chosen animal will appear on the screen, and if clicked again, whether on its name or image, the data about that animal will disappear.

============================================functions:==========================================
ther are 7 functions:
1- SetDate : Take the date from PHP File and store it by ajax.
2- AddAnimals : Make an Ajax call to an array of animals and call the function AddData.
3- AddData : The function adds the name and image of the animals.
4-  details  : The function adds a menu to the selected animal.
5- Onclick  : The function will perform an Ajax reading to know the views of the selected animal.
6- convert_Date : The function changes the format of the date.
7- GetTheLastDate : The function returns the date of a week ago.

==========================================Program Files========================================
1- index.html
2- css/ex1.css
3- js/ex1.js
4- Sources/get_current_date.php
5- README.txt
