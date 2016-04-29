# expiralink
Links and their expiration. For when you want to remember something, but not forever. It's totally social, and totally web 2.0. It's a game changer, and a disruptor. The expiralink idea is one of change, but not changeover; a new idea wrapped around an old one, and totally modernized for today's web centric omni-connected big data world.

## Technologies
This amazing application is built in node.js, because that's what all the cool kids are using now.

## To run the site:
1. `cd elweb`
1. `npm install`
1. `set DEBUG=elweb:*`
1. `npm start`

The site will be active on `http://localhost:3000/`

The elweb app expects there to be a redis instance somewhere. It should probably have some sort of graceful failure, or wait time and retry if a redis container isn't found, but you'll want one running anyway. There's an easy way to do this if you have docker installed.

`docker pull redis` will download the latest redis official image.
`docker run -d --name redis -p 6379:6379 redis` will make redis active on the docker host's port 6379. On Mac you can determine this ip with `docker-machine ip`, and it will default to `192.168.99.100`.


## To build in Docker
From repository root directory:

1. `docker build -t elweb .`
1. `docker run -d --name elweb -p 3000:3000 elweb`
1. Verify that the container is running: `docker ps`

To delete the container: `docker rm -f elweb`
The container will be running on the docker host, port 3000. If you have docker-machine installed, you can find this with `docker-machine ip default`
