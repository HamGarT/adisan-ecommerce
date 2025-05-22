
from minio import Minio
from datetime import timedelta

client = Minio(
    "localhost:9000",
    access_key="XQzJiKb7ZyzRbOvZ8T2f",
    secret_key="YlaYeWEBEjnaWmmMEUuvQDEchjbJcArfrAIaIuJS",
    secure=False
)




url = client.presigned_get_object(
    "test", 
    "EF_DESARROLLO_ELMAOP.pdf", 
    expires=timedelta(days=7)  # Use timedelta instead of seconds
)

print(url)