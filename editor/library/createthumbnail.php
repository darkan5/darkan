<?php
    $cc = './buttons';

    echo 'Przetwarzanie: ' . $cc;

    function findandcreate($dir)
    {
        //echo 'katalog: '.$dir."<br>";
        // if (file_exists($dir)) echo 'katalog istnieje';
            if (is_dir($dir))
            {
                //echo 'katalog';
                    $objects = scandir($dir);
                    if ($dir == './avatars' || $dir == './backgrounds' || $dir == './clouds' || $dir == './images' || $dir == './shapes' || $dir == './items') {
                        echo 'katalog glowny: '.$dir."<br>";
                    } else {
                        if (!file_exists($dir.'/thumbnail')) {
                            //echo 'brak katalogu z miniaturami'."<br>";
                            mkdir($dir.'/thumbnail');
                            //echo 'katalog: '.$dir."<br>";
                        }
                    }
                    foreach ($objects as $object)
                    {
                        //echo 'test';
                            if ($object != "." && $object != ".." && $object != "thumbnail") {
                                    if (filetype($dir."/".$object) == "dir") {
                                        findandcreate($dir."/".$object);
                                    }
                                    else {
                                        // przerabianie svg
//                                        if (strtolower(end(explode('.', $object))) == 'svg') {
//                                            //echo 'nie ma miniaturki: '.$object;
//                                            $xml = simplexml_load_file($dir.'/'.$object);
//                                            $attr = $xml->attributes();
//                                            //$ret[1] = (string)$attr->width;
//                                            //$ret[2] = (string)$attr->height;
//                                            //echo 'plik: '.$object.' w: '.((string)$attr->width).', h: '.((string)$attr->height)."<br>";
//                                            $new_name = substr($object, 0, strRpos($object, '.')).'.png';
//                                            
//                                            if ((int)$attr->width > (int)$attr->height) {
//                                                //echo 'wieksza szerokosc';
//                                                exec('inkscape -z -e "'.$dir.'/thumbnail/'.$new_name.'.png" -d 300 -w 120 "'.$dir.'/'.$object.'"');
//                                            } else {
//                                                //echo 'wieksza wysokosc';
//                                                exec('inkscape -z -e "'.$dir.'/thumbnail/'.$new_name.'.png" -d 300 -h 120 "'.$dir.'/'.$object.'"');
//                                            }
//                                            
//                                            exec('inkscape -z -e "'.$dir.'/'.$new_name.'" -d 300 -w 1024 "'.$dir.'/'.$object.'"');
//                                            unlink($dir.'/'.$object);
//                                        }
                                        list($width, $height) = getimagesize($dir.'/'.$object);
                                        // echo 'w: ' . $width . ' h: ' . $height . '<br>';

                                        if ($width >= 1000 || $height >= 1000) {
                                            $resize = 'x1000';
                                            if ($width > $height) {
                                                $resize = '1000x';
                                            }

                                            exec('convert -density 300 "'.$dir.'/'.$object.'" -resize ' . $resize .' "'.$dir.'/'.$object.'"');
                                        }
                                        
                                        // przerabianie png
                                        $exploded = explode('.', $object);
                                        $end = end($exploded);
                                        if (strtolower($end) == 'png') {
                                            exec('convert -density 300 "'.$dir.'/'.$object.'" -resize 120x120 "'.$dir.'/thumbnail/'.$object.'.png"');
                                        }

                                        $exploded2 = explode('.', $object);
                                        $end2 = end($exploded2);
                                        if (strtolower($end2) == 'jpg' || strtolower($end2) == 'jpeg') {
                                            exec('convert -density 300 "'.$dir.'/'.$object.'" -resize 120x120 "'.$dir.'/thumbnail/'.$object.'.png"');
                                        }
                                        //exec('convert -density 300 "'.$dir.'/'.$object.'" -resize 120x120 "'.$dir.'/thumbnail/'.$object.'.jpg"');
                                    }
                            }
                    }
                    reset($objects);
                    //rmdir($dir);
            }
    }
    
    findandcreate($cc);
?>
