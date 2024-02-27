import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer



class ChatConsumer(WebsocketConsumer):

    def connect(self):
        user = self.scope['user']
        print('user', user, user.is_authenticated)
        if not user.is_authenticated:
            return
        # Save username to use as a group for this user
        self.username = user.username

        # Join this user to a group with their username
        async_to_sync(self.channel_layer.group_add)(
            self.username, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave the room/group
        async_to_sync(self.channel_layer.group_discard)(
            self.username, self.channel_name
        )

    # --------------------------------------------
    # --------------Handle Requests---------------
    # --------------------------------------------

    def receive(self, text_data):
        # Receive message form websocket
        data = json.loads(text_data)
        # Pretty print Python dict
        print('receive', json.dumps(data, index=2))
