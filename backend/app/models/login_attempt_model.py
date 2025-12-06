from datetime import datetime

class LoginAttempt:
    def __init__(self, email, ip, image_url=None):
        self.email = email
        self.ip = ip
        self.image_url = image_url
        self.timestamp = datetime.utcnow()

    def to_dict(self):
        return {
            "email": self.email,
            "ip": self.ip,
            "image_url": self.image_url,
            "timestamp": self.timestamp
        }
