import { ref, onValue } from "firebase/database";

export function checkSession(user,db, _callback) {
  var key= JSON.parse(sessionStorage.getItem('session'))
  const dummy = ref(db, 'sessions/' + user);

  return onValue(dummy, (snapshot) => {
    if (snapshot.exists()){
      if(key[1] === snapshot.val()['key']){
        _callback()
        return true
      }else{
        sessionStorage.clear()
        document.location.href="/"
      }
    }else{
      sessionStorage.clear()
      document.location.href="/";
    }

    
  })
  
}