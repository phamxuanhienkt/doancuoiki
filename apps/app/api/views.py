from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken 
from .serializers import UserSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LoginView(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = User.objects.filter(email=email).first()
        print(user)

        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh_token': str(refresh),
                'access_token': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


        # if user and user.check_password(password):
        #     refresh = RefreshToken.for_user(user)
        #     return Response({
        #         'refresh_token': str(refresh),
        #         'access_token': str(refresh.access_token),
        #     }, status=status.HTTP_200_OK)
        # return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
