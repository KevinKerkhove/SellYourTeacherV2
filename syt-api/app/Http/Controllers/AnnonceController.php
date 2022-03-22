<?php

namespace App\Http\Controllers;

use App\Http\Resources\Annonce as ResourcesAnnonce;
use App\Models\Annonce;
use Illuminate\Http\Request;

class AnnonceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Annonce::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addAnnonce(Request $request)
    {
        if(Annonce::create($request->all())){
            return response()->json([
                'success' => 'Annonce créée avec succès'
            ],200);
        }
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

    public function inscription($id, $user_id){
        $annonce = Annonce::find($id);
        if($annonce->student_id == null) {
            $annonce->student_id = $user_id;
            $annonce->save();
            return response()->json([
                'success' => 'Inscription à l\'annonce réussi'
            ],200);
        }
       elseif($annonce->student_id == $user_id) {
        $annonce->student_id = null;
        $annonce->save();
        return response()->json([
            'success' => 'Désinscription de l\'annonce réussi'
        ],200);
       }
    }
    
    
}
