<?php

namespace Modules\Users\Models;

use Modules\Tasks\Models\Task;
use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class User extends Model implements AuthenticatableContract, AuthorizableContract, JWTSubject
{
    use Authenticatable, Authorizable;

    protected $table = 'users';
    protected $fillable = ['first_name', 'last_name', 'email', 'password', 'gender', 'role'];
    protected $hidden = ['password'];
    protected $appends = ['fullname'];
    protected $with = ['tasks'];


    public function getFullnameAttribute() {
        return $this->first_name . ' ' . $this->last_name;
    }

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

    /**
     * Get User full name.
     *
     * @return array
     */
    public function getName()
    {
        return $this->first_name. ' '. $this->last_name;
    }

    /**
     * Define setter for the password field.
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = app('hash')->make($value);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'user_id', 'id');
    }
}
