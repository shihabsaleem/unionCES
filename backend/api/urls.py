from django.urls import path
from . import views

urlpatterns = [
    # Auth Endpoints
    path("login/", views.LoginView.as_view(), name='login'),
    path("signup/", views.SignupView.as_view(), name='signup'),

    # Candidate Endpoints
    path("addcandidate", views.add_candidate, name='add_candidate'),
    path("castvote", views.cast_vote, name='cast_vote'),
    path("table", views.table, name='table'),
    path("result", views.result, name='result'),
    path("votecandidates", views.votecandidates, name='vote_candidates')
]