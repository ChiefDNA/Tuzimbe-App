from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import date, datetime

# Create your models here.
class Tuzimbe(AbstractUser):
    email = models.EmailField(unique=True)
    groups = models.ManyToManyField('auth.Group',related_name='%(app_label)s_user_set',blank=True)
    user_permissions = models.ManyToManyField('auth.Permission', related_name='%(app_label)s_user_permissions_set',blank=True)
    
    class User_types(models.TextChoices):
        PORTER = 'Porter'
        BUILDER = 'Builder'
        TRACKER = 'Tracker'
        MANAGER = 'Manager'

    firstname = models.CharField(max_length=50)
    sirname = models.CharField(max_length=50)
    tellNo = models.CharField(max_length=15, unique=True)
    username = models.CharField(max_length=50,unique=True)
    jobtitle = models.CharField(max_length=10,choices=User_types.choices)
    approved = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = f"{self.firstname.lower()}-{self.id}"
        super().save(*args, **kwargs)

    class Meta:
        app_label = 'api'


class Materials(models.Model):
    class material_list(models.TextChoices):
        SAND = 'Sand'
        CEMENT = 'Cement'
        BRICKS = 'Bricks'
        NAIL = 'Nail'
        WATER = 'Water'
        STONE_AGGREGATES = 'Stone Aggregates'

    material = models.CharField(max_length=27,choices=material_list.choices,unique=True)
    quantity = models.IntegerField()
    used = models.IntegerField()

    def __str__(self):
        return self.material
    
    class Meta:
        app_label = 'api'

class MaterialsHistory(models.Model):
    class material_list(models.TextChoices):
        SAND = 'Sand'
        CEMENT = 'Cement'
        BRICKS = 'Bricks'
        NAIL = 'Nail'
        WATER = 'Water'
        STONE_AGGREGATES = 'Stone Aggregates'

    material = models.ForeignKey(Materials,choices=material_list.choices,on_delete=models.CASCADE)
    bought = models.IntegerField()
    left = models.IntegerField()
    datetime = models.DateField(default=datetime.now().strftime('%Y-%m-%d %H:%M')) #datetime.now().strftime('%Y-%m-%d %H:%M)
    cost = models.DecimalField(max_digits=10,decimal_places=2)
    used = models.IntegerField()

    class Meta:
        app_label = 'api'
    
class Attendence(models.Model):
    date = models.DateField(default=date.today().strftime('%Y-%m-%d'))
    dayid = models.CharField(max_length=25,unique=True)
    tellNo = models.ForeignKey(Tuzimbe,on_delete=models.CASCADE,related_name='attended_tell_no')
    arrival = models.TimeField()
    depature = models.TimeField()
    jobtitle = models.CharField(max_length=10)
    recorder = models.ForeignKey(Tuzimbe,on_delete=models.CASCADE,related_name='recorded_attendences')

    def __str__(self):
        return f'{self.tellNo} - {self.date}'
    
    class Meta:
        app_label = 'api'