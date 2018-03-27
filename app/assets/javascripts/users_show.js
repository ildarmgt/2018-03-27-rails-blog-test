
// only thing that runs
test_for_users_show(); 

// test for correct view
function test_for_users_show () {

  if (document.getElementsByClassName('main__profile_loaded').length) {
    // onsole.log(new Date().toISOString(), ' found profile page');
    setTimeout(users_show_script, 10);
  } else {
    // onsole.log(new Date().toISOString(), ' not profile page');
    setTimeout(test_for_users_show, 100);
  }
  
}

// runs when correct view found
function users_show_script () {

  var inTextArea = document.getElementsByClassName('main__profile__new__text')[0];
  var textAreas = document.getElementsByClassName('main__profile__history__content');
  var textAreasComments = document.getElementsByClassName('main__profile__history__comments__content');

  var btnStartEdit = document.getElementsByClassName('main__profile__history__content__start_edit');
  var btnCancelEdit = document.getElementsByClassName('main__profile__history__content_edit_cancel');
  var btnStartDelete = document.getElementsByClassName('main__profile__history__content_start_delete');
  var btnCancelDelete = document.getElementsByClassName('main__profile__history__content_delete_cancel');
  
  var btnStartEditComments = document.getElementsByClassName('main__profile__history__comments__start_edit');
  var btnCancelEditComments = document.getElementsByClassName('main__profile__history__comments_edit_cancel');
  var btnStartDeleteComments = document.getElementsByClassName('main__profile__history__comments_start_delete');
  var btnCancelDeleteComments = document.getElementsByClassName('main__profile__history__comments_delete_cancel');

  var btnStartReply = document.getElementsByClassName('main__profile__history__content_start_reply');

  // firs resize all textareas
  textareaGrow();
  textareaGrowComments();

  // handling resizes of user's new text area
  if (inTextArea) {
    inTextArea.addEventListener('change', inTextAreaGrow);
    inTextArea.addEventListener('keydown', inTextAreaGrow);
    inTextArea.addEventListener('change', inTextAreaGrow);
    inTextArea.addEventListener('keyup', inTextAreaGrow);
    inTextArea.addEventListener('mouseup', inTextAreaGrow);
    window.addEventListener('resize', inTextAreaGrow);
  }


  // get historic text boxes ready for events and properties
  // also mark as readOnly at first

  if (typeof textAreas !== 'undefined') {
    [].forEach.call(textAreas, element => {
      element.addEventListener('change', textareaGrow);
      element.addEventListener('keydown', textareaGrow);
      element.addEventListener('keyup', textareaGrow);
      element.addEventListener('mouseup', textareaGrow);
      window.addEventListener('resize', textareaGrow);
      element.readOnly = true; // prevent historic posts from being edited by default
    });
  }

  if (typeof textAreasComments !== 'undefined') {
    [].forEach.call(textAreasComments, element => {
      element.addEventListener('change', textareaGrowComments);
      element.addEventListener('keydown', textareaGrowComments);
      element.addEventListener('keyup', textareaGrowComments);
      element.addEventListener('mouseup', textareaGrowComments);
      window.addEventListener('resize', textareaGrowComments);
      element.readOnly = true; // prevent historic posts from being edited by default
    });
  }

  // create the events for all the button options
  
  // blog buttons
  [].forEach.call(btnStartEdit, ea_edit_button => {
    ea_edit_button.addEventListener('click', startEditClick);
  });

  [].forEach.call(btnCancelEdit, ea_edit_cancel_button => {
    ea_edit_cancel_button.addEventListener('click', editCancelClick);
  });
  
  [].forEach.call(btnStartDelete, ea_delete_button => {
    ea_delete_button.addEventListener('click', startDeleteClick);
  });

  [].forEach.call(btnCancelDelete, ea_delete_cancel_button => {
    ea_delete_cancel_button.addEventListener('click', deleteCancelClick);
  });

  [].forEach.call(btnStartReply, ea_reply_button => {
    ea_reply_button.addEventListener('click', startReplyClick);
  });

  // comment buttons

  [].forEach.call(btnStartEditComments, ea_edit_button => {
    ea_edit_button.addEventListener('click', startEditClickComments);
  });

  [].forEach.call(btnCancelEditComments, ea_edit_cancel_button => {
    ea_edit_cancel_button.addEventListener('click', editCancelClickComments);
  });
  
  [].forEach.call(btnStartDeleteComments, ea_delete_button => {
    ea_delete_button.addEventListener('click', startDeleteClickComments);
  });

  [].forEach.call(btnCancelDeleteComments, ea_delete_cancel_button => {
    ea_delete_cancel_button.addEventListener('click', deleteCancelClickComments);
  });


  // *****************************************
  // event functions
  // *****************************************

  function inTextAreaGrow () {
    // change top most text area
    inTextArea.style.height = '5px'; // need small first to et scrollbar height
    inTextArea.setAttribute('style', 'height:' + inTextArea.scrollHeight * 1.1 + 'px');
  }

  function textareaGrow () {
    if (typeof textAreas !== 'undefined') {

      [].forEach.call(textAreas, element => {
        element.style.height = '5px'; // need small first to et scrollbar height
        element.setAttribute('style', 'height:' + element.scrollHeight * 1.1 + 'px');
      });
    }
  }

  function textareaGrowComments () {
    if (typeof textAreasComments !== 'undefined') {

      [].forEach.call(textAreasComments, element => {
        element.style.height = '5px'; // need small first to et scrollbar height
        element.setAttribute('style', 'height:' + element.scrollHeight * 1.1 + 'px');
      });
    }
  }


  function startEditClick (clickEvent) {
    // get the elements to show or hide for specific post only
    let editStartContainer = clickEvent.target.parentElement;
    let postClicked = editStartContainer.getAttribute('data-blogid');
    let editConfirmContainer = document.querySelectorAll('.main__profile__history__content_editchoice[data-blogid="' + postClicked + '"]')[0];
    let thisTextArea = document.querySelectorAll('.main__profile__history__content[data-blogid="' + postClicked + '"]')[0];

    // hide start edit dom
    editStartContainer.style.display = 'none';
    // show confirm edit
    editConfirmContainer.style.display = 'inline-block';
    // change style to editable one
    thisTextArea.readOnly = false;
    thisTextArea.classList.add('main__profile__history__content_editable');
    thisTextArea.setAttribute('data-backup', thisTextArea.value);
  }

  function startEditClickComments (clickEvent) {
    // get the elements to show or hide for specific post only
    let editStartContainer = clickEvent.target.parentElement;
    let postClicked = editStartContainer.getAttribute('data-commentid');
    let editConfirmContainer = document.querySelectorAll('.main__profile__history__comments_editchoice[data-commentid="' + postClicked + '"]')[0];
    let thisTextArea = document.querySelectorAll('.main__profile__history__comments__content[data-commentid="' + postClicked + '"]')[0];

    // hide start edit dom
    editStartContainer.style.display = 'none';
    // show confirm edit
    editConfirmContainer.style.display = 'inline-block';
    // change style to editable one
    thisTextArea.readOnly = false;
    thisTextArea.classList.add('main__profile__history__comments__content_editable');
    thisTextArea.setAttribute('data-backup', thisTextArea.value);
  }


  function editCancelClick (clickEvent) {
    // get the elements to show or hide for specific post only
    let editCancelContainer = clickEvent.target.parentElement;
    let postClicked = editCancelContainer.getAttribute('data-blogid');
    let editStartContainer = document.querySelectorAll('.main__profile__history__buttons__start[data-blogid="' + postClicked + '"]')[0];
    let thisTextArea = document.querySelectorAll('.main__profile__history__content[data-blogid="' + postClicked + '"]')[0];

    // hide start edit dom
    editCancelContainer.style.display = 'none';
    // show confirm edit
    editStartContainer.style.display = 'inline-block';
    // change style to editable one
    thisTextArea.readOnly = true;
    thisTextArea.classList.remove('main__profile__history__content_editable');
    thisTextArea.value = thisTextArea.getAttribute('data-backup');
    textareaGrow();
  }

  function editCancelClickComments (clickEvent) {
    // get the elements to show or hide for specific post only
    let editCancelContainer = clickEvent.target.parentElement;
    let postClicked = editCancelContainer.getAttribute('data-commentid');
    let editStartContainer = document.querySelectorAll('.main__profile__history__comments__start[data-commentid="' + postClicked + '"]')[0];
    let thisTextArea = document.querySelectorAll('.main__profile__history__comments__content[data-commentid="' + postClicked + '"]')[0];

    // hide start edit dom
    editCancelContainer.style.display = 'none';
    // show confirm edit
    editStartContainer.style.display = 'inline-block';
    // change style to editable one
    thisTextArea.readOnly = true;
    thisTextArea.classList.remove('main__profile__history__comments__content_editable');
    thisTextArea.value = thisTextArea.getAttribute('data-backup');
    textareaGrow();
  }

  function startDeleteClick (clickEvent) {
    // get the elements to show or hide for specific post only
    let deleteStartContainer = clickEvent.target.parentElement;
    let postClicked = deleteStartContainer.getAttribute('data-blogid');
    let deleteConfirmContainer = document.querySelectorAll('.main__profile__history__content_deletechoice[data-blogid="' + postClicked + '"]')[0];
    // let thisTextArea = document.querySelectorAll('.main__profile__history__content[data-postid="' + postClicked + '"]')[0];

    // hide start edit dom
    deleteStartContainer.style.display = 'none';
    // show confirm edit
    deleteConfirmContainer.style.display = 'inline-block';
    // change style to editable one
    // thisTextArea.readOnly = false;
    // thisTextArea.classList.add('main__profile__history__content_editable');
    // thisTextArea.setAttribute('data-backup', thisTextArea.value);
  }

  function startDeleteClickComments (clickEvent) {
    // get the elements to show or hide for specific post only
    let deleteStartContainer = clickEvent.target.parentElement;
    let postClicked = deleteStartContainer.getAttribute('data-commentid');
    let deleteConfirmContainer = document.querySelectorAll('.main__profile__history__comments_deletechoice[data-commentid="' + postClicked + '"]')[0];
    // let thisTextArea = document.querySelectorAll('.main__profile__history__content[data-postid="' + postClicked + '"]')[0];

    // hide start edit dom
    deleteStartContainer.style.display = 'none';
    // show confirm edit
    deleteConfirmContainer.style.display = 'inline-block';
    // change style to editable one
    // thisTextArea.readOnly = false;
    // thisTextArea.classList.add('main__profile__history__content_editable');
    // thisTextArea.setAttribute('data-backup', thisTextArea.value);
  }

  function deleteCancelClick (clickEvent) {
    // get the elements to show or hide for specific post only
    let deleteCancelContainer = clickEvent.target.parentElement;
    let postClicked = deleteCancelContainer.getAttribute('data-blogid');
    let deleteConfirmContainer = document.querySelectorAll('.main__profile__history__buttons__start[data-blogid="' + postClicked + '"]')[0];
    // let thisTextArea = document.querySelectorAll('.main__profile__history__content[data-postid="' + postClicked + '"]')[0];

    // hide start edit dom
    deleteConfirmContainer.style.display = 'inline-block';
    // show confirm edit
    deleteCancelContainer.style.display = 'none';
    // change style to editable one
    // thisTextArea.readOnly = false;
    // thisTextArea.classList.add('main__profile__history__content_editable');
    // thisTextArea.setAttribute('data-backup', thisTextArea.value);
  }

  function deleteCancelClickComments (clickEvent) {
    // get the elements to show or hide for specific post only
    let deleteCancelContainer = clickEvent.target.parentElement;
    let postClicked = deleteCancelContainer.getAttribute('data-commentid');
    let deleteConfirmContainer = document.querySelectorAll('.main__profile__history__comments__start[data-commentid="' + postClicked + '"]')[0];
    // let thisTextArea = document.querySelectorAll('.main__profile__history__content[data-postid="' + postClicked + '"]')[0];

    // hide start edit dom
    deleteConfirmContainer.style.display = 'inline-block';
    // show confirm edit
    deleteCancelContainer.style.display = 'none';
    // change style to editable one
    // thisTextArea.readOnly = false;
    // thisTextArea.classList.add('main__profile__history__content_editable');
    // thisTextArea.setAttribute('data-backup', thisTextArea.value);
  }

  function startReplyClick (clickEvent) {
    // hitting reply button on a blog
    let getClickedItemBlogId = clickEvent.target.getAttribute('data-blogid');
    let itemToToggleOnReplyClick = document.querySelectorAll('.main__profile__history__comments_new_li[data-blogid="' + getClickedItemBlogId + '"]')[0];

    itemToToggleOnReplyClick.style.display = (itemToToggleOnReplyClick.style.display != "block")
      ? "block"
      : "none";
  }

  console.log('users_show.js partial loaded');
}
