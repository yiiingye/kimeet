build:
	bun run build
	rm -rf backend/static/
	rm -f backend/index.html
	mkdir backend/static
	mkdir backend/static/assets/
	cp dist/assets/* backend/static/assets
	cp dist/index.html backend/index.html
	perl -pi -e 's|/assets/|/static/assets/|g' backend/index.html
