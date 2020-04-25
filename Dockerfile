FROM python:3.7.3
COPY requirements.txt /
RUN pip install -r requirements.txt
WORKDIR /proman
COPY . /proman
CMD ["python3", "main.py"]