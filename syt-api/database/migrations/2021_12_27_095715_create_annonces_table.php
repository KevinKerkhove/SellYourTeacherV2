<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnnoncesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('annonces', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->string('subject');
            $table->string('grade');
            $table->string('description');
            $table->date('date');
            $table->string('duration');
            $table->string('hourly_price');
            $table->unsignedBigInteger('professor_id');
            $table->unsignedBigInteger('student_id')->nullable()->default(null);
            $table->foreign('professor_id')->references('id')->on('users');
            $table->foreign('student_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('annonces');
    }
}
