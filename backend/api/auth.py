from google.oauth2 import id_token
from google.auth.transport import requests

client_ids = (
    "317596678792-2ekdkdrdlgsqdaudaag7t7m7qf4m0b17.apps.googleusercontent.com")
authorized_email_domains = ("whitman.edu")


def verify_encoded_token(encoded_token):
    """Verify and get the client's token

    Verifies the token's signature, expiration, that it is from the API created
    by the front end, that the email domain is one from
    ``authorized_email_domains`` (whitman.edu), and that Google issued it.

    Args:
        encoded_token (str): The client token to verify and get email from

    Returns:
        dict: validated token
        NoneType: if token is invalid for whatever reason
    """
    # Modified from
    # https://developers.google.com/identity/sign-in/web/backend-auth
    try:
        # Client ID of the Google API (found in Developer Console)

        # Raises ValueError if token is invalid
        decoded_token = id_token.verify_oauth2_token(
            encoded_token, requests.Request())

        if decoded_token["aud"] not in [client_ids]:
            raise ValueError("Could not verify audience (API client ID)")

        if decoded_token["hd"] not in authorized_email_domains:
            raise ValueError("Domain of token not authorized")

        if decoded_token["iss"] not in [
                "accounts.google.com", "https://accounts.google.com"]:
            raise ValueError("Token not issued by Google")

    except ValueError:
        return None

    return decoded_token
