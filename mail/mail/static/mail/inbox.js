document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  

  //Submit
  document.querySelector("#compose-form").addEventListener('submit', mail);
  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view1').style.display='none';
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}
function views(id){
fetch(`/emails/${id}`)
.then(response => response.json())
.then(email => {
  
    // Print email
    console.log(email);
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#emails-view1').style.display='block';


  
    document.querySelector('#emails-view1').innerHTML=`
    
   <div class="containerAll"> 
      <div class="containerText">
        <div class="containerTextInside">
          <p><strong>From:</strong> ${email.sender}</p>
          <p><strong>To:</strong> ${email.recipients}</p>
          <p><strong>Subject:</strong> ${email.subject}</p>
          <p><strong>Date:</strong> ${email.timestamp}</p>
        </div>
      </div>
        <hr>
      <div class="message">

        <p class="text">${email.body}</p>
     </div>
    </div>

    `
    
  if(!email.read){
    fetch(`/emails/${email.id}`, {
      method: 'PUT',
      body: JSON.stringify({
          read: true
      })
    })
  }
  const boton = document.createElement('button');

  boton.innerHTML= email.archived ? "Unarchive" : "Archive";
  boton.className="btn btn-danger";
  boton.style.marginLeft="47%";
  boton.style.background="none";
 


  
 
 
  


  
  boton.addEventListener('click', function() {
   fetch(`/emails/${email.id}`, {
  method: 'PUT',
  body: JSON.stringify({
      archived: !email.archived
  })
})
.then(()=>{load_mailbox('archive')})
});
 document.querySelector('#emails-view1').append(boton);

  const boton2 = document.createElement('button');
 
 
  boton2.innerHTML="Answer"
  boton2.className="btn btn-primary";
  boton2.style.marginLeft="1%";
  boton2.style.position="absoluta";
  boton2.style.background="none";
  
  
 
 
  
  
  

  




  boton2.addEventListener('click', function() {
    compose_email();

    document.querySelector('#compose-recipients').value = email.sender;
    let subject1=email.subject;
    if(subject1.split(' ',1)[0] != "Re"){
     subject1="Re: " + email.subject;
    }

    document.querySelector('#compose-subject').value = subject1;
    document.querySelector('#compose-body').value =` ${email.timestamp} ${email.sender} wrote:${email.body}` ;
  
  });
  document.querySelector('#emails-view1').append(boton2);
  

});
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#emails-view1').style.display='none';

  

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;


fetch(`/emails/${mailbox}`)
.then(response => response.json())
.then(emails => {

   emails.forEach(viewEmail=>{
    const element = document.createElement('div');
   element.style.display="flex";
   element.style.justifyContent="space-between";
   element.style.color="white";
   element.className="list-group-item";
   element.style.cursor="pointer";
   element.style.padding="5px";
   element.style.margin="2px";
   
 


    element.innerHTML=`
    <h6>${viewEmail.sender}</h6>
    <p> ${viewEmail.subject}<p>
    <span>${viewEmail.timestamp}</span>
    `;
  element.className=viewEmail.read ? 'list':'nolist';
  element.addEventListener('click', function() {
        views(viewEmail.id)
      });
      document.querySelector('#emails-view').append(element);
    })      
  }); 
   
}
function mail(event){
  event.preventDefault();
  const composeRecipients= document.querySelector('#compose-recipients').value;
  const composeSubject= document.querySelector('#compose-subject').value;
  const composeBody=document.querySelector('#compose-body').value;

  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: composeRecipients,
        subject: composeSubject,
        body: composeBody
    })
  })
  .then((response) => response.json())
  .then((result) => {
    load_mailbox("sent", result);
  })
  .catch((error) => alert(error));
}



function showPass(){

  var pass= document.getElementById("password1");

  if(pass.type === 'password'){
    pass.type= 'text';
    pass.style.width='90%';
    pass.style.width='400px';
    pass.style.height='60px';
    pass.style.padding='0 10px 0 50px';
    pass.style.border='2px solid #ffffff43';
    pass.style.borderTop='none';
    pass.style.borderLeft='none';
    pass.style.borderRight='none';
    pass.style.borderRadius='25px';
    pass.style.background='transparent';
    pass.style.marginTop='17px';
    pass.style.display='inline-block';
    pass.style.color='#f9f9f9';
  

  }else{
    pass.type = 'password';
    






  }



  }
