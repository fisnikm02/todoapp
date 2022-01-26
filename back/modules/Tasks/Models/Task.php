<?php

namespace Modules\Tasks\Models;

use Modules\Users\Models\User;
use Illuminate\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Task extends Model implements AuthenticatableContract, AuthorizableContract, JWTSubject
{
    use Authenticatable, Authorizable;

    protected $table = 'tasks';
    protected $fillable = ['name', 'image', 'status'];
    protected $hidden = [];
    protected $appends = ['image_url'];
    
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function getImageUrlAttribute() {
        if($this->image)
            return asset('storage/tasks/' . $this->image);
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
