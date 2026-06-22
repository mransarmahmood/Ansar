<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    /** The authenticated student's certificates. */
    public function index(Request $request)
    {
        $certs = $request->user()->certificates()
            ->latest()
            ->get(['id', 'hash', 'holder_name', 'exam_slug', 'exam_title', 'percentage', 'issued_on']);

        return response()->json(['certificates' => $certs]);
    }

    /** Public verification by hash — returns the credential details or 404. */
    public function verify(string $hash)
    {
        $cert = Certificate::where('hash', $hash)->first();

        if (! $cert) {
            return response()->json([
                'valid'   => false,
                'message' => 'No certificate found for this code.',
            ], 404);
        }

        return response()->json([
            'valid'       => true,
            'certificate' => [
                'hash'        => $cert->hash,
                'holder_name' => $cert->holder_name,
                'exam_title'  => $cert->exam_title,
                'percentage'  => $cert->percentage,
                'issued_on'   => $cert->issued_on->toDateString(),
            ],
        ]);
    }

    /** Public PDF download by hash. */
    public function download(string $hash)
    {
        $cert = Certificate::where('hash', $hash)->firstOrFail();

        $pdf = Pdf::loadView('certificates.certificate', ['cert' => $cert])
            ->setPaper('a4', 'landscape');

        return $pdf->download('Ansar-Mahmood-Certificate-' . $cert->hash . '.pdf');
    }
}
