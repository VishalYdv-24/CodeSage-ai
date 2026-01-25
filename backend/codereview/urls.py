from django.urls import path
from . import views

urlpatterns = [
    path("code-review/", views.CodeReviewClass.as_view()),
]