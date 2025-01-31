from django.urls import path
from .views import RegisterView,LogoutView,LoginView,UserListView,AttendenceView,MaterialPastView,MaterialsView,HistoriesView

urlpatterns = [
    path('register/',RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('employees/', UserListView.as_view(),name='User_list'),
    path('attendance/<str:jobtitle>/',AttendenceView.as_view()),
    path('materials/',MaterialPastView.as_view()),
    path('NewRecord/',MaterialsView.as_view()),
    path('MyInfo/',HistoriesView.as_view()),
    path('Mydata/',HistoriesView.as_view()),
    path('Logout/',LogoutView.as_view()),
]
