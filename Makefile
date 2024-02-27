run: run-android run-ios

run-android:
	cd app && npm run android

run-ios:
	cd app && npm run ios -- --simulator='iPhone 15'

server:
	. env/bin/activate && cd api && python manage.py runserver

redis:
	redis-server