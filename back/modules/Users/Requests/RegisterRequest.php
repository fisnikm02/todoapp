<?php

namespace Modules\Users\Requests;

use App\Http\ApiRequest;

class RegisterRequest extends ApiRequest
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
            'first_name' => 'required|max:50',
            'last_name' => 'required|max:50',
            'email' => 'required|unique:users,email',
            'password' => 'required|confirmed|min:6|max:100',
            'gender' => 'required|in:m,f',
        ];
    }
}
