from fabric import task
import os
from fabric import Connection
from dotenv import load_dotenv


load_dotenv()

HOST = os.getenv("DEPLOY_HOST")
USER = os.getenv("DEPLOY_USER")
DEPLOY_PATH = os.getenv("DEPLOY_PATH")
BRANCH = os.getenv("DEPLOY_BRANCH", "master")
PORT = os.getenv("DEPLOY_PORT", "22")  # Default SSH port 22

@task
def deploy(c):
    """Task principale di deploy"""
    with Connection(host=HOST, user=USER, port=PORT) as conn:
        with conn.cd(DEPLOY_PATH):
            conn.run(f"git pull origin {BRANCH}")
            conn.run("docker compose down && docker compose up -d --build")

@task
def unlock(c):
    """Task per sbloccare il deploy (placeholder, da personalizzare se necessario)"""
    print("Unlocking not implemented. Consider adding lock logic if needed.")

@task
def deploy_failed(c):
    """Hook da chiamare in caso di fallimento"""
    unlock(c)
