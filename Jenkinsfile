pipeline {
    agent any

    tools {
        // Install the Maven version configured as "M3" and add it to the path.
        maven "Maven"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                // Delete the workspace before proceeding with the Git clone
                deleteDir()
            }
        }
        stage('Build') {
            steps {
                //input message: 'Approve deployment?'
                // Get some code from a GitHub repository
                //git 'https://gitlab.com/imedia-consulting/go4food/provider-ms.git'
                //git branch: 'main', credentialsId: 'gitlab-mykey', url: 'https://gitlab.com/imedia-consulting/go4food/provider-ms.git'
                checkout scmGit(branches: [[name: '*/dev']], extensions: [], userRemoteConfigs: [[credentialsId: 'credential-gitlab', url: 'https://gitlab.com/imedia-consulting/go-event/unified-messaging-service.git']])
                // Run Maven on a Unix agent.
                //sh "mvn -Dmaven.test.failure.ignore=true clean package"

                // To run Maven on a Windows agent, use
                // bat "mvn -Dmaven.test.failure.ignore=true clean package"
            }

            post {
                // If Maven was able to run the tests, even if some of the test
                // failed, record the test results and archive the jar file.
                success {
                    sh "pwd"
                    //junit '**/target/surefire-reports/*.xml'
                    //archiveArtifacts 'launcher/target/*.war'
                }
            }
        }
        stage('Build Docker Image'){
            steps{
                //sh 'docker build -t gofood/providerms .'
                script{
                    sh '''
                    HOME=${PWD}
                    docker build --no-cache -t goevent/unified-message:latest .
                '''

                   // sh 'docker build -t gofood/providerms .'
                }
            }
        }
        stage('Clean docker image '){
            steps{
                script{
                    catchError(message: 'impossible de localiser le container') {
                        //docker stop gofood-provider
                        //docker rm -f gofood-provider
                        sh '''
                        docker stop goevent-unified-message
                        docker rm -f goevent-unified-message
                        '''
                    }
                    
                }
            }
        }
       
        stage('Run Container'){
            steps{
                script{
                    sh 'docker-compose up --build -d'
                    //sh 'docker run  -it -d --network springboot-mysql-net --name gofood-provider -p 5001:5001 gofood/providerms:latest'
                }
            }
        }
        stage('Test'){
            steps{
                sh "pwd"
                //input message: 'Continue Test?'
            }
        }
    }
    post {
        failure {
            script {
                def botToken = "7851777947:AAFfMsJfUdL9cnYJ5gZWz8qAko6B8llinE8"
                def chatId = "-1002433470976"  // Remplace par ton Chat ID

                // Récupérer l’auteur et la date du dernier commit
                def commitInfo = sh(script: "git log -1 --pretty=format:'%an|%ad' --date=iso", returnStdout: true).trim()
                def parts = commitInfo.split("\\|")
                def author = parts[0]
                def commitDate = parts.length > 1 ? parts[1] : "Date inconnue"


                def message = "🚨 *Jenkins Build Failed!* 🚨\n" +
                              "👤 *Auteur:* ${author}\n" +
                              "📅 *Date:* ${commitDate}\n" +
                              "🔹 *Job:* ${env.JOB_NAME} #${env.BUILD_NUMBER}\n" +
                              "🔹 *Status:* ❌ Échec\n" +
                              "🔹 *Logs:* [Voir ici](${env.BUILD_URL}console)"

                sh "curl -s -X POST https://api.telegram.org/bot${botToken}/sendMessage -d chat_id=${chatId} -d text='${message}' -d parse_mode=Markdown"
            }
        } 
    }
}
