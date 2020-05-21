FROM python:3.7.3

WORKDIR /my-app

ADD . /my-app

RUN apt-get update && apt-get -y install python-pip libpq-dev

RUN pip install --upgrade pip
    
RUN pip install -r /my-app/requirements.txt

EXPOSE 5000

CMD  ["python3", "main.py"]
