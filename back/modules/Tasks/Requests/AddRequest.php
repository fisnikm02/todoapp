<?php

namespace Modules\Tasks\Requests;

use App\Http\ApiRequest;

class AddRequest extends ApiRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * The validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|max:100',
            'description' => 'nullable',
            'image' => 'nullable|mimes:jpg,png',
            'status' => 'required|in:0,1,2',
            'user_id' => 'nullable|exists:users,id,role,user'
        ];
    }
}
