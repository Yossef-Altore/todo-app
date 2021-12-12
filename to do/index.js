let allEditBtn;
let counter = 0;
function addToList(content) {
  let $task = $(`
    <div class="task">
        <p class="content">${content}</p>
        <button class="edit-btn">Edit</button>
        <button type="button" class="save-btn" disabled >Save</button>
        <button class="delete-btn">Delete</button>
    </div>
    `);
  $(".tasks-wrapper").prepend($task);
  allEditBtn = $(".edit-btn");
  focusOnAddInput();
  counter++;
  count();
}
function count() {
  $("#taskCounter").text(counter);
}
count();
function add() {
  let addValue = $("#toDoInput").val();
  if (addValue === "") {
    $("#addTask").after(`<h2 class="warning">can't add empty task</h2>`);
    $(".warning").css("color", "red");
    setTimeout(() => {
      $("#addTask").next().remove();
    }, 2000);
    return;
  }
  addToList(addValue);
  $(".warning").remove();
  addValue = $("#toDoInput").val("");
}
$("#addTask").click(add);
/* $("#addTask").click(() => {
  let addValue = $("#toDoInput").val();
  if (addValue === "") {
    $("#addTask").after(`<h2 class="warning">cant add empty task</h2>`);
    $(".warning").css("color", "red");
    return;
  }
  addToList(addValue);
  $(".warning").remove();
  addValue = $("#toDoInput").val("");
}); */
$(document).on("click", ".edit-btn", function () {
  $(this).parent(".task").find(".content").attr("contenteditable", "true");
  $(this).parent(".task").find(".save-btn").removeAttr("disabled");
  $(this).parent(".task").find(".content").focus();
});
$(document).on("click", ".delete-btn", function () {
  $(this).parent(".task").remove();
  counter--;
  count();
});
$(document).on("click", ".save-btn", function () {
  let $taskVal = $(this).parent(".task").find(".content").text();
  if ($taskVal === "") {
    alert("can't save empty task");
    return;
  }
  $(this).parent(".task").find(".content").attr("contenteditable", "false");
  $(this).attr("disabled", "true");
});
function focusOnAddInput() {
  $("#toDoInput").focus();
}
focusOnAddInput();
$(document).on("keyup", "body", function (e) {
  if (e.keyCode === 13) {
    add();
  }
});
