backend/start/dev:
	cd backend && yarn start:dev
backend/migrate/dev:
	cd backend && yarn prisma migrate dev
backend/generate:
	cd backend && yarn prisma generate
backend/start/studio:
	cd backend && yarn prisma studio
backend/start/dev--no-watch:
	cd backend && yarn start

mobile/start/android:
	cd mobile && expo run:android
mobile/start/native/android:
	cd mobile && yarn android

web/start/dev:
	cd web && yarn dev

start/dev: 
	make -j4 backend/start/dev web/start/dev mobile/start/android

start/web/dev:
	make -j4 backend/start/dev--no-watch web/start/android
start/mobile/dev:
	make -j4 backend/start/dev--no-watch mobile/start/android