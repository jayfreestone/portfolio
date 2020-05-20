output := workflow.yaml

default: workflow.yaml

workflow.yaml: *.m4
ifndef application
	@echo "💣 Please specify application."
	exit 1;
endif
ifndef output
	@echo "Output not specified, creating in root."
endif
	@m4 -D xPrebuild=${prebuild} -D xApplication=${application} workflow.m4 > ${output} 
	@echo ✅ Created ${output}
