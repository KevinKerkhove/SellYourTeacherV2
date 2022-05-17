<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Annonce extends Model
{
    use HasFactory;

    protected $fillable = ['title','subject', 'grade', 'description','date','duration','hourly_price', 'professor_id'];

    function inscriptionEtudiant($id){
        $this->student_id = $id;
        $this->save();
    }
}
