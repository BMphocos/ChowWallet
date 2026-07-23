from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    wallet_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    momo_number = models.CharField(max_length=15, blank=True, default='')

    def __str__(self):
        return f"{self.user.username} - ₵{self.wallet_balance}"