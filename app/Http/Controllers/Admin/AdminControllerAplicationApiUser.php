<?php

namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;



class AdminControllerAplicationApiUser extends AdminControllerAplicationApiAdmin
{
	protected $redirectTo = 'admin/aplicationapiuser';
	protected $accessApiRoleId = 2;

}
