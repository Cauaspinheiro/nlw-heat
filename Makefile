backend/start/dev:
	cd backend && yarn start:dev
backend/migrate/dev:
	cd backend && yarn prisma migrate dev
backend/generate:
	cd backend && yarn prisma generate
backend/start/studio:
	cd backend && yarn prisma studio

web/start/dev:
	cd web && yarn dev

start/dev: 
	make -j4 backend/start/dev web/start/dev

