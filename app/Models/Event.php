<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Event extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',
        'description',
        'location',
        'image',
        'user_id',
    ];


    public function User(){
        return $this->belongsTo(User::class,'user_id','id');
    }
    public function event_images(){
        return $this->hasMany(EventImage::class,'event_id','id');
    }
}
