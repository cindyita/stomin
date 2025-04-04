<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InfoTypeFiles extends Model
{

    protected $table = 'info_type_files';

    protected $fillable = [
        'name',
        'extension',
        'type_mime',
        'id_type_level'
    ];
}
