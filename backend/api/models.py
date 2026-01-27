from pyexpat import model
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Candidate(models.Model):
    admission = models.CharField(max_length=200)
    dept = models.CharField(max_length=100)
    seat = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    semester = models.CharField(max_length=10)
    vote = models.IntegerField(default=0)

class VoteRecord(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    voted_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username

class ElectionControl(models.Model):
    polling_active = models.BooleanField(default=False)
    results_published = models.BooleanField(default=False)

    @classmethod
    def get_settings(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return f"Polling Active: {self.polling_active}, Results Published: {self.results_published}"
