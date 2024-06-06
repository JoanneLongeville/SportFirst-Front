docker-up:
	docker compose up

docker-down:
	docker compose down

docker-rm:
	# arrête les containers
	docker compose down
	# supprime les containers, images & volumes
	docker system prune -a

serve:
	npm run serve
