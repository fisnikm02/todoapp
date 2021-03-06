<?php

namespace Modules\Tasks\Requests;

use App\Http\ApiRequest;

class DeleteRequest extends ApiRequest
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
            'id' => 'required|exists:tasks,id',
        ];
    }
}
