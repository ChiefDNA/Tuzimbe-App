from django.contrib import admin
from .models import Tuzimbe, Materials, MaterialsHistory,Attendence

# Register your models here.
admin.site.register(Tuzimbe)
admin.site.register(Materials)
admin.site.register(MaterialsHistory)
admin.site.register(Attendence)
