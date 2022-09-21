from django.urls import path
from . import views

urlpatterns = [
    path("addcandidate",views.add_candidate),
    path("castvote",views.cast_vote),
    path("table",views.table),
    path("result",views.result),
    path("votecandidates",views.votecandidates)
]
