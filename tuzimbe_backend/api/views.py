from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import transaction
from .serializers import TuzimbeSerializer,MaterialsHistorySerializer,MaterialsSerializer,AttendenceSerializer
from django.contrib.auth import authenticate, login, logout
from .models import Tuzimbe,MaterialsHistory,Materials,Attendence
from datetime import date, datetime

# Create your views here.

class RegisterView(APIView):
    def post(self, request):
        serializer = TuzimbeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':"success"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    def post(self, request):
        logdata = request.data
        passworded = logdata['password']
        if logdata['choice'] == 'username':
            choice = logdata['username']
            user = authenticate(username=choice, password=passworded)
        if logdata['choice'] == 'tellNo':
            choice = logdata['tellNo']
            user = authenticate(tellNo=choice, password=passworded)
        if user is not None:
            login(request, user)  # Log in the user and create a session
            if logdata['choice'] == 'username':
                Users = Tuzimbe.objects.filter(username=choice).values('id','username','tellNo','email','jobtitle')
            if logdata['choice'] == 'tellNo':
                Users = Tuzimbe.objects.filter(tellNo=choice).values('id','username','tellNo','email','jobtitle')
            return Response({
                'message': 'Logged in successfully',
                'user': Users }, status=status.HTTP_200_OK)
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class UserListView(APIView):
    def get(self, request):
        jobtitle = request.data.get('jobtitle')
        if jobtitle == 'Tracker':
            employees = Tuzimbe.objects.exclude(jobtitle__in=['Manager','Tracker']).values('id','firstname','sirname','tellNo','email','jobtitle')
        elif jobtitle == 'Manager':
            employees = Tuzimbe.objects.exclude(jobtitle='Manager').values('id','firstname','sirname','username','tellNo','email','jobtitle','address','approved')
        else :
            employees = {}
        serializer = TuzimbeSerializer(employees, many=True) #user_data=[{"id": user.id, "username": user.username, "email": user.email} for user in users]
        return Response(serializer.data,status=status.HTTP_200_OK) #Response(user_data, status=status.HTTP_200_OK)

class MaterialsView(APIView):
    def get(self, request):
        jobtitle = request.data.get('jobtitle')
        if jobtitle == 'Tracker' or 'Manager':
            materials = Materials.objects.all()
        else :
            materials = {}
            return Response({'message':'Unauthorized access'},status=status.HTTP_401_UNAUTHORIZED)
        serializer = MaterialsSerializer(materials, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def post(self,request):
        materials = request.data
        if materials['used']==None or materials['bought']==None:
            return Response({'message':'fill in atleast the new or used quantities'}, status=status.HTTP_304_NOT_MODIFIED)
        if materials['used'] is not None:
            quantities = Materials.objects.filter(material=materials['material'])
            quantities['datetime'] = datetime.now().strptime('%Y-%m-%d %H:%M')
            quantities['quantity'] = quantities['quantiity'] - materials['used'] + materials['bought']
            serializer = MaterialsSerializer(quantities,data=quantities['quantity'],partial=True)
            if serializer.is_valid():
                serializer.save()
        histories = MaterialsHistorySerializer(materials)
        if histories.is_valid():
            histories.save
            
class AttendenceView(APIView):
    def post(self, request, titles):
        path  = titles
        Users = request.data
        if path == 'All':
            attendences = AttendenceSerializer(data=Users,many=True,partial=True)
            if attendences.is_valid():
                with transaction.atomic():
                    for update in attendences.validated_data:
                        Attendence.objects.filter(date=update['date'],dayid=update['dayid']).update(**update)
                return Response({'message':'Multi user attendences recorded'},status=status.HTTP_201_CREATED)
            return Response({'message':attendences.error}, status=status.HTTP_304_NOT_MODIFIED)
        if path == Users['tellNo']:
            Attendence.objects.filter(date=Users['date'],dayid=Users['dayid']).update(**Users)
            return Response({'message':'Records Updated'},status=status.HTTP_201_CREATED)
        return Response({'message':'record not found'},status=status.HTTP_206_PARTIAL_CONTENT)
    
    def put(self,request,title):
        path = title
        today = date.today().strftime('%Y%m%d')
        records = Attendence.objects.filter(dayid__startswith=today)
        if records.exists():
            if path == 'Tracker':
                records = records.exclude(jobtitle='Manager')
            return Response(records,status=status.HTTP_302_FOUND)
        users = Tuzimbe.objects.all().values('id','tellNo','jobtitle')
        for user in users:
            dayid = f"{today}U{user['id']}"
            Attendence.objects.create(dayid=dayid,tellNo=user['tellNo'],jobtitle=user['jobtitle'])
        newRecords = Attendence.objects.filter(dayid__startswith=today)
        if path == 'Tracker':
            newRecords = newRecords.exclude(jobtitle='Manager')
        elif path != 'Manager':
            newRecords={}
            return Response({'message':'Unathorized access'},status=status.HTTP_401_UNAUTHORIZED)
        return Response(newRecords,status=status.HTTP_100_CONTINUE)
    
class MaterialPastView(APIView):
    def post(self, request, title):
        jobtitle = title
        today = date.today().strftime('%Y-%m-%d')
        if jobtitle == 'Manager':
            materials = MaterialsHistory.objects.all()
            return Response(materials,status=status.HTTP_200_OK)
        if jobtitle == 'Tracker':
            materials = MaterialsHistory.objects.filter(date=today)
            return Response(materials,status=status.HTTP_200_OK)
        return Response({'message':'Not cleared t view this Information'},status=status.HTTP_401_UNAUTHORIZED)
    
class HistoriesView(APIView):
    def post(self, request):
        tellNo = request.data.get('tellNo')
        user = Tuzimbe.objects.filter(tellNo=tellNo).values('firstname','sirname','tellNo','email','jobtitle','address')
        if user is not None:
            return Response(user,status=status.HTTP_202_ACCEPTED)
        return Response({'message':"Make sure you Registered your Number"},status=status.HTTP_204_NO_CONTENT)
    
    def get(self, request):
        tellNo = request.data.get('tellNo')
        data = Attendence.objects.filter(tellNo=tellNo).values('date','arrival','depature','recorder')
        return Response(data, status=status.HTTP_302_FOUND)

class LogoutView(APIView):
    def post(self, request):
        logout(request,Tuzimbe.objects.filter(username=request.data['username']))
        return Response({'message':'logged out'},status=status.HTTP_423_LOCKED)
           