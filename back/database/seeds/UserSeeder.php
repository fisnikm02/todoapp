<?php
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if(DB::table('users')->count()) {
            return;
        }
        DB::table('users')->insert([
            'first_name' => 'Admin',
            'last_name' => 'Admin',
            'email' => 'administrator@email.com',
            'password' => Hash::make('admin2021'),
        ]);
    }
}
