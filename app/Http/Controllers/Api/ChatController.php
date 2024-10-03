<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChatMessage;
use App\Models\ChatRoom;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function messages(Request $request) : JsonResponse
    {
        $token = $request->bearerToken();
        
        $user = User::where('provider_token', $token)->first();

        $chat = ChatRoom::where('user_id', $user->id)->where('uuid', $request->chat_id)->with('messages')->first();

        $chatMessages = [];

        foreach ($chat->messages as $message) {
            $data = [
                'role' => $message->role,
                'content' => $message->content,
                'model' => $message->model,
            ];
            
            $chatMessages[] = $data;
        }

        return response()->json([$chatMessages], 200);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'chat_id' => 'required',
            'role' => 'required|string',
            'content' => 'required|string',
            'model' => 'required|string'
        ]);

        $chat = ChatRoom::where('uuid', $data['chat_id'])->first('id');

        $message = [
            'chat_id' => $chat->id,
            'role' => $data['role'],
            'content' => $data['content'],
            'model' => $data['model']
        ];

        ChatMessage::create($message);

        return response()->json(data: ["message" => __('Message added.')]);
    }
}
