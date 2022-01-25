<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        
        DB::table('users')->insert([
            'firstname' => 'student',
            'lastname' => 'student',
            'birthday' => '2000-01-01',
            'email' => 'student@student.com',
            'password' => Hash::make('HAK>f)E.<q5P$jM'),
            'api_token' => Str::random(100),
            'remember_token' => Str::random(10),
            'role_id' => 1,
        ]);

        DB::table('users')->insert([
            'firstname' => 'professor',
            'lastname' => 'professor',
            'birthday' => '1990-01-01',
            'email' => 'professor@professor.com',
            'password' => Hash::make('%MbW<fW4MBha)y3'),
            'api_token' => Str::random(100),
            'remember_token' => Str::random(10),
            'role_id' => 2,
        ]);

        DB::table('users')->insert([
            'firstname' => 'admin',
            'lastname' => 'admin',
            'birthday' => '1990-01-01',
            'email' => 'admin@admin.com',
            'password' => Hash::make('zyQu5M#mC(?!V,z'),
            'api_token' => Str::random(100),
            'remember_token' => Str::random(10),
            'role_id' => 3,
        ]);
    }
}
