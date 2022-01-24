<?php

namespace Modules\Tasks\Requests;

use App\Http\ApiRequest;

class OneRowUserRequest extends ApiRequest
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
            'user_id' => 'required|exists:created_by,id',
        ];
    }
}
