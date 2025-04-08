<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{

    protected $table = 'reg_folders';

    protected $fillable = [
        'id_account',
        'location',
        'name',
        'num_order',
        'color',
        'favorite',
        'type_share',
        'id_user_add'
    ];
}
