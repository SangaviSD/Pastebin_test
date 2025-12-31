from django.urls import path
from .views import CreatePasteView, GetPasteView, ActivePastesView, DeletePasteView

urlpatterns = [
    path("paste/", CreatePasteView.as_view()),
    path("paste/<uuid:paste_id>/", GetPasteView.as_view()),
    path("paste/active/", ActivePastesView.as_view()),
    path("paste/<uuid:paste_id>/delete/", DeletePasteView.as_view()),

]
