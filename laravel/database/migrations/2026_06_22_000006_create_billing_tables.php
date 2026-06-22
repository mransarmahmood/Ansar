<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('number', 40)->unique();
            $table->string('share_token', 40)->unique();
            $table->string('title')->nullable();
            $table->string('company')->nullable();
            $table->string('bill_to_name')->nullable();
            $table->string('company_address')->nullable();
            $table->string('company_email')->nullable();
            $table->string('phone', 60)->nullable();
            $table->date('invoice_date')->nullable();
            $table->date('due_date')->nullable();
            $table->string('currency', 8)->default('USD');
            $table->decimal('vat_percent', 5, 2)->default(0);
            $table->json('line_items');        // [{description, qty, unitPrice}]
            $table->text('notes')->nullable();
            $table->text('terms')->nullable();
            $table->string('status', 20)->default('draft'); // draft|sent|paid|void
            $table->timestamps();
        });

        Schema::create('proposals', function (Blueprint $table) {
            $table->id();
            $table->string('number', 40)->unique();
            $table->string('share_token', 40)->unique();
            $table->string('title')->nullable();
            $table->string('company_name')->nullable();
            $table->string('contact_name')->nullable();
            $table->string('company_address')->nullable();
            $table->string('company_email')->nullable();
            $table->string('phone', 60)->nullable();
            $table->date('proposal_date')->nullable();
            $table->string('subject')->nullable();
            $table->longText('body')->nullable();          // narrative (sections)
            $table->json('line_items')->nullable();        // optional pricing
            $table->string('currency', 8)->default('USD');
            $table->text('terms')->nullable();
            $table->string('status', 20)->default('draft'); // draft|sent|accepted|declined
            $table->timestamps();
        });

        Schema::create('quotations', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('company')->nullable();
            $table->string('email')->nullable();
            $table->string('mobile', 60)->nullable();
            $table->string('service_required')->nullable();
            $table->text('notes')->nullable();
            $table->string('status', 20)->default('new'); // new|in-review|responded|closed
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quotations');
        Schema::dropIfExists('proposals');
        Schema::dropIfExists('invoices');
    }
};
