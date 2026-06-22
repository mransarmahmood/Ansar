<?php

namespace Database\Seeders;

use App\Models\Exam;
use Illuminate\Database\Seeder;

class ExamSeeder extends Seeder
{
    public function run(): void
    {
        $path = database_path('data/exams.json');
        if (! is_file($path)) {
            $this->command?->warn("exams.json not found at {$path}");
            return;
        }

        $json = json_decode(file_get_contents($path), true);
        $exams = $json['exams'] ?? $json;   // accept array or {exams:[]}

        foreach (array_values($exams) as $i => $e) {
            if (empty($e['slug'])) {
                continue;
            }
            Exam::updateOrCreate(
                ['slug' => $e['slug']],
                [
                    'name'       => $e['name'] ?? $e['slug'],
                    'short'      => $e['short'] ?? null,
                    'published'  => true,
                    'sort_order' => $i,
                    'payload'    => $e,
                ]
            );
        }

        $this->command?->info('Seeded ' . count($exams) . ' exams.');
    }
}
