// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) return userStr;
  else return null;
}

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('token') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  UserProfile.setName('');
}

// set the token and user from the session storage
export const setUserToken = (token) => {  
  sessionStorage.setItem('token', token);
  
}


export const getName = (token) => {

  const theHeaders = {
    method: 'get',
    headers: { 
      'Content-Type' : 'application/json',    
      'Authorization' : 'Bearer '+ token
    }
  };

  
  console.log("so the headers are="+theHeaders.headers);
  fetch('http://localhost:9080/cortex/profiles/mobee/default',theHeaders)
  .then(res => res.json())
  .then((data) => {     
    //setUserSession( data ) ; 
     const myObjStr = JSON.stringify(data);
     const myJson = JSON.parse(myObjStr);    
    // const uname2 = (myJson['given-name']+' '+myJson['family-name']);
     setUserSession(myJson['given-name']+' '+myJson['family-name']);   
     UserProfile.setName(myJson['given-name']+' '+myJson['family-name']);   
    
  }).catch(error => {
    console.log(" And the error was = "+ error);      
  });
}

// set the token and user from the session storage
export const setUserSession = (user) => {
  console.log("... user="+user);
  sessionStorage.setItem('user', user);
}


// Leo's functions
export var UserProfile = (function() {
  var full_name = "";

  var getName = function() {
    return full_name;    // Or pull this from cookie/localStorage
  };  

  var setName = function(name) {
    full_name = name;     
    // Also set this in cookie/localStorage
  };

  return {
    getName: getName,
    setName: setName
  }

})();

