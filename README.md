```sh
openssl req -new -x509 -days 365 -nodes \
         -out ejabberd/certs/localhost.pem \
         -keyout ejabberd/certs/localhost.key \
         -subj "/CN=localhost"
```