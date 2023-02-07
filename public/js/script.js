// *****Toggle Modals*****
const toggleHidden = (id) => {
  document.getElementById(id).classList.toggle('hidden');
}

// Check for any open modals and close them
const closeModals = () => {
  console.log('closeModals hit');
  const htmlSections = document.getElementsByTagName('section');
  console.log(htmlSections);
  for (let i = 0; i < htmlSections.length; i++) {
    // Check for 'modal' in the beginning of the section id
    let modalCheck = (htmlSections[i].getAttribute('id').slice(0,5) === 'modal') ? true : false;
    // Check for hidden class
    let getClasses = htmlSections[i].className.split(' ');
    if (modalCheck && !getClasses.includes('hidden')) {
      toggleHidden(htmlSections[i].getAttribute('id'));
    }
  }
}