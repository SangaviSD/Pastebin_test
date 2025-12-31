from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from .models import Paste
from .serializers import PasteSerializer
from django.utils import timezone
from django.db import models


class CreatePasteView(APIView):
    def post(self, request):
        serializer = PasteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class GetPasteView(APIView):
    def get(self, request, paste_id):
        try:
            paste = Paste.objects.get(id=paste_id)
        except Paste.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        if paste.is_expired():
            return Response({"error": "Paste expired"}, status=410)

        paste.views += 1
        paste.save()

        return Response({
            "content": paste.content,
            "views": paste.views
        })

class ActivePastesView(APIView):
    def get(self, request):
        
        expired_pastes = Paste.objects.filter(
            expires_at__lte=timezone.now()
        ) | Paste.objects.filter(views__gte=models.F('max_views'))
        expired_pastes.delete()

        
        active_pastes = Paste.objects.all()
        serializer = PasteSerializer(active_pastes, many=True)
        return Response(serializer.data)
    
class DeletePasteView(APIView):
    def delete(self, request, paste_id):
        try:
            paste = Paste.objects.get(id=paste_id)
        except Paste.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        paste.delete()
        return Response({"message": "Paste deleted"}, status=204)