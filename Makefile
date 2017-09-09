all: build.zip

build.zip: extension/main.js extension/manifest.json
	zip -j build extension/*

clean:
	rm -vf build.zip
