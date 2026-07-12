from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import UserProfile
from decimal import Decimal

@api_view(['GET', 'POST'])
def profile_wallet(request):
    # 1. Get or create a default test user for development
    user, _ = User.objects.get_or_create(username='alfred_dev', defaults={'email': 'alfred@example.com'})
    
    # 2. Get or create the profile tracking the balance for this user
    profile, created = UserProfile.objects.get_or_create(user=user)

    # --- Fetching Balance ---
    if request.method == 'GET':
        return Response({
            'username': user.username,
            'wallet_balance': float(profile.wallet_balance),
            'momo_number': profile.momo_number
        }, status=status.HTTP_200_OK)

    # --- Adding Cash (Top Up) ---
    if request.method == 'POST':
        amount_to_add = request.data.get('amount')
        
        if amount_to_add is None:
            return Response({'error': 'Amount parameter is missing'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            amount = Decimal(str(amount_to_add))
            if amount <= 0:
                return Response({'error': 'Top up amount must be greater than zero'}, status=status.HTTP_400_BAD_REQUEST)
                
            # Increment the wallet balance value safely
            profile.wallet_balance += amount
            profile.save()
            
            return Response({
                'success': True,
                'wallet_balance': float(profile.wallet_balance)
            }, status=status.HTTP_200_OK)
            
        except (ValueError, TypeError):
            return Response({'error': 'Invalid numeric amount format'}, status=status.HTTP_400_BAD_REQUEST)