.PHONY: build push

### SETUP LOCAL_ENV ###
setup:
	@echo \# Get code, libs, build
	rm -rf build && rm -rf bin && mkdir bin/
	git pull && gradle build
	cp build/libs/*.jar bin/

start:
	@echo \# Run App
	java -jar bin/poc-0.0.1-SNAPSHOT.jar

### DEPLOY TO GCP ###
export CI_REGISTRY ?= asia.gcr.io/cloudeng-prod-cicd
SVC_AUTH = rm-tools-api-auth
IMAGE_AUTH = $(CI_REGISTRY)/bib/rmtools/$(SVC_AUTH)

export VERSION ?= $(shell git show -q --format=%h)

docker:
	docker build --target authapi -t $(IMAGE_AUTH):$(VERSION) -f ./deploy/env.Dockerfile --build-arg CI_JOB_TOKEN="$(CI_JOB_TOKEN)" .
docker-push:
	docker push $(IMAGE_AUTH):$(VERSION)

