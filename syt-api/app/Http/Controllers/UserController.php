<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{

    public function register(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if($user) {
            $response['status'] = 0;
            $response['message'] = 'Email already exists';
            $response['code'] = 409;
        }
        else{
            $user = User::create([
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'birthday' => $request->birthday,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_id' => $request->role_id,
            ]);
            $response['status'] = 1;
            $response['message'] = 'User registered successfully';
            $response['code'] = 200;
        }
        return response()->json($response);
    }


    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        try{
            if (! JWTAuth::attempt($credentials)) {
                $response['status'] = 0;
                $response['code'] = 401;
                $response['data'] = null;
                $response['message'] = 'Email or Password is incorrect';
                return response()->json($response);
            }
        } catch(JWTException $e) {
            $response['data'] = null;
            $response['code'] = 500;
            $response['message'] = 'could not create Token';
            return response()->json($response);
        }

        $user = JWTAuth::user();
        $data['token'] = JWTAuth::claims([
            'user_id' => $user->id,
            'email' => $user->email
        ])->attempt($credentials);

        $response['status'] = 1;
        $response['code'] = 200;
        $response['data'] = $data;
        $response['message'] = 'Login Successfully';
        return response()->json($response);
    }



    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::orderBy('id','ASC')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if($user = User::create($request->all())){
            return response()->json([
                'success' => 'Utilisateur crée avec succès'
            ],200);
        }   
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return User::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if(is_null($user)) {
            return response()->json([
                'error' => 'Utilisateur non trouvé'
            ],404);
        }
        if($user->update($request->all())){
            return response()->json([
                'success' => 'Utilisateur modifié avec succès'
            ],200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
    }
}
