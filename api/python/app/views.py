from rest_framework.views import APIView
from rest_framework.response import Response

from .helpers import verify_payment_signature


class MakePayment(APIView):
  def post(self, request):
    data = {
      "reference": "<transaction reference>",
      "app_id": "<your UzaversePay application id>",
      "category": "<payment category>",
      "amount": 1000,
      "payload": {
        "detail": "Information about the order",
      }
    }

    try:
      uzaversepay_payment_url = "https://api-uzaversepay.uzaverse.com/sandbox/payments"
      response = requests.post(uzaversepay_payment_url, json=data)
    except Exception as e:
      return Response({"error": f"There is a problem with the gateway ({url}). Please contact them"})


class MakeOrder(APIView):
  def post(self, request):
    payload = request.data.copy()

    signature_verification, message = verify_payment_signature(payload, request)
    if not signature_verification:
      return Response({"error": message}, status.HTTP_400_BAD_REQUEST)
    
    # Process the order

    return Response({"message": "order confirmed"}, status.HTTP_201_CREATED)
