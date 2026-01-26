import json
from django.shortcuts import render
from django.db.models import Max
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# Rest Framework Imports
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status

# App Imports
from .serializer import CandidateSerializer
from .models import Candidate

# ==========================================
# AUTHENTICATION VIEWS
# ==========================================

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        
        user = authenticate(username=username, password=password)
        
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
                "username": user.username,
                "user_id": user.pk
            })
        else:
            return Response(
                {"error": "Invalid Username or Password"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")

        # Basic validation
        if not username or not password:
            return Response({"error": "Username and password required"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)

        # Create user and token
        user = User.objects.create_user(username=username, password=password, email=email)
        token, _ = Token.objects.create(user=user)
        
        return Response({
            "token": token.key,
            "username": user.username
        }, status=status.HTTP_201_CREATED)

# ==========================================
# CANDIDATE VIEWS (PROTECTED)
# ==========================================

@api_view(['POST'])
@permission_classes([IsAuthenticated]) # <--- PROTECTED: Needs Token
def add_candidate(request):
    try:
        # Prefer request.data in DRF, fallback to json.loads if needed
        data = request.data if request.data else json.loads(request.body.decode())
        
        Candidate.objects.create(
            admission=data['admission'],
            dept=data['dept'],
            seat=data['seat'],
            name=data['name'],
            semester=data['semester'],
            vote=0
        )
        return Response(data="ok")
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated]) # <--- PROTECTED: Needs Token
def cast_vote(request):
    try:
        data = request.data if request.data else json.loads(request.body.decode())
        
        chair = Candidate.objects.filter(admission=data.get('chair')).first()
        vchair = Candidate.objects.filter(admission=data.get('vchair')).first()
        lady = Candidate.objects.filter(admission=data.get('ladyrep')).first()
        secr = Candidate.objects.filter(admission=data.get('secr')).first()
        
        # Check if candidates exist before voting to avoid errors
        if chair: 
            chair.vote += 1
            chair.save()
        if vchair: 
            vchair.vote += 1
            vchair.save()
        if lady: 
            lady.vote += 1
            lady.save()
        if secr: 
            secr.vote += 1
            secr.save()
            
        return Response('ok')
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# ==========================================
# PUBLIC READ-ONLY VIEWS
# ==========================================

@api_view(['GET'])
# @permission_classes([IsAuthenticated]) # Uncomment if you want to hide the table from guests
def table(request):
    l = [{
        "id": x.admission,
        "name": x.name,
        "dept": x.dept,
        "sem": x.semester,
        "seat": x.seat
    } for x in Candidate.objects.all()]
    return Response(l)

@api_view(['GET'])
def result(request):
    chair = Candidate.objects.filter(seat="chair").order_by("-vote").first()
    vchair = Candidate.objects.filter(seat="vchair").order_by("-vote").first()
    ladyrep = Candidate.objects.filter(seat="ladyrep").order_by("-vote").first()
    secr = Candidate.objects.filter(seat="secretery").order_by("-vote").first()
    
    # Handle cases where candidates might not exist yet
    data = [
        CandidateSerializer(chair).data if chair else None,
        CandidateSerializer(vchair).data if vchair else None,
        CandidateSerializer(ladyrep).data if ladyrep else None,
        CandidateSerializer(secr).data if secr else None
    ]
    # Filter out None values just in case
    data = [d for d in data if d is not None]
    
    return Response(data)

@api_view(['GET'])
def votecandidates(request):
    chair = [{"label":x.name,"value":x.admission} for x in Candidate.objects.filter(seat="chair")]
    vchair = [{"label":x.name,"value":x.admission} for x in Candidate.objects.filter(seat="vchair")]
    lady =[{"label":x.name,"value":x.admission} for x in  Candidate.objects.filter(seat="ladyrep")]
    secretery = [{"label":x.name,"value":x.admission} for x in Candidate.objects.filter(seat="secretery")]
    
    return Response({
        "chair": chair,
        "vchair": vchair,
        "secr": secretery,
        "ladyrep": lady
    })