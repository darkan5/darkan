<?php

namespace App\Http\Controllers\Lms\Elearning;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Modules\Models\Banners;
use App\Modules\Mailer\ContentMailing;

use App\Http\Requests\Lms\Elearning\Message\SendMessageToGroupsRequest;


class LmsPublicationEmailsSenderController extends LmsElearningController
{
    protected $redirectTo = 'lms/elearning/mailing/';

    public function getPublicationGroups($bannerId){

        $course = $this->getPublication($bannerId);

        if(!$course){
           return view('lms.publications.publication_not_exist');
        }

        return view('lms.elearnig.mailing')
                        ->with('course', $course);
    }

    protected function getPublication($bannerId)
    {

        return Banners::where('user_id', '=', Auth::user()->id)
                ->where('id_banner', '=', $bannerId)
                ->first();

    }

    public function sendMessageToGroups($bannerId, SendMessageToGroupsRequest $request){ 

        if(!$this->checkAccessToCourse($bannerId)){
            return view('lms.publications.publication_not_exist');
        }

        $contentMailing = new ContentMailing();

        $course = $this->getPublication($bannerId);

        $users = [];

         if($course->groupContents){

            foreach($course->groupContents as $key => $groupContent){

               $group = $groupContent->group;


                if($group->groupUsers){


                    foreach($group->groupUsers as $groupUser){

                        $user = $groupUser->user;

                        array_push($users, $user);

                        $this->sendEmail($contentMailing, $request, $course, $user);

                    }
                }
            }
        }

        return view('lms.elearnig.mailing_result')
                        ->with('users', $users)
                        ->with('bannerId', $bannerId);

        //return redirect($this->redirectTo . '/mailingresult/' $bannerId);
    }

    private function sendEmail($contentMailing, $request, $banner, $user) {

        $mailData = array(
            'subject' => $request->title,
            'mailContent' => $this->setLinkInMessage($request->message, $banner->path, $user->email)
        );

        $contentMailing->sendMailing($mailData, $user->email);
        
    }

    private function setLinkInMessage($message, $bannerHash, $mail) {

        $bannerLink = str_replace('http://', '', config('app.contentLink')) . $bannerHash . '/mailing';
        
        $linkGet = $bannerLink . '?mh=' . $mail;//$this->encryptMail();

        return str_replace('{LINK}', $linkGet, $message);
    }


    protected function checkAccessToCourse($courseId)
    {
        return Banners::where('user_id', '=', Auth::user()->id)
                ->where('id_banner', '=', $courseId)
                ->first();
    }
}
