<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BillingController;
use App\Http\Controllers\Api\CertificateController;
use App\Http\Controllers\Api\ClientAdminController;
use App\Http\Controllers\Api\InvoiceAdminController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ProposalAdminController;
use App\Http\Controllers\Api\QuotationController;
use App\Http\Controllers\Api\ExamAdminController;
use App\Http\Controllers\Api\ExamAttemptController;
use App\Http\Controllers\Api\ExamController;
use App\Http\Controllers\Api\SlideAdminController;
use App\Http\Controllers\Api\SlideController;
use App\Http\Middleware\EnsureAdmin;
use Illuminate\Support\Facades\Route;

// ── Public auth endpoints ────────────────────────────────────────
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/health', fn () => response()->json(['ok' => true]));

// Public exam catalogue (DB-backed)
Route::get('/exams', [ExamController::class, 'index']);
Route::get('/exams/{slug}', [ExamController::class, 'show']);

// Public hero slides (CMS-managed)
Route::get('/slides', [SlideController::class, 'index']);

// Public page banners (CMS-managed branded heroes, keyed by route)
Route::get('/page-banners', [\App\Http\Controllers\Api\PageBannerController::class, 'index']);

// Public billing — submit a quotation request + view shared invoice/proposal
Route::post('/quotations', [QuotationController::class, 'store']);
Route::get('/invoices/{token}', [BillingController::class, 'showInvoice']);
Route::get('/invoices/{token}/pdf', [BillingController::class, 'invoicePdf']);
Route::get('/invoices/{token}/receipt', [BillingController::class, 'receiptPdf']);
Route::get('/proposals/{token}', [BillingController::class, 'showProposal']);
Route::get('/proposals/{token}/pdf', [BillingController::class, 'proposalPdf']);

// Public certificate verification + PDF download (by hash)
Route::get('/verify/{hash}', [CertificateController::class, 'verify']);
Route::get('/certificates/{hash}/download', [CertificateController::class, 'download']);

// Email verification (signed link from the verification e-mail)
Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])
    ->middleware('signed')->name('verification.verify');

// ── Authenticated (Sanctum bearer token) ─────────────────────────
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Exam attempts (student results)
    Route::get('/attempts', [ExamAttemptController::class, 'index']);
    Route::post('/attempts', [ExamAttemptController::class, 'store']);
    Route::get('/attempts/stats', [ExamAttemptController::class, 'stats']);

    Route::get('/certificates', [CertificateController::class, 'index']);
    Route::post('/email/resend', [AuthController::class, 'resendVerification']);

    // Admin — exam authoring (role: admin)
    Route::middleware(EnsureAdmin::class)->prefix('admin')->group(function () {
        Route::get('/exams', [ExamAdminController::class, 'index']);
        Route::post('/exams', [ExamAdminController::class, 'store']);
        Route::put('/exams/{exam}', [ExamAdminController::class, 'update']);
        Route::delete('/exams/{exam}', [ExamAdminController::class, 'destroy']);

        // Hero slides
        Route::get('/slides', [SlideAdminController::class, 'index']);
        Route::post('/slides', [SlideAdminController::class, 'store']);
        Route::put('/slides/{slide}', [SlideAdminController::class, 'update']);
        Route::delete('/slides/{slide}', [SlideAdminController::class, 'destroy']);
        Route::post('/slides/upload', [SlideAdminController::class, 'upload']);

        // Page banners (CMS-managed branded heroes)
        Route::get('/page-banners', [\App\Http\Controllers\Api\PageBannerController::class, 'adminIndex']);
        Route::post('/page-banners', [\App\Http\Controllers\Api\PageBannerController::class, 'store']);
        Route::put('/page-banners/{page_banner}', [\App\Http\Controllers\Api\PageBannerController::class, 'update']);
        Route::delete('/page-banners/{page_banner}', [\App\Http\Controllers\Api\PageBannerController::class, 'destroy']);
        Route::post('/page-banners/upload', [\App\Http\Controllers\Api\PageBannerController::class, 'upload']);

        // Invoices
        Route::get('/invoices', [InvoiceAdminController::class, 'index']);
        Route::get('/invoices/{invoice}', [InvoiceAdminController::class, 'show']);
        Route::post('/invoices', [InvoiceAdminController::class, 'store']);
        Route::put('/invoices/{invoice}', [InvoiceAdminController::class, 'update']);
        Route::delete('/invoices/{invoice}', [InvoiceAdminController::class, 'destroy']);

        // Proposals
        Route::get('/proposals', [ProposalAdminController::class, 'index']);
        Route::get('/proposals/{proposal}', [ProposalAdminController::class, 'show']);
        Route::post('/proposals', [ProposalAdminController::class, 'store']);
        Route::put('/proposals/{proposal}', [ProposalAdminController::class, 'update']);
        Route::delete('/proposals/{proposal}', [ProposalAdminController::class, 'destroy']);

        // Quotations (inbox)
        Route::get('/quotations', [QuotationController::class, 'index']);
        Route::put('/quotations/{quotation}', [QuotationController::class, 'update']);
        Route::delete('/quotations/{quotation}', [QuotationController::class, 'destroy']);

        // Clients
        Route::get('/clients', [ClientAdminController::class, 'index']);
        Route::post('/clients', [ClientAdminController::class, 'store']);
        Route::put('/clients/{client}', [ClientAdminController::class, 'update']);
        Route::delete('/clients/{client}', [ClientAdminController::class, 'destroy']);

        // Payments + billing summary
        Route::get('/billing/summary', [PaymentController::class, 'summary']);
        Route::post('/invoices/{invoice}/payments', [PaymentController::class, 'store']);
        Route::delete('/invoices/{invoice}/payments/{payment}', [PaymentController::class, 'destroy']);
    });
});
