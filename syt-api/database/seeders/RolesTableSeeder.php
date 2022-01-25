<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'id' => 1,
            'name' => 'student',
        ]);

        DB::table('roles')->insert([
            'id' => 2,
            'name' => 'professor',
        ]);

        DB::table('roles')->insert([
            'id' => 3,
            'name' => 'admin',
        ]);
    }
}
