<?php namespace App\Http\Controllers;


use App\User;
use Auth;

class ApiDocs extends Controller {

	/*
	|--------------------------------------------------------------------------
	| Api Dock
	|--------------------------------------------------------------------------
	|
	|
	*/

	public function index()
	{

		return view('api.docs_menu');
	}

	public function getItem($id = 0)
	{
		switch ($id) {
			case 'editor':
				return view('api.docs_editor');
				break;

			case 'rest':
				return view('api.docs_rest');
				break;
			
			default:
				return view('api.docs_menu');
				break;
		}
	}

	

	
}