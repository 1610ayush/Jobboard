from djangojobboard.jobs.models import Job
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView
from .serializers import JobSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from .permissions import IsJobOwner


class JobListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = JobSerializer
    
    def get_queryset(self):
        return Job.objects.filter(available=True)

class JobCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = JobSerializer

    # Adding user field directly from request
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class JobDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = JobSerializer

    def get_queryset(self):
        return Job.objects.all()

class JobUpdateView(UpdateAPIView):
    permission_classes = [IsAuthenticated, IsJobOwner]
    serializer_class = JobSerializer

    def get_queryset(self):
        return Job.objects.filter(available=True)

class JobDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated, IsJobOwner]

    def get_queryset(self):
        return Job.objects.all()

