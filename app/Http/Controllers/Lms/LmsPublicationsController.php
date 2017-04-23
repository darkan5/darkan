<?php

namespace App\Http\Controllers\Lms;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Modules\Models\Banners;
use App\Modules\Models\Groups;
use App\Modules\Models\LmsGroupContent;
use App\Http\Requests\Lms\Elearning\CoursesToGroup\AddCourseToGroupRequest;
use App\Http\Requests\Lms\Elearning\CoursesToGroup\DeleteCourseFromGroupRequest;

use App\Http\Requests\Lms\Publication\AddNewPublicationRequest;
use App\Http\Requests\Lms\Publication\EditPublicationRequest;
use App\Http\Requests\Lms\Publication\DeletePublicationRequest;

use App\Http\Foundation\Publications\PublicationCreator;

class LmsPublicationsController extends LmsController
{

    use PublicationCreator;

    protected $redirectTo = 'lms/publications';

    public function publications(){


    	$coursesList = $this->getPublications();

        $groupsArray = $this->getGroupsArray();

        return view('lms.publications.publications')
                        ->with('coursesList', $coursesList)
		        		->with('groupsArray', $groupsArray);
    }

    protected function getPublications()
    {

        return Banners::where('user_id', '=', Auth::user()->id)
                ->orWhere('primary', '=', 1)
                ->get();

    }

    protected function getGroupsArray()
    {
        $groupsArray = Groups::select('groups.id', 'groups.name')
                    ->leftJoin('group_user', 'group_user.id_group', '=', 'groups.id')
                    ->where('groups.id_owner', '=', Auth::user()->id)
                    ->pluck('name', 'id');

        return $groupsArray;
    }

    public function addCourseToGroup(AddCourseToGroupRequest $request)
    {

        $group = $this->checkAccessToGroup($request->group_id);
        $course = $this->checkAccessToCourse($request->content_id);

        if($group && $course){

            $lmsGroupContent = LmsGroupContent::where('content_id', '=', $request->content_id)->where('group_id', '=', $request->group_id);

            if(!$lmsGroupContent->first()){
                $input = Input::all();
                $groupUser = new LmsGroupContent($input);
                $groupUser->save();
            }
        }

        return redirect($this->redirectTo);
    }

    public function deleteCourseFromGroup(DeleteCourseFromGroupRequest $request)
    {

        $group = $this->checkAccessToGroup($request->group_id);
        $course = $this->checkAccessToCourse($request->content_id);

        if($group && $course){

            $lmsGroupContent = LmsGroupContent::where('content_id', '=', $request->content_id)->where('group_id', '=', $request->group_id);

            if($lmsGroupContent->first()){
                $lmsGroupContent->delete();
            }
        }

        return redirect($this->redirectTo);
    }


    public function editPublication(EditPublicationRequest $request)
    {
        $course = $this->checkAccessToCourse($request->id_banner); 

        if($course){

            $banner = Banners::find($request->id_banner);

            $input = Input::all();
            $banner->fill($input);
            $banner->save();
        }

        return redirect($this->redirectTo);
    }

    public function deletePublication(DeletePublicationRequest $request)
    {
        $course = $this->checkAccessToCourse($request->id_banner);

        if($course){
            $banner = Banners::find($request->id_banner);

            $this->deletePublicationFiles($banner);

            $banner->delete();

        }

        return redirect($this->redirectTo);
    }
  
}
