<?php

use App\Http\Controllers\Api\ChatController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(
    [
        'namespace'  => 'App\Http\Controllers\Api',
        'prefix'     => 'v1',
        'middleware' => 'api'
    ],
    function () {
        Route::resource('chatroom', 'ChatRoomController');
        Route::resource('chat', 'ChatController');
        Route::post('chat/messages', [ChatController::class, 'messages'])->name('chat.messages');
    }
);
