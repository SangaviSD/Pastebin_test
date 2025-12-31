from rest_framework import serializers
from .models import Paste

class PasteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paste
        fields = "__all__"
        read_only_fields = ["id", "views", "created_at"]
