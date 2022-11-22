from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/channel", consumers.ChatConsumer.as_asgi()),#/(?P<room_name>\w+)/$
]