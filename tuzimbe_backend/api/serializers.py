from rest_framework import serializers
from .models import Tuzimbe,Materials,MaterialsHistory,Attendence
from django.contrib.auth.hashers import make_password

class TuzimbeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tuzimbe
        fields = ['id','username','firstname','sirname','groups','approved','jobtitle','address','tellNo','email','password']
    
    def validate_password(self, value: str) -> str:
        # Hash the password before saving it to the database
        return make_password(value)
    

class MaterialsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Materials
        fields = ['id','material','quantity']
    

class MaterialsHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MaterialsHistory
        fields = ['id','material','bought','left','datetime','used','cost']
    

class AttendenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendence
        fields = ['id','date','dayid','jobtitle','tellNo','arrival','depature','recorder']