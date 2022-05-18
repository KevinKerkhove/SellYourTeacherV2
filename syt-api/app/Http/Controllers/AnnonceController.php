<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Annonce;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\Annonce as ResourcesAnnonce;
use DateTime;

class AnnonceController extends Controller
{
    /**
     * Retourne la liste des annonces pour lesquelles aucun étudiant est inscrit, avec une date supérieur ou égale à la date courante, trier dans par date de création décroissant
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $current_date = new DateTime();
        return Annonce::where('student_id', null)->where('date','>=',date('Y-m-d', $current_date->getTimestamp()))->orderBy('created_at', 'DESC')->get();
    }

    /**
     * Récupère la liste des annonces avec un étudiant inscrit, d'un utilisateur donné en paramètre
     *
     * @return \Illuminate\Http\Response
     */
    public function user_annonce_complete($id)
    {
        return Annonce::where('student_id','!=',null)->where('professor_id',$id)->orWhere('student_id', $id)->where('student_id','!=',null)->orderBy('created_at', 'DESC')->get();
    }

    /**
     * écupère la liste des annonces sans étudiant inscrit, d'un utilisateur donné en paramètre
     *
     * @return \Illuminate\Http\Response
     */
    public function user_annonce_empty($id)
    {
        return Annonce::where('professor_id',$id)->Where('student_id', null)->orderBy('created_at', 'DESC')->get();
    }

    /**
     * Récupère les 6 dernières annonce qui ont été créer pour lesquelles aucun étudiant et inscrit
     *
     * @return \Illuminate\Http\Response
     */
    public function last6()
    {
        $current_date = new DateTime();
        return Annonce::where('date','>=',date('Y-m-d', $current_date->getTimestamp()))->where('student_id', null)->orderBy('created_at', 'DESC')->limit(6)->get();
    }

    /**
     * Créer une nouvelle annonce avec le professeur donnée en paramètre
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
     * Affiche une l'annonce donnée en paramètre
     *
     * @param  \App\Models\Annonce  $annonce
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    { 
        return Annonce::find($id);
    }

    /**
     * Affiche le professeur de l'annonce donnée en paramètre
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
     * Affiche l'étudiant de l'annonce donnée en paramètre
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
     * Modifie l'annonce donnée en paramètre
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
     * Supprime l'annonce donnée en paramètres
     *
     * @param  \App\Models\Annonce  $annonce_id
     * @param  \App\Models\User  $user_id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $annonce = Annonce::find($id);
        $annonce->delete();
    }

    /**
     * Inscrit un étudiant à une annonce
     *
     * @param  \App\Models\Annonce  $annonce
     * @return \Illuminate\Http\Response
     */
    public function inscription($annonce_id, $user_id){
        $user = User::find($user_id);// récupère l'utilisateur
        $annonce = Annonce::find($annonce_id); // récupère l'annonce
        if(is_null($annonce)) {// si l'annonce n'existe pas on retourne 404
            return response()->json([
                'error' => 'Annonce non trouvée'
            ],404);
        }
        if($user->role_id != 1){// si l'utilisateur n'est pas un étudiant
            return response()->json([
                'Forbidden' => 'l\'utilisateur n\'est pas un étudiant'
            ],403);
        }
        else{
            if($annonce->student_id == null) {// si aucun étudiant n'est inscrit, on l'inscrit
                $annonce->student_id = $user->id;
                $annonce->save();
                return response()->json([
                    'success' => 'Inscription à l\'annonce réussi'
                ],200);
            }
            elseif($annonce->student_id == $user->id) {// si l'étudiant et déjà inscrit, on le désinscrit
                $annonce->student_id = null;
                $annonce->save();
                return response()->json([
                    'success' => 'Désinscription de l\'annonce réussi'
                ],200);
            }
        }
    }
}
