<?php

namespace App\Http\Controllers\Lms\Settings;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use stdClass;
use App\Http\Controllers\Controller;
use App\Modules\Models\LmsInfo;

use App\Modules\Utils\Utils;

use App\Http\Requests\Lms\Settings\EditSettingsRequest;


class LmsSettingsController extends Controller
{

    protected $redirectTo = 'lms/settings';

    public function getSettings(){

        $settings = $this->getPortalSettings();

        $currenciesArray = $this->getPortalSettings();

        return view('lms.settings.settings')
                        ->with('settings', $settings)
                        ->with('currenciesArray', $currenciesArray);
    }

    public function getPortalSettings()
    {

        $selectedValues = ['topmenuon', 'footeron', 'login', 'state', 'paid', 'currency', 'price'];

        $portalSettings = LmsInfo::select($selectedValues)
                    ->where('user_id', '=', Auth::user()->id)
                    ->first();

   
        if (!$portalSettings) {
            $portalSettings = Utils::getDefaultPortalSettings();

            $selectedPortalSettings = new stdClass();

            foreach ($selectedValues as $key => $value) {
                $selectedPortalSettings->{$value} = $portalSettings->{$value};
            }

            return $selectedPortalSettings;

        }else{

            return json_decode($portalSettings);
        }

    }

    private function getCurrenciesArray()
    {
        $currencies = array();
        $pricingData = config('prices');

        foreach ($pricingData as $key => $value) {
            if (isset($value['currency'])) {
                array_push($currencies, $value['currency']);
            }
        }

        return $currencies;
    }

    public function editSettings(EditSettingsRequest $request){

        //return $request->all();

        $lmsInfo = LmsInfo::firstOrNew(['user_id' => Auth::user()->id]);

        $input = Input::all();
        $lmsInfo->fill($input);
        $lmsInfo->user_id = Auth::user()->id;
        $lmsInfo->save();

        return redirect($this->redirectTo);
                    
    }

}
