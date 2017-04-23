<?php namespace App\Modules\Library;

use Auth;
	
class LibraryTags 
{


    function __construct() {

        
    }

    public function generateSelect() {

        $tagsArray = array();

        $json = file_get_contents(base_path('js/editors/standard/library/library_tags.json'), 0, null, null);
        $json_d = json_decode($json, true);


        $i = 0;
        foreach ($json_d as $key=>$value) {
            foreach ($value as $key2=>$value2) {
                $tags = explode(' ', $value2['tags']);

                foreach ($tags as $tag) {
                    if (!in_array($tag, $tagsArray)) {
                        $i++;
                        $tagsArray[] = $tag;
                    }
                }
            }
        }

        asort($tagsArray);

        $options = '';

        foreach ($tagsArray as $v) {
            $options .= '<option value="' . $v . '">' . $v . '</option>';
        }

        return $options;

        // echo '<script>var dupcia = '.json_encode($tagsArray).';</script>';
    }

}