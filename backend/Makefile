build:
	cd ../frontend/ && bun run build
	rm -rf static/
	rm -f index.html
	mkdir static
	mkdir static/assets/
	cp ../frontend/dist/assets/* static/assets
	cp ../frontend/dist/index.html index.html
	perl -pi -e 's|/assets/|/static/assets/|g' index.html
	uv run main.py
