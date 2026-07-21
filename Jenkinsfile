pipeline {
    agent any

    environment {
        COMPOSE_FILE = "docker-compose.prod.yml"
        COMPOSE_PROJECT_NAME = "ammar-ecommerce-devops"
        BACKEND_IMAGE = "ghcr.io/ammar-devops/ecommerce-backend"
        FRONTEND_IMAGE = "ghcr.io/ammar-devops/ecommerce-frontend"
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Prepare Environment') {
            steps {
                withCredentials([file(credentialsId: 'backend-env', variable: 'ENV_FILE')]) {
                    sh '''
                        cp "$ENV_FILE" backend/.env
                        chmod 600 backend/.env
                    '''
                }
            }
        }

        stage('Docker Compose Validation') {
            steps {
                sh 'docker compose -p ${COMPOSE_PROJECT_NAME} -f ${COMPOSE_FILE} config'
            }
        }

        stage('Docker Login GHCR') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'ghcr-credentials', usernameVariable: 'GHCR_USER', passwordVariable: 'GHCR_TOKEN')]) {
                    sh 'echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USER" --password-stdin'
                }
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh 'docker compose -p ${COMPOSE_PROJECT_NAME} -f ${COMPOSE_FILE} down || true'
            }
        }

        stage('Build Push Deploy') {
            steps {
                sh """
                docker build -t ${BACKEND_IMAGE}:latest -f backend/Dockerfile.prod backend
                docker build -t ${FRONTEND_IMAGE}:latest -f frontend/Dockerfile.prod frontend

                docker tag ${BACKEND_IMAGE}:latest ${BACKEND_IMAGE}:${BUILD_NUMBER}
                docker tag ${FRONTEND_IMAGE}:latest ${FRONTEND_IMAGE}:${BUILD_NUMBER}

                docker push ${BACKEND_IMAGE}:latest
                docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}
                docker push ${FRONTEND_IMAGE}:latest
                docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}

                docker compose -p ${COMPOSE_PROJECT_NAME} -f ${COMPOSE_FILE} pull
                docker compose -p ${COMPOSE_PROJECT_NAME} -f ${COMPOSE_FILE} up -d --remove-orphans
                """
            }
        }

        stage('Show Running Containers') {
            steps {
                sh 'docker compose -p ${COMPOSE_PROJECT_NAME} -f ${COMPOSE_FILE} ps'
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    sleep 20
                    curl --fail http://backend:5000/api/health
                    curl --fail http://localhost/
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }

        failure {
            sh '''
                docker compose -p ${COMPOSE_PROJECT_NAME} -f ${COMPOSE_FILE} ps || true
                docker compose -p ${COMPOSE_PROJECT_NAME} -f ${COMPOSE_FILE} logs --tail=100 || true
            '''
        }

        always {
            sh '''
                docker logout ghcr.io || true
                docker image prune -f || true
            '''
        }
    }
}
