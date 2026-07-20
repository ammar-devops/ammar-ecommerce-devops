pipeline {
    agent any

    environment {
        COMPOSE_FILE = "docker-compose.prod.yml"
        COMPOSE_PROJECT_NAME = "ammar-ecommerce-devops"
    }

    stages {

        stage('Prepare Environment') {
            steps {
                withCredentials([file(credentialsId: 'backend-env', variable: 'ENV_FILE')]) {
                    sh '''
                        echo "===== Preparing Environment ====="

                        cp "$ENV_FILE" backend/.env

                        echo "Environment file restored."
                        ls -la backend
                    '''
                }
            }
        }

        stage('Docker Compose Validation') {
            steps {
                sh '''
                    docker compose \
                      -p ${COMPOSE_PROJECT_NAME} \
                      -f ${COMPOSE_FILE} \
                      config
                '''
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh '''
                    docker compose \
                      -p ${COMPOSE_PROJECT_NAME} \
                      -f ${COMPOSE_FILE} \
                      down || true
                '''
            }
        }

        stage('Build & Deploy') {
            steps {
                sh '''
                    docker compose \
                      -p ${COMPOSE_PROJECT_NAME} \
                      -f ${COMPOSE_FILE} \
                      up -d --build
                '''
            }
        }

        stage('Show Running Containers') {
            steps {
                sh '''
                    docker compose \
                      -p ${COMPOSE_PROJECT_NAME} \
                      -f ${COMPOSE_FILE} \
                      ps
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    echo "Waiting for application..."
                    sleep 20

                    curl -f http://backend:5000/api/health

                    echo ""
                    echo "Application is Healthy"
                '''
            }
        }
    }

    post {

        success {
            echo "Deployment Successful!"
        }

        failure {

            echo "Deployment Failed!"

            sh '''
                docker compose \
                  -p ${COMPOSE_PROJECT_NAME} \
                  -f ${COMPOSE_FILE} \
                  ps || true

                echo ""
                echo "===== Backend Logs ====="

                docker compose \
                  -p ${COMPOSE_PROJECT_NAME} \
                  -f ${COMPOSE_FILE} \
                  logs backend --tail=100 || true

                echo ""
                echo "===== Frontend Logs ====="

                docker compose \
                  -p ${COMPOSE_PROJECT_NAME} \
                  -f ${COMPOSE_FILE} \
                  logs frontend --tail=100 || true

                echo ""
                echo "===== Database Logs ====="

                docker compose \
                  -p ${COMPOSE_PROJECT_NAME} \
                  -f ${COMPOSE_FILE} \
                  logs postgres --tail=100 || true
            '''
        }
    }
}