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
                echo "Waiting for containers..."
                echo "===================================="

                sleep 20

                echo "Backend Response:"
                curl http://localhost:5000/api/health

                echo ""
                echo "Frontend Response:"
                curl -I http://localhost

                echo ""
                echo "Docker Status:"
                docker compose -f ${COMPOSE_FILE} ps

                echo ""
                echo "Health Check Passed"
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
