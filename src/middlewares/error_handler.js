import fs from 'fs';

const errorHandler = (error, request, response, next) => {
    // Error handling middleware functionality
    console.log( `error ${error.message}`) // log the error
    const status = error.status
    // append error in log file

    const date = new Date().toISOString();
    
    fs.appendFile('errors.log', `${status}: ${error.message} at ${date}\n`, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  
    // send back an easily understandable error message to the caller
    // response.status(status).sendStatus(error.message)
  }

  export default errorHandler;