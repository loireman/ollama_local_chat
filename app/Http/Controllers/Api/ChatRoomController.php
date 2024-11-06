<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChatRoom;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ChatRoomController extends Controller
{
    public function index(Request $request) : JsonResponse
    {
        $token = $request->bearerToken();
        
        $user = User::where('provider_token', $token)->with('chatrooms')->first();

        $chatRooms = [];

        foreach ($user->chatrooms as $room) {
            $chatRoomInfo = [
                'uuid' => $room->uuid,
                'name' => $room->name,
                'updated_at' => $room->updated_at
            ];
            
            $chatRooms[] = $chatRoomInfo;
        }

        return response()->json([$chatRooms], 200);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|max:255',
            'user_id' => 'required'
        ]);

        $data = [
            "name" => $data['name'],
            "user_id" => $data['user_id'],
            "uuid" => Str::uuid()->toString()
        ];

        $chatRoom = ChatRoom::create($data);

        return response()->json(data: ["message" => __('Config created successfully.'), "chat_id" => $chatRoom->uuid]);
    }


    public function show(): JsonResponse
    {
        return response()->json(200);
    }

    public function update(): JsonResponse
    {
        return response()->json(200);
    }

    public function destroy(Request $request): JsonResponse
    {
        $data = $request->validate([
            'uuid' => 'required|max:255',
        ]);

        $chatRoom = ChatRoom::where('uuid', $data['uuid']);

        $chatRoom->delete();

        $message = "Chatroom " . $data['uuid'] . " deleted.";

        return response()->json($message, 200);
    }
}
