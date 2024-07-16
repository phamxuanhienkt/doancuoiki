from datetime import datetime
from rest_framework.viewsets import ViewSet
from app.settings import VERSION_FILE_PATH
import json
from django.http import HttpResponse

class ApiViewset(ViewSet):
    def list(self, _):
        with open(VERSION_FILE_PATH) as f:
            version = f.read()
        return HttpResponse(json.dumps({
            'version': version,
            'timestamp': datetime.now().__str__()
        }), content_type="application/json")
