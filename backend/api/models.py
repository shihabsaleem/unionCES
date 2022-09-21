from pyexpat import model
from django.db import models

# Create your models here.
class Candidate(models.Model):
    admission = models.CharField(max_length=200)
    dept = models.CharField(max_length=100)
    seat = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    semester = models.CharField(max_length=10)
    vote = models.IntegerField(default=0)
