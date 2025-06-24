curl -X POST '{backend_url}/store/gift-cards/{id}/invitation' \
-H 'x-publishable-api-key: {your_publishable_api_key}' \
-H 'Content-Type: application/json' \
--data-raw '{
  "email": "Morton61@hotmail.com"
}'