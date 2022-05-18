<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Annonce;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\Annonce as ResourcesAnnonce;

class AnnonceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Annonce::orderBy('created_at', 'DESC')->get();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function last6()
    {
        return Annonce::where('student_id', null)->orderBy('created_at', 'DESC')->limit(6)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addAnnonce(Request $request, $user_id)
    {
        $annonce = Annonce::create([
            'title' => $request->title,
            'subject' => $request->subject,
            'description' => $request->description,
            'grade' => $request->grade,
            'date' => $request->date,
            'duration' => $request->duration,
            'professor_id' => $user_id,
            'hourly_price' => $request->hourly_price,
        ]);
        $annonce->save();
        $response['status'] = 1;
        $response['message'] = 'Annonce créée avec succès';
        $response['code'] = 200;
    
        return response()->json($response);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Annonce  $annonce
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    { 
        return Annonce::find($id);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Annonce  $annonce
     * @return \Illuminate\Http\Response
     */
    public function show_professor($id)
    { 
        $annonce =  Annonce::find($id);
        return User::find($annonce->professor_id);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Annonce  $annonce
     * @return \Illuminate\Http\Response
     */
    public function show_student($id)
    { 
        $annonce =  Annonce::find($id);
        return User::find($annonce->student_id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Annonce  $annonce
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $annonce = Annonce::find($id);
        if(is_null($annonce)) {
            return response()->json([
                'error' => 'Annonce non trouvée'
            ],404);
        }
        $annonce->update($request->all());
        return response()->json([
            'success' => 'Annonce modifiée avec succès'
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Annonce  $annonce
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $annonce = Annonce::find($id);
        $annonce->delete();
    }

    public function inscription($annonce_id, $user_id){
        $user = User::find($user_id);
        $annonce = Annonce::find($annonce_id);
        if(is_null($annonce)) {
            return response()->json([
                'error' => 'Annonce non trouvée'
            ],404);
        }
        if($user->role_id != 1){
            return response()->json([
                'Forbidden' => 'l\'utilisateur n\'est pas un étudiant'
            ],403);
        }
        else{
            if($annonce->student_id == null) {
                $annonce->student_id = $user->id;
                $annonce->save();
                return response()->json([
                    'success' => 'Inscription à l\'annonce réussi'
                ],200);
            }
            elseif($annonce->student_id == $user->id) {
                $annonce->student_id = null;
                $annonce->save();
                return response()->json([
                    'success' => 'Désinscription de l\'annonce réussi'
                ],200);
            }
        }
    }
}
