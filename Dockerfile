FROM centos:centos7
MAINTAINER Philip Vacca <phil.vacca@gmail.com>
LABEL vendor="LCC" \
  version="0.1" \
  description="The Loose Confederation of Chums presents: expiralink"

ENV ELWEB_HOME /var/elweb

RUN yum makecache \
 && yum install -y epel-release \
 && yum install -y nodejs npm \
 && yum clean all

RUN groupadd elweb \
 && useradd -m -d $ELWEB_HOME -g elweb elweb \
 && mkdir $ELWEB_HOME/bin \
 && mkdir $ELWEB_HOME/public \
 && mkdir $ELWEB_HOME/routes \
 && mkdir $ELWEB_HOME/views

COPY elweb/package.json $ELWEB_HOME/package.json
WORKDIR $ELWEB_HOME
RUN chown -P elweb:elweb $ELWEB_HOME \
 && npm install

COPY entrypoint.sh $ELWEB_HOME/entrypoint.sh
COPY elweb/app.js $ELWEB_HOME/app.js
COPY elweb/bin/www $ELWEB_HOME/bin/www

COPY elweb/public/* $ELWEB_HOME/public/
COPY elweb/routes/* $ELWEB_HOME/routes/
COPY elweb/views/* $ELWEB_HOME/views/

RUN chown -P elweb:elweb $ELWEB_HOME

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]

CMD ["start"]
