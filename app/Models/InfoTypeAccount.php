<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InfoTypeAccount extends Model
{
    use HasFactory;

    protected $table = 'info_type_accounts';

    protected $fillable = [
        'name',
        'total_storage',
        'total_files',
        'max_level_files',
        'total_trash',
        'can_share_open',
        'can_share_private'
    ];

}
