<?php

return [
	'go_back' => '&#8592; Powrót',
	'title' => 'Api docs',
	'descriptions' => 'Api docs',
	'PP_INFO_1' => 'Dokumentacja Darkan API',
	'PP_INFO_2' => 'Api docs',
	'GET_YOUR_API_KEY' => 'Potrzebujesz własnego klucza API? Skontaktuj się z nami na <a onclick="smartsupp(\'chat:open\');return false;" class="open-chat">czacie</a>, lub napisz na office@darkan.eu',

	'REST_API_DESC' => 'Dodawaj nowe projekty i publikuj istniejące za pomocą REST API',
	'EDITOR_API_DESC' => 'Otwórz edytor Darkan w osadzonej ramce, wysyłaj i odbieraj zdarzenia',

	'p_1_1' => 'Dokumentacja Darkan API dla edytora',
	'see_demo' => '(zobacz demo)',
	'p_1_2' => 'Wciągamy Darkan API do systemu wklejając linijkę poniżej na swoją stronę:',
	'p_1_3' => 'Dodajemy ramkę (iFrame) na swoją stronę. Będzie to okno edytora projektu w Darkanie.',
	'p_1_4' => 'Testowy klucz API:',
	'p_1_5' => 'Pobieramy postem token i hashujemy nim apikey. Token jest ważny przez 5 min. Tylko podczas generowania tokena podajemy klucz API w postaci niezmodyfikowanej.',
	'p_1_6' => 'Twój klucz api musi zostać zahashowany metodą sha1:',
	'p_1_7' => 'Tworzymy instancję DarkanEditorAPI i ustawiamy dla niej iframe, w którym będzie znajdować się okno edytora. Dostęp do projektu będzie zablokowany jeśli nie zostanie ustawiony klucz API do Darkana. Po ustawieniu klucza API wykonujemy metodę loadProject i podajemy ID naszego projektu.
				Przykład:',
	'p_1_7a' => '<i>// pobieramy element iframe</i>
var darkanIFrame = document.getElementById(\'darkan-iframe\');
<i>// inicjalizujemy obiekt Darkan API</i>
var darkanEditorAPI = DarkanEditorAPI.getInstance();
<i>// ustawiamy naszą ramkę/iframe w API</i>
darkanEditorAPI.setIframe(darkanIFrame);
<i>// wysyłamy klucz API do Darkana, po czym następuje weryfikacja</i>
darkanEditorAPI.setCredentials({ apikey:\'YOUR_HASHED_API_KEY\' });

<i>// wczytaj projekt o danym ID!</i>
darkanEditorAPI.loadProject({ darkanProjectId:35 })',
	'p_1_8' => 'Zdarzenia wysyłane z iFrame z Darkanem można nasłuchiwać w następujący sposób:',
	'p_1_9' => 'Metody do sterowania edytorem z zewnątrz.',
	'p_1_10' => 'Idź do następnej strony',
	'p_1_11' => 'Idź do poprzedniej strony',
	'p_1_12' => 'Idź do strony',
	'p_1_13' => 'Sortuj strony',

	'p_2_1' => 'Dokumentacja Darkan API dla stworzenia nowego projektu',
	'p_2_2' => 'Testowy klucz API:',
	'p_2_3' => 'Pobieramy postem token i hashujemy nim apikey. Token jest ważny przez 5 min. Tylko podczas generowania tokena podajemy klucz API w postaci niezmodyfikowanej.',
	'p_2_4' => 'Twój klucz api musi zostać zahashowany metodą sha1:',
	'p_2_5' => 'Tworzymy projekt przez API.',
	'p_2_6' => '<i>apikey</i> - jest wymagane (musi zostać zahashowana tokenem)</br>
<i>projectName</i> - jest wymagane</br>
<i>action</i> - jest wymagane</br>
<i>dimensions</i> - nie jest wymagane (domyślnie 800x500)</br>
<i>skin</i> - nie jest wymagane (domyślnie “sk00”)</br>
<i>autoScale</i> - nie jest wymagane (domyślnie false)</br>',
	'p_2_7' => 'Liczba na początku (wartość klucza “pid”) oznacza ID projektu stworzonego w Darkanie. Będzie on nam potrzebny przy kolejnych operacjach. W naszym przypadku jest to liczba 35.',


	'p_3_1' => 'Dokumentacja Darkan API dla publikacji projektu',
	'p_3_2' => 'Testowy klucz API:',
	'p_3_3' => 'Pobieramy postem token i hashujemy nim apikey. Token jest ważny przez 5 min. Tylko podczas generowania tokena podajemy klucz API w postaci niezmodyfikowanej.',
	'p_3_4' => 'Twój klucz api musi zostać zahashowany metodą sha1:',
	'p_3_5' => 'Publikujemy projekt przez API.',
	'p_3_6' => '<i>apikey</i> - jest wymagane (musi zostać zahashowana tokenem)</br>
<i>projectId</i> - jest wymagane</br>
<i>action</i> - jest wymagane</br>',
	'p_3_7' => 'W obiekcie można znaleźć takie informacje jak ID publikacji w Darkanie oraz link do pobrania paczki ZIP z gotową publikacją.',
	'p_3_8' => 'Nie można opublikować projektu w którym nie ma żadnej strony, w takim przypadku informacja zwrotna będzie wyglądać tak:'


];