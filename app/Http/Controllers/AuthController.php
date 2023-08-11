<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function Signup(SignupRequest $request)
    {
        $data          = $request->validated();

        $user               = User::create([
            'name'          => $data['name'],
            'email'         => $data['email'],
            'password'      => bcrypt($data['password'])
        ]);

        $token              = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user'          => $user,
            'token'         => $token
        ]);
    }

    public function Login(LoginRequest $request)
    {
        $creadentials       = $request->validated();
        $remember           = $creadentials['remember'] ??  false;
        unset($creadentials['remember']);


        if (!Auth::attempt($creadentials, $remember)) {
            return response()->json([
                'error'     => 'The provided credentials are not correct'
            ], 422);
        }

        $user               = Auth::user();
        $token              = $user->createToken('main')->plainTextToken;
        return response()->json([
            'user'          => $user,
            'token'         => $token
        ]);
    }

    public function Logout(Request $request)
    {
        $user                = Auth::user();
        $user->currentAccessToken()->delete();

        return response([
            'success'       => 'true'
        ]);
    }
}
