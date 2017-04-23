<?php

namespace App\Http\Controllers\User;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use Validator;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\SaveLastWordRequest;
use App\Modules\Models\Alphabet;
use App\Modules\Models\Dictionarys;
use App\Modules\Models\LastWordPositionToUser;
use App\Modules\Models\UserAppSettings;



class UserController extends Controller
{

    public function test(){

        return view('user.test.test')
		        		->with('status', true);
    }


}
