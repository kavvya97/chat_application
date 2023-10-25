# Ensure that docker image is already built and available since the deployments utilize the docker-image
# docker build -t webchat_react:latest . or run the script sh build_image.sh
kubectl apply -f webchat_react_service.yml
kubectl apply -f webchat_react_deployment.yml