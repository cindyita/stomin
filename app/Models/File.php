<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{

    protected $table = 'reg_files';

    protected $fillable = [
        'id_account',
        'location',
        'name',
        'extension',
        'type_mime',
        'num_order',
        'id_type_file',
        'size',
        'color',
        'favorite',
        'type_share',
        'id_user_add'
    ];
}
