require('dotenv').config();

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-google-spreadsheets',
      options: {
        spreadsheetId: process.env.STUDENT_SURVEY_SPREADSHEET_ID,
        credentials: {
          type: 'service_account',
          project_id: 'ttu-textbooks',
          private_key_id: process.env.GC_PRIVATE_KEY_ID,
          private_key: process.env.GC_PRIVATE_KEY.replace(/\\n/gm, '\n'),
          client_email: process.env.GC_CLIENT_EMAIL,
          client_id: process.env.GC_CLIENT_ID,
          auth_uri: 'https://accounts.google.com/o/oauth2/auth',
          token_uri: 'https://oauth2.googleapis.com/token',
          auth_provider_x509_cert_url:
            'https://www.googleapis.com/oauth2/v1/certs',
          client_x509_cert_url:
            'https://www.googleapis.com/robot/v1/metadata/x509/ttu-textbooks-client%40ttu-textbooks.iam.gserviceaccount.com',
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-external-links'],
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sass',
  ],
};
