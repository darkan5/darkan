<?php namespace App\Modules\Editor;

use DB;
use Auth;

class MediaLibrary {

    private $request;

    private $data = array();

    function runSearch($request) {
        $this->request = json_decode($request);

        switch ($this->request->request) {
            case 1:
                $this->load_main();
                break;

            case 2:
                $this->load_icon();
                break;

            case 3:
                $this->copy_image();
                break;

            case 4:
                $this->searchImages();
                break;
        }


        return $this->data;
    }

    private function searchImages() {
        $search = $this->request->search;

        $json = file_get_contents( config('app.libraryPath') . 'library_tags.json', 0, null, null);
        $json_d = json_decode($json, true);

        $k = 0;
        $html = '';
        foreach ($json_d as $key=>$value) {
            foreach ($value as $key2=>$value2) {
                $tags = explode(' ', $value2['tags']);

                if (!empty($search)) {
                    $ok = true;
                    foreach ($search as $tag) {
                        if (!in_array($tag, $tags)) {
                            $ok = false;
                        }
                    }

                    if ($ok) {
                        $k++;
                        $html .= '<div class="avatar-folder" id="avatar-'.$key2.'" style="background-image: url(\'library/' . $key . '/'.$key2.'/thumbnail/'.'mainthumb.png\')" folder-name="'. $key2 .'" folder-lib="' . $key . '"></div>';
                    }
                }
            }
        }

        $i = 0;

        $this->data['html'] = $html;
    }

    private function load_icon() {
        $path1 = $this->request->path1;
        $path2 = $this->request->path2;
        $avatars = '';

        foreach (glob(config('app.libraryPath') . "/$path1/$path2/*") as $filename) {
            $folder = explode('/', $filename);
            $fileNn = explode('.', end($folder));
            if (strtolower(end($fileNn)) == 'png' || strtolower(end($fileNn)) == 'jpg' || strtolower(end($fileNn)) == 'jpeg') {
                if (end($folder) != 'thumbnail') {
                    $avatars .= '<div class="avatar-item" id="avatar-'.end($folder).'" style="background-image: url(\'library/' . $path1 . '/' . $path2  . '/thumbnail/'.end($folder).'.png\')" item-dir="' . $path1 . '/' . $path2 . '/'. end($folder) .'"></div>';
                }
            }
            
        }
        $this->data['html'] = $avatars;
    }

    private function load_main() {
        $path = $this->request->path;

        $avatars ='';
        foreach (glob(config('app.libraryPath') . "/$path/*") as $filename) {
            $folder = explode('/', $filename);
            $avatars .= '<div class="avatar-folder" id="avatar-'.end($folder).'" style="background-image: url(\'library/' . $path . '/'.end($folder).'/thumbnail/'.'mainthumb.png\')" folder-name="'. end($folder) .'" folder-lib="' . $path . '"></div>';
            
        }
        $this->data['html'] = $avatars;
    }
	
}