import json
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializer import CandidateSerializer
from .models import Candidate
from django.db.models import Max
# Create your views here.

@api_view(['POST'])
def add_candidate(request):
    data = json.loads(request.body.decode())
    print(data)
    Candidate.objects.create(
        admission=data['admission'],
        dept=data['dept'],
        seat=data['seat'],
        name=data['name'],
        semester=data['semester'],
        vote=0
    )
    return Response(data="ok")

@api_view(['POST'])
def cast_vote(request):
    data = json.loads(request.body.decode())
    chair = Candidate.objects.filter(admission=data['chair']).first()
    vchair = Candidate.objects.filter(admission=data['vchair']).first()
    lady = Candidate.objects.filter(admission=data['ladyrep']).first()
    secr = Candidate.objects.filter(admission=data['secr']).first()
    chair.vote += 1
    vchair.vote += 1
    lady.vote += 1
    secr.vote += 1
    chair.save()
    vchair.save()
    lady.save()
    secr.save()
    return Response('ok')

@api_view(['GET'])
def table(request):
    l = [{"id":x.admission,
          "name":x.name,
          "dept":x.dept,
          "sem":x.semester,
          "seat":x.seat} for x in Candidate.objects.all()]
    return Response(l)

@api_view(['GET'])
def result(request):
    chair = Candidate.objects.filter(seat="chair").order_by("-vote").first()
    vchair = Candidate.objects.filter(seat="vchair").order_by("-vote").first()
    ladyrep = Candidate.objects.filter(seat="ladyrep").order_by("-vote").first()
    secr = Candidate.objects.filter(seat="secretery").order_by("-vote").first()
    data = [
        CandidateSerializer(chair).data,
        CandidateSerializer(vchair).data,
        CandidateSerializer(ladyrep).data,
        CandidateSerializer(secr).data
    ]
    return Response(data)

@api_view(['GET'])
def votecandidates(request):
    chair = [{"label":x.name,"value":x.admission} for x in Candidate.objects.filter(seat="chair")]
    vchair = [{"label":x.name,"value":x.admission} for x in Candidate.objects.filter(seat="vchair")]
    lady =[{"label":x.name,"value":x.admission} for x in  Candidate.objects.filter(seat="ladyrep")]
    secretery = [{"label":x.name,"value":x.admission} for x in Candidate.objects.filter(seat="secretery")]
    return Response(
        {"chair":chair,
         "vchair":vchair,
         "secr":secretery,
         "ladyrep":lady}
    )