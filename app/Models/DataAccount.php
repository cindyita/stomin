<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataAccount extends Model
{
    use HasFactory;

    protected $table = 'reg_accounts';

    protected $fillable = [
        'id',
        'id_user',
        'id_role',
        'type_account',
        'created_at',
        'updated_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
    public function accountType()
    {
        return $this->belongsTo(InfoTypeAccount::class, 'type_account', 'id');
    }
}
