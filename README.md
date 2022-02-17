# Mailer Service

HTTP server for sending mails

## Getting Started

```shell
docker-compose up -d --build
```

### Usage

#### Mail Parameters

* `url` - http://mailer-service:8000/api/sendMail
* `body` - { from: string, to: string[], title: string, html: string, txt: string, headers: { key: value }[] }
* `files` - formData[]

#### Environment Variables

* `HTTP_SERVER_PORT` - Port of the http server (default: 8000)
* `USE_REDIS` - If true, use redis for mail hosts round robin (default: true)
* `REDIS_CONNECTION_URI` - Redis connection string (default: redis://localhost:6379)
* `REQUEST_BODY_LIMIT` - Body size (default: 1.5mb)
* `MAIL_HOSTS` - Hostnames or IPs to connect to
* `USE_AUTH` - If true, add user and passowrd (default: false)
* `MAIL_USER` - Username for authentication 
* `MAIL_PASS` - Password for authentication
* `MAILER_CONNECTION_TIMEOUT` - Milliseconds to wait for the connection to establish (default: 2 * 60 * 1000)
* `MAILER_GREETING_TIMEOUT` - Milliseconds to wait for the greeting after connection is established (default: 30 * 1000)
* `MAILER_SOCKET_TIMEOUT` - Milliseconds of inactivity to allow (default: 10 * 60 * 1000)

### Test Environment

1. open new account https://ethereal.email/
2. set `MAIL_HOSTS` to ['smtp.ethereal.email']
3. set `USE_AUTH` to true
4. set `MAIL_USER` and `MAIL_PASS` to the given username and password from ethereal
