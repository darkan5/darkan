<?php
    require_once '../../../config_login.php';
    // session_set_cookie_params(28800, '/', '.' . $CFG['DOMAIN']);
    // @session_start();
    
    // jesli w zmiennej sesyjnej nie ma zmiennej login to zwroc 'logout' i zakoncz skrypt
    // start
    // if (!isset($_SESSION['login'])) {
    //     if (isset($_GET['t'])) {
    //         $user = '';
    //         $login_id = 0;
    //         $login_id_share = 0;
    //     } else {
    //         echo json_encode('logout');
    //         die();
    //     }
    // } else {
    //     $user = $_SESSION['login'];
    //     $login_id = $_SESSION['login_id'];
    //     $login_id_share = $_SESSION['login_id_share'];
    // }

    if (isset($_GET['project'])) {
        if (gettype((int)$_GET['project']) === 'integer') {
            $project = (int)$_GET['project'];
        } else {
            die('koniec hakierowania');
        }
    } else {
        $project = 0;
    }

    if (SESSION_METHOD::isLogged()) {
        // $user = $_SESSION['login'];
        // $login_id = $_SESSION['login_id'];
        // $login_id_share = $_SESSION['login_id_share'];

        $user = SESSION_METHOD::sessionGet('user_name');

        $login_id = SESSION_METHOD::sessionGet('user_id');
        
        $login_id_share = SESSION_METHOD::sessionGet('user_id');

        if (isset($_GET['project'])) {
            if (gettype((int)$_GET['project']) === 'integer') {
                $project = (int)$_GET['project'];
            } else {
                $project = 0;
            }
        } else {
            $project = 0;
        }

        $realProjectUID = getProjectUserId($project);
    } else {
        if (isset($_GET['t'])) {
            $user = '';
            $login_id = 0;
            $login_id_share = 0;
        } else {
            echo json_encode('logout');
            die();
        }

        $realProjectUID = 0;
    }
    // end

    
    // if (!SESSION_METHOD::isLogged()) {
    //     echo json_encode('logout');
    //     die();
    // }

    // $user = SESSION_METHOD::sessionGet('user_name');

    // if (isset($_GET['project'])) {
    //     if (gettype((int)$_GET['project']) === 'integer') {
    //         $project = (int)$_GET['project'];
    //     } else {
    //         die('koniec hakierowania');
    //     }
    // } else {
    //     $project = 0;
    // }

//    $sql_conn = mysql_connect($address_db, $user_db, $passwd_db);
//    mysql_select_db($database_db);
    
    // start
    // $login_id = SESSION_METHOD::sessionGet('user_id');
    
    // $login_id_share = SESSION_METHOD::sessionGet('user_id');

    // $realProjectUID = getProjectUserId($project);
    // end
    
//    $zapytanie1 = "SELECT * FROM `share` WHERE `project_id`='$project' AND `user_id`='$login_id'";
//    $idzapytania1 = mysql_query($zapytanie1);
//    if (!$idzapytania1) echo 'MySQL error: '.mysql_error();
//    if ($data_share = mysql_fetch_row($idzapytania1))
//    {
//        $zapytanie2 = "SELECT * FROM `projects` JOIN `users` WHERE `project_id`='$project' AND `projects`.`user_id`=`users`.`user_id`";
//        $idzapytania2 = mysql_query($zapytanie2);
//        if (!$idzapytania2) echo 'MySQL error: '.mysql_error();
//        if ($data_share_user = mysql_fetch_assoc($idzapytania2)) {
//            $user = $data_share_user['login'];
//        }
//    }
    // uaktualnianie danych w tabeli users_online
    
    /*$zapytanie2 = "SELECT * FROM `users_online` WHERE `project_id`='$project_id' AND `user_id`='$login_id'";
    $idzapytania2 = mysql_query($zapytanie2);
    if (!$idzapytania2) echo 'MySQL error: '.mysql_error();
    if ($data_user = mysql_fetch_row($idzapytania2)) {
        $id_p = $data_user[0];
        $zapytanie3 = "UPDATE `users_online` SET `page`='1', `date`=NOW() WHERE `id`='$id_p'";
        $idzapytania3 = mysql_query($zapytanie3);
        if (!$idzapytania3) echo 'MySQL error: '.mysql_error();
    }*/
    
//    mysql_close($sql_conn);
    //echo 'user: '.$user;
    
    //$user = 'mscislaw';
    //$project = '1';
    
    // prefix musi zaczynac sie od '../'
    $prefix = '../projects/';
    
    $path_pdf = $realProjectUID.'/'.$project.'/pdf/';
    $path_image = $realProjectUID.'/'.$project.'/pre/images/';
    $path_swf = $realProjectUID.'/'.$project.'/pre/swf/';
    $path_png = $realProjectUID.'/'.$project.'/pre/imgpages/';
    $path_gallery = $realProjectUID.'/'.$project.'/pre/gallery/';
    $path_audio = $realProjectUID.'/'.$project.'/pre/audio/';
    $sitemap_path = $realProjectUID.'/'.$project.'/sitemap/map.json';
    $sitemaps_path = $realProjectUID.'/'.$project.'/sitemap/';
    $path_project = $realProjectUID.'/'.$project.'/';
?>
