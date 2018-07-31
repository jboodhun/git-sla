#!groovy

/*
Build pipeline for React project with wct based unit testing in a docker container
*/

node('javascript'){
    deleteDir() // Clean the workspace
    currentBuild.result = "SUCCESS" // Otherwise will be null on success

    try {


        stage('Checkout')
        {
          checkout scm
        }

        stage('Build')
        {
          sh '''
            yarn install
            bower install
            bower update
            fi
          '''
          sh 'yarn  run build'
        }

        stage('Unit Test') {
          sh 'yarn run jsonserver &'
          sh 'yarn run test'
        }


        stage('Deploy') {
          sh '''

          '''
        }

    } catch (err) {
      currentBuild.result = "FAILURE"
      throw err
    }
}
