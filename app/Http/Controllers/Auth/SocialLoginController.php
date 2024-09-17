<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

class SocialLoginController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        $user = Socialite::driver('google')->user();
        $existingUser = User::where('email', $user->email)->first();
        // dd($user);
        if ($existingUser) {
            Auth::login($existingUser);
        } else {
            $newUser = User::create([
                'name'          => $user->name,
                'email'         => $user->email,
                'password'      => Hash::make(Str::random(8)),
                'photo_path'    => $user->getAvatar(),
                'provider_token' => $user->token
            ]);

            Auth::login($newUser);
        }
        return redirect('dashboard');
    }
}
