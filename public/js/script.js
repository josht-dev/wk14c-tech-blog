// *****Global Variables*****
let contentDarken = false;

// *****Toggle Modals*****
const toggleHidden = (id) => {
  document.getElementById(id).classList.toggle('hidden');
}

// Darken Content
const darkenContent = (id) => {
  document.getElementById(id).classList.toggle('darken');
  document.getElementById('header-tag').classList.toggle('darken');
}

// Open modal
const openModal = (modalId, contentId) => {
  toggleHidden(modalId);
  // Darken the rest of the content if not already darkened
  if (!contentDarken) {
    darkenContent(contentId);
    contentDarken = true;
  }
}

// Check for any open modals and close them
const closeModals = (contentId) => {
  const htmlSections = document.getElementsByTagName('section');
  for (let i = 0; i < htmlSections.length; i++) {
    // Check for 'modal' in the beginning of the section id
    let modalCheck = (htmlSections[i].getAttribute('id').slice(0,5) === 'modal') ? true : false;
    // Check for hidden class
    let getClasses = htmlSections[i].className.split(' ');
    if (modalCheck && !getClasses.includes('hidden')) {
      toggleHidden(htmlSections[i].getAttribute('id'));
    }
  }
  // Reverse darken for the rest of the content if not already darkened
  if (contentDarken) {
    darkenContent(contentId);
    contentDarken = false;
  }
}