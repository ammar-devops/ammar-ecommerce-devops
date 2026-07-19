pipeline {
    agent any

    environment {
        COMPOSE_FILE = "docker-compose.prod.yml"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Prepare Environment') {
            steps {
                sh '''
                cp /opt/ecommerce/backend.env backend/.env
                ls -la backend
                '''
            }
        }

        stage('Environment Check') {
            steps {
                sh '''
                echo "===== Environment ====="
                node -v
                npm -v
                git --version
                docker --version
                docker compose version
                '''
            }
        }

        stage('Install Backend') {
            steps {
                dir('backend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh '''
                    npm ci
                    npm run build
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker compose -f ${COMPOSE_FILE} up -d --build
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                echo "===================================="
                echo "Waiting for Backend..."
                echo "===================================="

                for i in $(seq 1 12)
                do
                    if curl -fs http://localhost:5000/api/health >/dev/null; then
                        echo "Backend is Healthy"
                        curl http://localhost:5000/api/health
                        echo ""
                        curl -I http://localhost || true
                        exit 0
                    fi

                    echo "Attempt $i/12 - Backend not ready..."
                    sleep 5
                done

                echo "Health Check Failed"

                docker compose -f ${COMPOSE_FILE} ps
                docker compose -f ${COMPOSE_FILE} logs --tail=100

                exit 1
                '''
            }
        }

        stage('Docker Cleanup') {
            steps {
                sh '''
                docker image prune -f || true
                '''
            }
        }
    }

    post {

        success {
            echo 'Deployment Successful'

            sh '''
            docker compose -f ${COMPOSE_FILE} ps
            '''
        }

        failure {
            echo 'Deployment Failed'

            sh '''
            docker compose -f ${COMPOSE_FILE} ps || true
            docker compose -f ${COMPOSE_FILE} logs --tail=100 || true
            '''
        }

        always {
            echo 'Pipeline Finished'
        }
    }
}
