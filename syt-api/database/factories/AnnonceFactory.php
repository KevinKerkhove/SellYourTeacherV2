<?php

namespace Database\Factories;

use App\Models\Annonce;
use Illuminate\Database\Eloquent\Factories\Factory;

class AnnonceFactory extends Factory
{

    protected $model = Annonce::class;
    /**
     *
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence(6, true),
            'subject' => $this->faker->word(),
            'grade' => "lycée",
            'description' => $this->faker->paragraph(1, true),
            'date' => $this->faker->date('Y-m-d', 'now'),
            'duration' => 1,
            'hourly_price' => 10,
            'professor_id' => 2,
            'student_id' => 1,
        ];
    }
}
