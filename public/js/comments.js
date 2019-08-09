async function postComment(menu) {
  const content = $('#comment_form').val();
  appendCommentHtml(content);
  try {
    let result = await sendPostAjax(`/reply/${menu}`, {
      content
    });
  } catch (e) {
    alert(e.message);
  }
}

function appendCommentHtml(content) {
  const html = `<div class="comment">
        <a class="avatar">
            <img src="/img/user.png" />
        </a>
        <div class="content">
            <a class="author">익명 시용자</a>
            <div class="metadata">
                <span class="date">지금</span>
            </div>
            <div class="text">${content}</div>
        </div>
        </div>`;

  $('#comment_form').val('');
  $('.comments_box').append(html);
}

/**
 * @param {String} url
 * @param {Object} params
 * @returns responseText
 */
const sendPostAjax = (url, params) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status <= 210) {
        resolve(xhr.responseText);
      } else {
        reject({ status: xhr.status, message: xhr.responseText });
      }
    };
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(params));
    xhr.onerror = () => reject(req.status);
  });
};
