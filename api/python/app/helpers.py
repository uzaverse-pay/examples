import json
import base64

from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import padding


def load_public_key():
  pem_key = "<your application public key>" # Replace with your UzavesePay application public key
  key_str = pem_key.replace("\\\\n", "\n")
  key_bytes = key_str.encode("utf-8").replace(b"\\n", b"\n")
  return serialization.load_pem_public_key(key_bytes, backend=default_backend())

def verify_payment_signature(payload, request) -> tuple:
  """
  Verify the payment signature using the provided payload and signature.

  Args:
    payload (dict): The payment payload in dictionary format.
    request: The request object containing headers.

  Returns:
    tuple: (bool, str) indicating whether the signature is valid and a message.
  """
  signature = request.headers.get('UzaversePay-Signature', None)
  
  if not signature:
    return False, "Signature not provided."

  try:
    public_key = load_public_key()

    # Serialize the payload to JSON and encode it to bytes
    payload_json = json.dumps(payload)
    payload_bytes = payload_json.encode('utf-8')

    # Decode the signature from base64
    signature_bytes = base64.urlsafe_b64decode(signature.encode('utf-8'))
  except Exception:
    return False, "Failed to load the public key, check if it is valid or in the correct format."

  try:
    # Verify the signature using the public key and SHA256 hashing
    public_key.verify(
      signature_bytes,
      payload_bytes,
      padding.PSS(
        mgf=padding.MGF1(hashes.SHA256()),
        salt_length=padding.PSS.MAX_LENGTH
      ),
      hashes.SHA256()
    )

    return True, "Signature verification succeeded."
  except Exception:
    return False, "Signature verification failed."