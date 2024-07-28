from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class MyUserManager(BaseUserManager):
    def  create_user(self, email, username, password=None):
        if not email:
            raise ValueError('User must have an email address')
        if not username:
            raise ValueError('User must have a username')
        user = self.model(
            email=self.normalize_email(email),
            username=username
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    # def create_superuser(self, email, password=None):
    #     user = self.create_user(email, password=password)
    #     user.is_admin = True
    #     # user.is_superuser = True
    #     user.save(using=self._db)
    #     return user
    
class MyUse(AbstractBaseUser):
    last_login = None
    is_staff = None
    is_superuser = None
    # email = models.EmailField(unique=True)
    email = models.EmailField(max_length=100, unique=True)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
