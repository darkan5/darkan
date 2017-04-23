<?php

return [
	'go_back' => '&#8592; Back',
	'title' => 'Api docs',
	'descriptions' => 'Api docs',
	'PP_INFO_1' => 'Darkan API Documentation',
	'PP_INFO_2' => 'Api docs',
	'GET_YOUR_API_KEY' => 'Need your own API key? Contact us on <a onclick="smartsupp(\'chat:open\');return false;" class="open-chat">chat</a>, or at email office@darkan.eu',

	'REST_API_DESC' => 'Add new project and publish it with REST API',
	'EDITOR_API_DESC' => 'Open editor in iframe window, send and receive events',
	
	'p_1_1' => 'Darkan editor docs',
	'see_demo' => '(see demo)',
	'p_1_2' => 'Include Darkan API file as external resource:',
	'p_1_3' => 'Add an iframe to your page. It will be Darkan editor window.',
	'p_1_4' => 'Test API key:',
	'p_1_5' => 'Get token with post request and hash your apikey with it.',
	'p_1_6' => 'Your api key must be hashed using SHA1 method:',
	'p_1_7' => 'Create DarkanEditorAPI instance. Then set iframe as editor container. Access to project will be blocked if you wont send proper (hashed with token) api key. After setting the API key use laodProject method and set project ID. Example:',
	'p_1_7a' => '<i>// get iframe element</i>
var darkanIFrame = document.getElementById(\'darkan-iframe\');
<i>// initialize Darkan API</i>
var darkanEditorAPI = DarkanEditorAPI.getInstance();
<i>// set iframe as editor window</i>
darkanEditorAPI.setIframe(darkanIFrame);
<i>// send hashed API key to Darkan</i>
darkanEditorAPI.setCredentials({ apikey:\'YOUR_HASHED_API_KEY\' });

<i>// load project with darkanProjectId parameter</i>
darkanEditorAPI.loadProject({ darkanProjectId:35 })',
	'p_1_8' => 'Events from Darkan can be listened:',
	'p_1_9' => 'Methods to control the editor from the outside.',
	'p_1_10' => 'Go to next page',
	'p_1_11' => 'Go to the previous page',
	'p_1_12' => 'Go to page by index order',
	'p_1_13' => 'Sort page',

	'p_2_1' => 'How to: add new project',
	'p_2_2' => 'Test API key:',
	'p_2_3' => 'Get new token with POST request and hash your api key with it. Token is valid for 5 minutes. Send your raw api key only when generating a token.',
	
	'p_2_4' => 'Your api key must be hashed using SHA1 method:',
	'p_2_5' => 'Use api to add new project.',
	'p_2_6' => '<i>apikey</i> - required (must be hashed with token)</br>
<i>projectName</i> - required</br>
<i>action</i> - required</br>
<i>dimensions</i> - not required (default 800x500)</br>
<i>skin</i> - not required (default “sk00”)</br>
<i>autoScale</i> - not required (default false)</br>',
	'p_2_7' => 'Value of "pid" is a project ID in Darkan platform. It will be required when we want to open editor in an iframe. In this case it\'s 35.',

	'p_3_1' => 'How to: publish existing project',
	'p_3_2' => 'Test API key:',
	'p_3_3' => 'Get new token with POST request and hash your api key with it. Token is valid for 5 minutes. Send your raw api key only when generating a token.',
	
	'p_3_4' => 'Your api key must be hashed using SHA1 method:',
	'p_3_5' => 'Use api to publish project.',
	'p_3_6' => '<i>apikey</i> - required (must be hashed with token)</br>
<i>projectId</i> - required</br>
<i>action</i> - required</br>',
	'p_3_7' => 'In response you can find informations like publication ID in Darkan and link to download it as zip package.',

	'p_3_8' => '<i>Note: you cannot publish project that has 0 slides. In that case response will look like this:</i>',

];