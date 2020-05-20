app := portfolio-05
image := eu.gcr.io/platform-jfree/$(app)
tag := latest

.PHONY: build-workflow
build-workflow: .github/workflows/workflow.yaml

.github/workflows/workflow.yaml: .platform-workflow/workflow.m4 workflow/*.m4
	@cd .platform-workflow && \
	  $(MAKE) application=${app} prebuild=../workflow/prebuild.m4 output=../.github/workflows/workflow.yaml

.PHONY: build
build: Dockerfile
	docker build \
	  -t $(image):$(tag) \
	  -t $(image):latest .

.PHONY: push
push: Dockerfile
	docker push $(image):$(tag)
	docker push $(image):latest

