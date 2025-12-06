import bcrypt

class User:
    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = self.hash_password(password)

    def hash_password(self, password):
        return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    def to_dict(self):
        return {
            "name": self.name,
            "email": self.email,
            "password": self.password
        }
